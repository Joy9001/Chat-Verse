import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Form validation schemas
const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

const detailsSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	username: z.string().min(1, 'Username is required'),
	gender: z.enum(['Male', 'Female']),
	avatar: z.string().url('Invalid avatar URL'),
})

type RegisterFormData = z.infer<typeof registerSchema>
type DetailsFormData = z.infer<typeof detailsSchema>

export default function RegisterPage() {
	const navigate = useNavigate()
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
	const [alert, setAlert] = useState<{ message: string; show: boolean }>({
		message: '',
		show: false,
	})
	const [avatarUrl, setAvatarUrl] = useState(
		`https://api.dicebear.com/8.x/adventurer/svg?seed=${Math.floor(Math.random() * 10000)}`
	)

	const {
		register: registerForm,
		formState: { errors: registerErrors },
		getValues: getRegisterValues,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	})

	const {
		register: registerDetails,
		handleSubmit,
		formState: { errors: detailsErrors },
		setValue: setDetailsValue,
	} = useForm<DetailsFormData>({
		resolver: zodResolver(detailsSchema),
		defaultValues: {
			gender: 'Male',
			avatar: avatarUrl,
		},
	})

	const showAlert = (message: string) => {
		setAlert({ message, show: true })
		setTimeout(() => setAlert({ message: '', show: false }), 3000)
	}

	const handleChangeAvatar = async () => {
		try {
			const response = await fetch('/api/get-avatar')
			const data = await response.json()
			setAvatarUrl(data.avatar)
			setDetailsValue('avatar', data.avatar)
		} catch (error) {
			console.error('Error fetching avatar:', error)
		}
	}

	const onRegisterSubmit = async (data: RegisterFormData & DetailsFormData) => {
		try {
			const response = await fetch('/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Registration failed')
			}

			showAlert('Registered successfully')
			navigate({ to: '/auth/login' })
		} catch (error) {
			showAlert(error instanceof Error ? error.message : 'Registration failed')
		}
	}

	const handleOpenDetailsModal = () => {
		const { email, password } = getRegisterValues()
		if (!email || !password) {
			showAlert("Email and password can't be empty")
			return
		}
		setIsDetailsModalOpen(true)
	}

	const onDetailsSubmit = (detailsData: DetailsFormData) => {
		const registerData = getRegisterValues()
		onRegisterSubmit({ ...registerData, ...detailsData })
		setIsDetailsModalOpen(false)
	}

	return (
		<div
			className='font-dm flex min-h-screen w-full items-center justify-center'
			style={{
				backgroundImage: 'url(/assets/bg-image.png)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className='relative flex h-4/5 w-3/4 flex-row rounded-xl shadow-2xl backdrop-blur-2xl'>
				{/* Side Image Section */}
				<div className='relative h-full w-1/2 rounded-l-xl max-xl:hidden'>
					<img
						src='/assets/side-image.png'
						alt='register'
						className='h-full w-full rounded-l-xl object-cover'
					/>
				</div>

				{/* Register Form Section */}
				<div className='relative flex h-full w-1/2 items-center justify-center rounded-r-xl max-xl:w-full'>
					<div className='flex h-[95%] w-[95%] flex-col items-center justify-center space-y-6 p-6'>
						<h1 className='text-5xl font-bold text-black max-md:hidden'>Chat Verse</h1>
						<h1 className='text-4xl font-bold text-black'>Register</h1>

						<form className='space-y-4'>
							<div className='space-y-2'>
								<label htmlFor='email' className='text-lg font-semibold text-black'>
									Email
								</label>
								<Input
									type='email'
									{...registerForm('email')}
									placeholder='Enter your email'
									className='border-primary w-60 border-2 bg-white text-black'
								/>
								{registerErrors.email && (
									<p className='text-sm text-red-500'>{registerErrors.email.message}</p>
								)}
							</div>

							<div className='space-y-2'>
								<label htmlFor='password' className='text-lg font-semibold text-black'>
									Password
								</label>
								<Input
									type='password'
									{...registerForm('password')}
									placeholder='Enter your password'
									className='border-primary w-60 border-2 bg-white text-black'
								/>
								{registerErrors.password && (
									<p className='text-sm text-red-500'>{registerErrors.password.message}</p>
								)}
							</div>
						</form>

						<Button
							onClick={handleOpenDetailsModal}
							className='border-primary bg-primary border text-white'>
							Enter Details
						</Button>

						<Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
							<DialogContent className='bg-white'>
								<DialogHeader>
									<DialogTitle className='text-2xl font-bold'>Additional Details</DialogTitle>
								</DialogHeader>

								<form onSubmit={handleSubmit(onDetailsSubmit)} className='space-y-4'>
									<div className='space-y-2'>
										<label className='text-primary text-lg font-semibold'>Name</label>
										<Input
											{...registerDetails('name')}
											placeholder='Enter your name'
											className='border-2 border-black bg-white text-black'
										/>
										{detailsErrors.name && (
											<p className='text-sm text-red-500'>{detailsErrors.name.message}</p>
										)}
									</div>

									<div className='space-y-2'>
										<label className='text-primary text-lg font-semibold'>Username</label>
										<Input
											{...registerDetails('username')}
											placeholder='Enter your username'
											className='border-2 border-black bg-white text-black'
										/>
										{detailsErrors.username && (
											<p className='text-sm text-red-500'>{detailsErrors.username.message}</p>
										)}
									</div>

									<div className='space-y-2'>
										<label className='text-primary text-lg font-semibold'>Gender</label>
										<Select
											{...registerDetails('gender')}
											onValueChange={(value: 'Male' | 'Female') =>
												setDetailsValue('gender', value)
											}>
											<SelectTrigger className='border-2 border-black bg-white text-black'>
												<SelectValue placeholder='Select gender' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Male'>Male</SelectItem>
												<SelectItem value='Female'>Female</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='space-y-4'>
										<label className='text-primary text-lg font-semibold'>Profile Picture</label>
										<div className='flex flex-col items-center space-y-4'>
											<div className='ring-primary ring-offset-base-100 h-24 w-24 rounded-full ring ring-offset-2'>
												<img
													src={avatarUrl}
													alt='avatar'
													className='h-full w-full rounded-full'
												/>
											</div>
											<Button
												type='button'
												onClick={handleChangeAvatar}
												className='border-primary bg-primary w-24 border text-white'>
												Change
											</Button>
										</div>
									</div>

									<DialogFooter>
										<Button
											type='submit'
											className='border-primary bg-primary w-24 border text-white'>
											Done
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>

						<Separator className='bg-primary' />

						<Button
							onClick={() => (window.location.href = '/auth/login/google')}
							variant='outline'
							className='border-primary w-fit border-2 hover:cursor-pointer'>
							<img src='/svgs/google-icon.svg' alt='google-icon' className='mr-2 h-5 w-5' />
							Sign up with Google
						</Button>

						<p className='text-black'>
							Already have an account?{' '}
							<a href='/auth/login' className='text-black underline'>
								Login
							</a>
						</p>
					</div>

					{/* Alert */}
					{alert.show && (
						<Alert className='bg-primary absolute bottom-0 mx-2 my-2 w-[49%] text-white max-xl:w-[99%]'>
							<AlertDescription>{alert.message}</AlertDescription>
						</Alert>
					)}
				</div>
			</div>
		</div>
	)
}

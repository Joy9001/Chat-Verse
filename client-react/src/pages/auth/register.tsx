import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UserDetailsDialog } from '@/components/UserDetailsDialog'
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

						<UserDetailsDialog
							isOpen={isDetailsModalOpen}
							onOpenChange={setIsDetailsModalOpen}
							register={registerDetails}
							errors={detailsErrors}
							setValue={setDetailsValue}
							onSubmit={handleSubmit(onDetailsSubmit)}
							avatarUrl={avatarUrl}
							onChangeAvatar={handleChangeAvatar}
						/>

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

import { UserDetailsDialog } from '@/components/auth/UserDetailsDialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '@/lib/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiLoader, FiLock, FiMail } from 'react-icons/fi'
import * as z from 'zod'

// Form validation schemas
const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

const detailsSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	username: z.string().min(1, 'Username is required'),
	gender: z.enum(['Male', 'Female'], {
		errorMap: () => ({ message: 'Please select a gender' }),
	}),
	avatar: z.string().url('Invalid avatar URL'),
})

type RegisterFormData = z.infer<typeof registerSchema>
type DetailsFormData = z.infer<typeof detailsSchema>

export default function RegisterPage() {
	const navigate = useNavigate()
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isAvatarLoading, setIsAvatarLoading] = useState(false)
	const [alert, setAlert] = useState<{ message: string; show: boolean; type: 'success' | 'error' }>({
		message: '',
		show: false,
		type: 'success',
	})
	const [avatarUrl, setAvatarUrl] = useState(
		`https://api.dicebear.com/8.x/adventurer/svg?seed=${Math.floor(Math.random() * 10000)}`
	)

	const {
		register: registerForm,
		formState: { errors: registerErrors },
		getValues: getRegisterValues,
		trigger: triggerRegisterValidation,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
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
		mode: 'onChange',
	})

	// Set avatar in the form when it changes
	useEffect(() => {
		setDetailsValue('avatar', avatarUrl)
	}, [avatarUrl, setDetailsValue])

	// Auto-hide alert after 5 seconds
	useEffect(() => {
		let timer: number | undefined

		if (alert.show) {
			timer = window.setTimeout(() => {
				setAlert((prev) => ({ ...prev, show: false }))
			}, 5000)
		}

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [alert.show])

	const showAlert = (message: string, type: 'success' | 'error' = 'error') => {
		setAlert({ message, show: true, type })
	}

	const handleChangeAvatar = async () => {
		setIsAvatarLoading(true)
		try {
			// Fallback to generating a new random avatar if API fails
			const seed = Math.floor(Math.random() * 100000)
			const newAvatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${seed}`

			try {
				// Try the API first
				const response = await fetch(USER_ENDPOINTS.avatar)
				if (!response.ok) throw new Error('Failed to fetch avatar')
				const data = await response.json()
				setAvatarUrl(data.avatar)
			} catch (error) {
				// Fallback to the generated URL
				console.warn('Error fetching avatar from API, using fallback:', error)
				setAvatarUrl(newAvatarUrl)
			}
		} catch (error) {
			console.error('Error handling avatar:', error)
			showAlert('Failed to update avatar, please try again')
		} finally {
			setIsAvatarLoading(false)
		}
	}

	const onRegisterSubmit = async (data: RegisterFormData & DetailsFormData) => {
		setIsSubmitting(true)
		try {
			const response = await fetch(AUTH_ENDPOINTS.register, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include', // Include cookies for session management
			})

			if (!response.ok) {
				const result = await response.json()
				throw new Error(result.error || 'Registration failed')
			}

			const result = await response.json()
			console.log(result)
			showAlert('Registered successfully', 'success')

			// Give the user time to see the success message before redirecting
			setTimeout(() => {
				navigate({ to: '/auth/login' })
			}, 1500)
		} catch (error) {
			showAlert(error instanceof Error ? error.message : 'Registration failed', 'error')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleOpenDetailsModal = async () => {
		const isValid = await triggerRegisterValidation()
		if (!isValid) {
			// The validation errors will be displayed by the form
			return
		}

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
			className='font-dm flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6'
			style={{
				backgroundImage: 'url(/assets/bg-image.png)',
			}}>
			<div className='relative flex w-full max-w-4xl flex-col rounded-xl shadow-2xl backdrop-blur-2xl md:h-auto md:flex-row'>
				{/* Side Image Section - Left side */}
				<div className='hidden overflow-hidden rounded-l-xl md:block md:w-1/2 lg:w-3/5'>
					<img
						src='/assets/side-image.png'
						alt='Register page illustration'
						className='h-full w-full rounded-l-xl object-cover'
					/>
				</div>

				{/* Register Form Section - Right side */}
				<div className='w-full rounded-xl md:w-1/2 md:rounded-l-none lg:w-2/5'>
					<div className='flex h-full w-full flex-col items-center justify-center p-6 md:p-8'>
						<div className='mb-4 flex flex-col items-center md:mb-6'>
							<h1 className='mt-2 text-2xl font-bold text-black md:mt-4 md:text-3xl'>Register</h1>
							<p className='mt-1 text-center text-sm text-gray-600'>Create your account to get started</p>
						</div>

						<form className='w-full max-w-sm space-y-4 md:space-y-6' onSubmit={(e) => e.preventDefault()}>
							<div className='space-y-2'>
								<label htmlFor='email' className='text-base font-semibold text-black md:text-lg'>
									Email
								</label>
								<div className='relative'>
									<FiMail className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500' />
									<Input
										id='email'
										type='email'
										{...registerForm('email')}
										placeholder='Enter your email'
										className='border-primary focus-visible:ring-primary/50 pl-10 text-black'
										aria-invalid={!!registerErrors.email}
										aria-describedby={registerErrors.email ? 'email-error' : undefined}
									/>
								</div>
								{registerErrors.email && (
									<p id='email-error' className='text-sm text-red-500'>
										{registerErrors.email.message}
									</p>
								)}
							</div>

							<div className='space-y-2'>
								<label htmlFor='password' className='text-base font-semibold text-black md:text-lg'>
									Password
								</label>
								<div className='relative'>
									<FiLock className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500' />
									<Input
										id='password'
										type='password'
										{...registerForm('password')}
										placeholder='Enter your password'
										className='border-primary focus-visible:ring-primary/50 pl-10 text-black'
										aria-invalid={!!registerErrors.password}
										aria-describedby={registerErrors.password ? 'password-error' : undefined}
									/>
								</div>
								{registerErrors.password && (
									<p id='password-error' className='text-sm text-red-500'>
										{registerErrors.password.message}
									</p>
								)}
							</div>

							<Button
								onClick={handleOpenDetailsModal}
								disabled={isSubmitting}
								className='border-primary bg-primary hover:bg-primary/90 w-full border text-white transition-all'>
								{isSubmitting ? (
									<span className='flex items-center justify-center'>
										<FiLoader className='mr-2 h-4 w-4 animate-spin' />
										Processing...
									</span>
								) : (
									'Enter Details'
								)}
							</Button>
						</form>

						<UserDetailsDialog
							isOpen={isDetailsModalOpen}
							onOpenChange={setIsDetailsModalOpen}
							register={registerDetails}
							errors={detailsErrors}
							setValue={setDetailsValue}
							onSubmit={handleSubmit(onDetailsSubmit)}
							avatarUrl={avatarUrl}
							onChangeAvatar={handleChangeAvatar}
							isAvatarLoading={isAvatarLoading}
						/>

						<Separator className='my-4 w-full max-w-sm bg-gray-300 md:my-6' />

						<Button
							onClick={() => (window.location.href = '/auth/login/google')}
							variant='outline'
							className='border-primary hover:bg-primary/10 w-full max-w-sm justify-center border-2 transition-all hover:cursor-pointer'
							type='button'>
							<img src='/svgs/google-icon.svg' alt='google-icon' className='mr-2 h-5 w-5' />
							Sign up with Google
						</Button>

						<p className='mt-4 text-sm text-black md:text-base'>
							Already have an account?{' '}
							<a href='/auth/login' className='text-primary font-medium hover:underline'>
								Login
							</a>
						</p>
					</div>
				</div>

				{/* Alert - Fixed at the bottom center with a z-index */}
				{alert.show && (
					<div className='fixed right-0 bottom-4 left-0 z-50 flex justify-center'>
						<Alert
							className={`w-auto max-w-md rounded-md px-6 py-3 shadow-lg ${
								alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'
							} text-white`}>
							<AlertDescription>{alert.message}</AlertDescription>
						</Alert>
					</div>
				)}
			</div>
		</div>
	)
}

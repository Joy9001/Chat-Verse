import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Login form schema with Zod
const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
	const navigate = useNavigate()
	const [alert, setAlert] = useState<{ message: string; show: boolean }>({
		message: '',
		show: false,
	})
	const { login } = useAuthStore()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Login failed')
			}

			login(result.token) // Assuming your API returns a token
			setAlert({ message: 'Login successful!', show: true })

			// Redirect to chat after successful login
			navigate({ to: '/chat' })
		} catch (error) {
			setAlert({
				message: error instanceof Error ? error.message : 'Login failed',
				show: true,
			})
		}
	}

	const handleGoogleLogin = () => {
		window.location.href = '/auth/login/google'
	}

	return (
		<div
			className='font-dm flex min-h-screen items-center justify-center'
			style={{
				backgroundImage: 'url(/assets/bg-image.png',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className='relative flex h-4/5 w-3/4 rounded-xl shadow-2xl backdrop-blur-2xl'>
				{/* Login Form Section */}
				<div className='flex h-full w-1/2 items-center justify-center rounded-l-xl max-xl:w-full'>
					<div className='flex h-[95%] w-[95%] flex-col items-center justify-center space-y-6 p-8'>
						<h1 className='mb-7 text-5xl font-bold text-black max-md:hidden'>Chat Verse</h1>
						<h1 className='mb-4 text-4xl font-bold text-black'>Login</h1>

						<form onSubmit={handleSubmit(onSubmit)} className='w-60 space-y-4'>
							<div className='space-y-2'>
								<label htmlFor='email' className='text-lg font-semibold text-black'>
									Email
								</label>
								<Input
									type='email'
									{...register('email')}
									placeholder='Enter your email'
									className='border-primary bg-accent border-2 text-black'
								/>
								{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
							</div>

							<div className='space-y-2'>
								<label htmlFor='password' className='text-lg font-semibold text-black'>
									Password
								</label>
								<Input
									type='password'
									{...register('password')}
									placeholder='Enter your password'
									className='border-primary bg-accent border-2 text-black'
								/>
								{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
							</div>

							<Button type='submit' disabled={isSubmitting} className='bg-primary w-full text-white'>
								{isSubmitting ? 'Logging in...' : 'Login'}
							</Button>
						</form>

						<Separator className='my-4' />

						<Button
							onClick={handleGoogleLogin}
							variant='outline'
							className='border-primary w-fit border-2 hover:cursor-pointer'>
							<img src='/svgs/google-icon.svg' alt='google-icon' className='mr-2 h-5 w-5' />
							Sign in with Google
						</Button>

						<p className='text-black'>
							Don't have an account?{' '}
							<a href='/auth/register' className='text-black underline'>
								Register
							</a>
						</p>
					</div>
				</div>

				{/* Side Image Section */}
				<div className='absolute right-0 h-full w-1/2 rounded-r-xl max-xl:hidden'>
					<img src='/assets/side-image.png' alt='login' className='h-full w-full rounded-r-xl object-cover' />
				</div>

				{/* Alert */}
				{alert.show && (
					<Alert
						className='bg-primary absolute bottom-0 mx-2 my-2 w-[49%] text-white max-xl:w-[99%]'
						onMouseEnter={() => setAlert({ ...alert, show: false })}>
						<AlertDescription>{alert.message}</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	)
}

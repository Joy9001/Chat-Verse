import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema'
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiLoader, FiLock, FiMail } from 'react-icons/fi'
import { GoogleAuthButton } from './GoogleAuthButton'

export function LoginForm() {
	const { login, isLoading, error, clearError } = useAuthStore()
	const navigate = useNavigate()
	
	// Alert state for showing success/error messages
	const [alert, setAlert] = useState<{ message: string; show: boolean; type: 'success' | 'error' }>({ 
		message: '', 
		show: false, 
		type: 'error' 
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange'
	})

	// Auto-hide alert after 5 seconds
	useEffect(() => {
		if (alert.show) {
			const timer = setTimeout(() => {
				setAlert((prev) => ({ ...prev, show: false }));
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [alert.show]);

	// Show alert when error changes
	useEffect(() => {
		if (error) {
			setAlert({ message: error, show: true, type: 'error' });
		}
	}, [error]);

	const onSubmit = async (data: LoginFormData) => {
		try {
			clearError() // Clear any previous errors
			await login(data)
			setAlert({ message: 'Login successful!', show: true, type: 'success' })
			navigate({ to: '/chat' })
		} catch (err) {
			// Error is already set in the store by the login method
			console.error('Login failed:', err)
			// Alert will be shown by the useEffect above
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full max-w-sm'>
				<div className='space-y-2'>
					<label htmlFor='email' className='text-base md:text-lg font-semibold text-black'>
						Email
					</label>
					<div className='relative'>
						<FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
						<Input
							{...register('email')}
							type='email'
							id='email'
							className='border-primary pl-10 text-black focus-visible:ring-primary/50'
							placeholder='Enter your email'
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? 'email-error' : undefined}
						/>
					</div>
					{errors.email && <p id='email-error' className='text-sm text-red-500'>{errors.email.message}</p>}
				</div>

				<div className='space-y-2'>
					<label htmlFor='password' className='text-base md:text-lg font-semibold text-black'>
						Password
					</label>
					<div className='relative'>
						<FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
						<Input
							{...register('password')}
							type='password'
							id='password'
							className='border-primary pl-10 text-black focus-visible:ring-primary/50'
							placeholder='Enter your password'
							aria-invalid={!!errors.password}
							aria-describedby={errors.password ? 'password-error' : undefined}
						/>
					</div>
					{errors.password && <p id='password-error' className='text-sm text-red-500'>{errors.password.message}</p>}
				</div>

				<div className='flex w-full justify-end'>
					<a href='#' className='text-sm text-primary hover:underline'>
						Forgot password?
					</a>
				</div>

				<Button 
					type='submit' 
					disabled={isLoading} 
					className='border-primary bg-primary w-full border text-white transition-all hover:bg-primary/90 hover:cursor-pointer'
				>
					{isLoading ? (
						<span className='flex items-center justify-center'>
							<FiLoader className='mr-2 h-4 w-4 animate-spin' />
							Logging in...
						</span>
					) : (
						'Login'
					)}
				</Button>

				<div className='relative my-4'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-gray-300'></div>
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='bg-white px-2 text-gray-500'>Or</span>
					</div>
				</div>

				<GoogleAuthButton />

				<div className='text-center text-sm mt-4'>
					<span className='text-gray-500'>Don't have an account?</span>{' '}
					<Button variant='link' className='p-0 hover:cursor-pointer' onClick={() => navigate({ to: '/auth/register' })}>
						Sign up
					</Button>
				</div>
			</form>

			{/* Alert - Fixed at the bottom center with a z-index */}
			{alert.show && (
				<div className='fixed bottom-4 left-0 right-0 z-50 flex justify-center'>
					<Alert
						className={`w-auto max-w-md rounded-md px-6 py-3 shadow-lg ${
							alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'
						} text-white`}
					>
						<AlertDescription>{alert.message}</AlertDescription>
					</Alert>
				</div>
			)}
		</>
	)
}

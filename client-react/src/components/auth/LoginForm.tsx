import { Button } from '@/components/ui/button'
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema'
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { GoogleAuthButton } from './GoogleAuthButton'

export function LoginForm() {
	const { login, isLoading, error, clearError } = useAuthStore()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: LoginFormData) => {
		try {
			clearError() // Clear any previous errors
			await login(data)
			navigate({ to: '/chat' })
		} catch (err) {
			// Error is already set in the store by the login method
			console.error('Login failed:', err)
			// We could add toast notification here if needed
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='space-y-2'>
				<label htmlFor='email' className='text-sm font-medium'>
					Email
				</label>
				<input
					{...register('email')}
					type='email'
					id='email'
					className='w-full rounded-md border p-2'
					placeholder='Enter your email'
				/>
				{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
			</div>

			<div className='space-y-2'>
				<label htmlFor='password' className='text-sm font-medium'>
					Password
				</label>
				<input
					{...register('password')}
					type='password'
					id='password'
					className='w-full rounded-md border p-2'
					placeholder='Enter your password'
				/>
				{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
			</div>

			<Button type='submit' className='w-full' disabled={isLoading}>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</Button>

			{error && <p className='text-sm text-red-500 mt-2'>{error}</p>}

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
				<Button variant='link' className='p-0' onClick={() => navigate({ to: '/register' })}>
					Sign up
				</Button>
			</div>
		</form>
	)
}

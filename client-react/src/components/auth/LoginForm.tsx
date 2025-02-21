import { Button } from '@/components/ui/button'
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema'
import { authApi } from '@/services/api'
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const setUser = useAuthStore((state) => state.setUser)
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
			setIsLoading(true)
			const response = await authApi.login(data)
			setUser(response.user)
			navigate({ to: '/chat' })
		} catch (error) {
			console.error('Login failed:', error)
			// Add toast notification here
		} finally {
			setIsLoading(false)
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

			<div className='text-center text-sm'>
				<span className='text-gray-500'>Don't have an account?</span>{' '}
				<Button variant='link' className='p-0' onClick={() => navigate({ to: '/register' })}>
					Sign up
				</Button>
			</div>
		</form>
	)
}

import { Button } from '@/components/ui/button'
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema'
import { authApi } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState('')
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	})

	const generateAvatar = async () => {
		try {
			const response = await fetch('/api/get-avatar')
			const data = await response.json()
			setAvatarUrl(data.avatar)
			setValue('avatar', data.avatar)
		} catch (error) {
			console.error('Failed to generate avatar:', error)
			// Add toast notification here
		}
	}

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true)
			await authApi.register(data)
			navigate({ to: '/login' })
			// Add success toast notification here
		} catch (error) {
			console.error('Registration failed:', error)
			// Add error toast notification here
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

			<div className='space-y-2'>
				<label htmlFor='name' className='text-sm font-medium'>
					Name
				</label>
				<input
					{...register('name')}
					type='text'
					id='name'
					className='w-full rounded-md border p-2'
					placeholder='Enter your name'
				/>
				{errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
			</div>

			<div className='space-y-2'>
				<label htmlFor='username' className='text-sm font-medium'>
					Username
				</label>
				<input
					{...register('username')}
					type='text'
					id='username'
					className='w-full rounded-md border p-2'
					placeholder='Choose a username'
				/>
				{errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
			</div>

			<div className='space-y-2'>
				<label htmlFor='gender' className='text-sm font-medium'>
					Gender
				</label>
				<select {...register('gender')} id='gender' className='w-full rounded-md border p-2'>
					<option value=''>Select gender</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
					<option value='other'>Other</option>
				</select>
				{errors.gender && <p className='text-sm text-red-500'>{errors.gender.message}</p>}
			</div>

			<div className='space-y-2'>
				<label className='text-sm font-medium'>Avatar</label>
				<div className='flex items-center space-x-4'>
					{avatarUrl && <img src={avatarUrl} alt='Profile avatar' className='h-16 w-16 rounded-full' />}
					<Button type='button' variant='outline' onClick={generateAvatar}>
						Generate Avatar
					</Button>
				</div>
				<input type='hidden' {...register('avatar')} value={avatarUrl} />
				{errors.avatar && <p className='text-sm text-red-500'>{errors.avatar.message}</p>}
			</div>

			<Button type='submit' className='w-full' disabled={isLoading}>
				{isLoading ? 'Creating account...' : 'Create account'}
			</Button>

			<div className='text-center text-sm'>
				<span className='text-gray-500'>Already have an account?</span>{' '}
				<Button variant='link' className='p-0' onClick={() => navigate({ to: '/login' })}>
					Sign in
				</Button>
			</div>
		</form>
	)
}

import { Button } from '@/components/ui/button'
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema'
import { useAuthStore } from '@/store/auth.store'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoogleAuthButton } from './GoogleAuthButton'

export function RegisterForm() {
	const { register: registerUser, isLoading, error, clearError } = useAuthStore()
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
			const response = await api.get('/avatar/generate')
			const data = response.data
			setAvatarUrl(data.avatar)
			setValue('avatar', data.avatar)
		} catch (error) {
			console.error('Failed to generate avatar:', error)
			// Add toast notification here
		}
	}

	const onSubmit = async (data: RegisterFormData) => {
		try {
			clearError() // Clear any previous errors
			await registerUser(data)
			navigate({ to: '/login' })
			// Add success toast notification here
		} catch (err) {
			// Error is already set in the store by the register method
			console.error('Registration failed:', err)
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
				<span className='text-gray-500'>Already have an account?</span>{' '}
				<Button variant='link' className='p-0' onClick={() => navigate({ to: '/login' })}>
					Sign in
				</Button>
			</div>
		</form>
	)
}

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiLoader, FiLock, FiMail } from 'react-icons/fi'
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

	// Auto-hide alert after 5 seconds
	useEffect(() => {
		if (alert.show) {
			const timer = setTimeout(() => {
				setAlert((prev) => ({ ...prev, show: false }));
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [alert.show]);

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
		<div className="font-dm flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6"
			style={{
				backgroundImage: 'url(/assets/bg-image.png)',
			}}>
			<div className="relative flex w-full max-w-4xl flex-col rounded-xl shadow-2xl backdrop-blur-2xl md:flex-row md:h-auto">
				{/* Side Image Section - Left side */}
				<div className="hidden md:block md:w-1/2 lg:w-3/5 rounded-l-xl overflow-hidden">
					<img
						src="/assets/side-image.png"
						alt="login"
						className="h-full w-full rounded-l-xl object-cover"
					/>
				</div>

				{/* Login Form Section - Right side */}
				<div className="w-full rounded-xl md:w-1/2 lg:w-2/5 md:rounded-l-none">
					<div className="flex h-full w-full flex-col items-center justify-center p-6 md:p-8">
						<div className="mb-4 md:mb-6 flex flex-col items-center">
							<h1 className="mt-2 md:mt-4 text-2xl md:text-3xl font-bold text-black">Login</h1>
							<p className="text-sm text-gray-600 mt-1 text-center">Login to your account</p>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 md:space-y-6">
							<div className="space-y-2">
								<label htmlFor="email" className="text-base md:text-lg font-semibold text-black">
									Email
								</label>
								<div className="relative">
									<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
									<Input
										type="email"
										{...register('email')}
										placeholder="Enter your email"
										className="border-primary pl-10 text-black focus-visible:ring-primary/50"
									/>
								</div>
								{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
							</div>

							<div className="space-y-2">
								<label htmlFor="password" className="text-base md:text-lg font-semibold text-black">
									Password
								</label>
								<div className="relative">
									<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
									<Input
										type="password"
										{...register('password')}
										placeholder="Enter your password"
										className="border-primary pl-10 text-black focus-visible:ring-primary/50"
									/>
								</div>
								{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
							</div>

							<div className="flex w-full justify-end">
								<a href="#" className="text-sm text-primary hover:underline">
									Forgot password?
								</a>
							</div>

							<Button 
								type="submit" 
								disabled={isSubmitting} 
								className="border-primary bg-primary w-full border text-white transition-all hover:bg-primary/90"
							>
								{isSubmitting ? (
									<span className="flex items-center justify-center">
										<FiLoader className="mr-2 h-4 w-4 animate-spin" />
										Logging in...
									</span>
								) : (
									'Login'
								)}
							</Button>
						</form>

						<Separator className="bg-primary my-4 md:my-6 w-full max-w-sm" />

						<Button
							onClick={handleGoogleLogin}
							variant="outline"
							className="border-primary w-full max-w-sm justify-center border-2 transition-all hover:bg-primary/10 hover:cursor-pointer">
							<img src="/svgs/google-icon.svg" alt="google-icon" className="mr-2 h-5 w-5" />
							Sign in with Google
						</Button>

						<p className="mt-4 text-sm md:text-base text-black">
							Don't have an account?{' '}
							<a href="/auth/register" className="text-primary font-medium hover:underline">
								Register
							</a>
						</p>
					</div>
				</div>

				{/* Alert - Fixed at the bottom center with a z-index */}
				{alert.show && (
					<div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
						<Alert
							className="bg-primary w-auto max-w-md rounded-md px-6 py-3 text-white shadow-lg"
						>
							<AlertDescription>{alert.message}</AlertDescription>
						</Alert>
					</div>
				)}
			</div>
		</div>
	)
}
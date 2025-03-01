import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {

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
						
						<LoginForm />
					</div>
				</div>

			</div>
		</div>
	)
}
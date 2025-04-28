import { LoginForm } from "@/components/auth/LoginForm";
import { FiMessageCircle } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div
      className="font-dm flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6"
      style={{
        backgroundImage: "url(/assets/bg-image.png)",
      }}
    >
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl shadow-2xl backdrop-blur-2xl md:h-auto md:flex-row">
        {/* Side Image Section - Left side */}
        <div className="hidden overflow-hidden rounded-l-xl md:block md:w-1/2 lg:w-3/5">
          <img
            src="/assets/side-image.png"
            alt="login"
            className="h-full w-full rounded-l-xl object-cover"
          />
        </div>

        {/* Login Form Section - Right side */}
        <div className="w-full rounded-xl md:w-1/2 md:rounded-l-none lg:w-2/5">
          <div className="flex h-full w-full flex-col items-center justify-center p-6 md:p-8">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-2 flex items-center md:hidden">
                <FiMessageCircle className="text-primary mr-2 h-6 w-6" />
                <h2 className="text-primary text-xl font-bold">Chat App</h2>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Welcome Back
              </h1>
              <p className="mt-1 text-center text-sm text-gray-600">
                Login to your account to continue
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

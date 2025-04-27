import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/store/auth.store';
import { FiShield, FiLoader } from 'react-icons/fi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = '/auth/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: redirectTo });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg">
          <FiLoader className="h-10 w-10 animate-spin text-primary mb-4" />
          <h2 className="text-lg font-semibold text-gray-900">Verifying your session</h2>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

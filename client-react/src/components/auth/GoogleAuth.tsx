import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

interface CredentialResponse {
  credential: string;
  select_by: string;
  client_id: string;
}

interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfig {
  theme: 'outline' | 'filled_blue' | 'filled_black';
  size: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  type?: 'standard' | 'icon';
  locale?: string;
  width?: string | number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleOneTapConfig) => void;
          renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleAuth() {
  const { setUser, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google One Tap
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: CredentialResponse) => {
          try {
            setLoading(true);
            const res = await fetch('/api/auth/one-tap-google/callback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ credential: response.credential }),
              credentials: 'include', // Important for cookies
            });
            
            const data = await res.json();
            if (res.ok && data.user) {
              setUser(data.user);
              navigate({ to: '/chat' });
            } else {
              throw new Error(data.message || 'Authentication failed');
            }
          } catch (error) {
            console.error('Google One Tap authentication failed:', error);
            setError(error instanceof Error ? error.message : 'Authentication failed');
          } finally {
            setLoading(false);
          }
        },
      });

      // Render the One Tap button
      const parent = document.getElementById('google-one-tap');
      if (parent) {
        window.google.accounts.id.renderButton(parent, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
        });
      }
    }
  }, [setUser, setLoading, setError, navigate]);

  return (
    <div className="space-y-4">
      <Button
        onClick={() => useAuthStore.getState().loginWithGoogle()}
        variant="outline"
        className="w-full"
        type="button"
        disabled={useAuthStore.getState().isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 mr-2"
          aria-hidden="true"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>
      
      <div id="google-one-tap" className="flex justify-center" />
    </div>
  );
}

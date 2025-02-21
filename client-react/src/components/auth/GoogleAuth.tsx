import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';

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
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Initialize Google One Tap
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: CredentialResponse) => {
          try {
            const res = await fetch('/auth/one-tap-google/callback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ credential: response.credential }),
            });
            
            const data = await res.json();
            if (data.user) {
              setUser(data.user);
            }
          } catch (error) {
            console.error('Google One Tap authentication failed:', error);
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
  }, [setUser]);

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full"
        type="button"
      >
        <img
          src="/google.svg"
          alt="Google logo"
          className="mr-2 h-4 w-4"
        />
        Continue with Google
      </Button>
      
      <div id="google-one-tap" className="flex justify-center" />
    </div>
  );
}

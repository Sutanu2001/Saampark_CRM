// src/hooks/useAuthActions.ts
import { useState, RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

export function useAuthActions(recaptchaRef: RefObject<ReCAPTCHA | null>) {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState<string>('admin@demo.com');
  const [password, setPassword] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!captchaToken) {
      setError('Please complete the reCAPTCHA verification.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/dashboards/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captchaToken })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      await login(data.token, data.user); 
      router.push('/');

    } catch (err: any) {
      setError(err.message);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    setCaptchaToken,
    error,
    isLoading,
    handleSignIn
  };
}
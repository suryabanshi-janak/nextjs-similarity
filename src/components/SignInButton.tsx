'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/ui/Button';

const SignInButton = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const singInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      // toast({
      //   title: 'Error signing in',
      //   message: 'Please try again later',
      //   type: 'error',
      // });
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={singInWithGoogle} isLoading={isLoading}>
      Sign In
    </Button>
  );
};

export default SignInButton;

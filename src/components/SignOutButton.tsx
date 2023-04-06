'use client';

import * as React from 'react';
import { Button } from '@/ui/Button';

const SignOutButton = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return <Button>Sign Out</Button>;
};

export default SignOutButton;

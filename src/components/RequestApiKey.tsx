'use client';

import { useState } from 'react';
import { Key } from 'lucide-react';
import { Inter } from 'next/font/google';

import { createApiKey } from '@/helpers/create-api-key';

import { toast } from '@/ui/toast';
import LargeHeading from '@/ui/LargeHeading';
import Paragraph from '@/ui/Paragraph';
import CopyButton from '@/ui/CopyButton';
import { Input } from '@/ui/Input';
import { Button } from './ui/Button';

const inter = Inter({ subsets: ['latin'] });

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async () => {
    try {
      setIsCreating(true);

      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          message: error.message,
          type: 'error',
        });

        return;
      }

      toast({
        title: 'Error',
        message: 'Something went wrong',
        type: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col items-center gap-6'>
        <Key className='w-12 h-12 mx-auto text-gray-400' />
        <LargeHeading>Request your API key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className='mt-6 sm:flex sm:items-center'
        action='#'
      >
        <div className='relative rounded-md shadow-md sm:min-w-0 sm:flex-1'>
          {apiKey ? (
            <CopyButton
              valueToCopy={apiKey}
              type='button'
              className='absolute inset-y-0 right-0 duration-300 animate-in fade-in'
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ''}
            placeholder='Request an api key to display it here!'
          />
        </div>
        <div className='flex justify-center mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};
export default RequestApiKey;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Button } from './ui/Button';
import { toast } from './ui/toast';
import { revokeApiKey } from '@/helpers/revoke-api-key';
import { createApiKey } from '@/helpers/create-api-key';

interface ApiKeyOptionsProps {
  apiKeyKey: string;
}

const ApiKeyOptions: React.FC<ApiKeyOptionsProps> = ({ apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();

  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey();
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error creating API key',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error revoking API key',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex items-center gap-2'>
          <p>
            {isCreatingNew
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey);

            toast({
              title: 'Copied',
              message: 'API key copied to clipboard',
              type: 'success',
            });
          }}
        >
          Copy
        </DropdownMenuItem>

        <DropdownMenuItem onClick={createNewApiKey}>
          Create a key
        </DropdownMenuItem>

        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;

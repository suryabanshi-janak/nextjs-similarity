'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from '@/ui/Button';
import { toast } from '@/ui/toast';
import { Copy } from 'lucide-react';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: 'Copied',
          message: 'Api key copied to clipboard',
          type: 'success',
        });
      }}
      variant='ghost'
      className={className}
    >
      <Copy className='w-5 h-5' />
    </Button>
  );
};

export default CopyButton;

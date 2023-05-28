import Icons from '@/components/Icons';
import { buttonVariants } from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import UserAuthForm from '@/components/UserAuthForm';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { FC } from 'react';

const inter = Inter({ subsets: ['latin'] });

const page: FC = () => {
  return (
    <div className={inter.className}>
      <div className='container absolute inset-0 flex flex-col items-center justify-center h-screen mx-auto'>
        <div className='flex flex-col justify-center w-full max-w-lg mx-auto space-y-6'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-fit',
              })}
              href='/'
            >
              <Icons.ChevronLeft className='w-4 h-4 mr-2' />
              Back to home
            </Link>

            <LargeHeading>Welcome back!</LargeHeading>
            <Paragraph>Please sign in using your Google account.</Paragraph>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;

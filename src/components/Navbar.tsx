import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Inter } from 'next/font/google';

import { buttonVariants } from '@/ui/Button';
import SignInButton from '@/components/ui/SignInButton';
import SignOutButton from '@/components/ui/SignOutButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className={inter.className}>
      <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 border-b shadow-sm backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 border-slate-300 dark:border-slate-700'>
        <div className='container flex items-center justify-between w-full mx-auto max-w-7xl'>
          <Link href='/' className={buttonVariants({ variant: 'link' })}>
            Text Similarity 1.0
          </Link>

          <div className='md:hidden'>
            <ThemeToggle />
          </div>

          <div className='hidden gap-4 md:flex'>
            <ThemeToggle />
            <Link
              href='/documentation'
              className={buttonVariants({ variant: 'ghost' })}
            >
              Documentation
            </Link>

            {session ? (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

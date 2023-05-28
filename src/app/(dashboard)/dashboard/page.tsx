import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import ApiDashboard from '@/components/ApiDashboard';
import RequestApiKey from '@/components/RequestApiKey';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & open-source text similarity API',
};

const page = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });

  return (
    <div className={inter.className}>
      <div className='mx-auto mt-20 max-w-7xl'>
        {apiKey ? (
          // @ts-expect-error Server Component
          <ApiDashboard />
        ) : (
          <RequestApiKey />
        )}
      </div>
    </div>
  );
};

export default page;

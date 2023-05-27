import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { formatDistance } from 'date-fns';

import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';

import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';
import { Input } from './ui/Input';
import Table from './Table';
import ApiKeyOptions from './ApiKeyOptions';

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequests.map((request) => ({
    ...request,
    timestamp: formatDistance(new Date(request.timestamp), new Date()),
  }));

  return (
    <div className='container flex flex-col gap-6'>
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className='flex flex-col items-center justify-center gap-4 lg:justify-start md:flex-row'>
        <Paragraph>Your API key:</Paragraph>
        <Input className='truncate w-fit' readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className='my-4 text-center md:text-start'>
        Your API history:
      </Paragraph>
      <Table userRequests={serializableRequests} />
    </div>
  );
};
export default ApiDashboard;

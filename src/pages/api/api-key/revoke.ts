import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getServerSession } from 'next-auth';

import { RevokeApiData } from '@/types/api';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { withMethods } from '@/lib/api-middlewares/with-methods';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (!validApiKey) {
      return res
        .status(500)
        .json({ error: 'This API key could not be revoked', success: false });
    }

    await db.apiKey.update({
      where: { id: validApiKey.id },
      data: {
        enabled: false,
      },
    });

    return res.status(200).json({ success: true, error: null });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues, success: false });
    }

    return res
      .status(500)
      .json({ error: 'Internal Server Error', success: false });
  }
};

export default withMethods(['POST'], handler);

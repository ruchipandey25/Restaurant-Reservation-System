"use server"

import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getUser = async () => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return { success: false, message: 'No token found' };
        }

        const decodedToken = verify(token, JWT_SECRET) as { userId: string; email: string };

        const user = await db.user.findUnique({
            where: { id: decodedToken.userId }
        });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, user };
    } catch (error) {
        return { success: false, message: 'Invalid token or error fetching user' };
    }
};

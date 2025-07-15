"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const changeRole = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }
        let updatedUser = null;
        if (user.role == UserRole.CUSTOMER) {
            updatedUser = await db.user.update({
                where: { id: userId },
                data: { role: UserRole.HOST },
            });
        } else {
            updatedUser = await db.user.update({
                where: { id: userId },
                data: { role: UserRole.CUSTOMER },
            });
        }

        return updatedUser;
    } catch (error) {
        console.error("Failed to change role:", error);
        throw new Error("Error changing user role");
    }
};

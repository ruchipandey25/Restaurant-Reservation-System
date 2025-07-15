import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId: string, email: string): string => {
    console.log(JWT_SECRET);
    return sign({ userId, email }, JWT_SECRET, {
        expiresIn: "14d",
    });
};

export const setAuthCookie = (token: string): void => {
    const cookieStore = cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60,
        path: "/",
    });
};

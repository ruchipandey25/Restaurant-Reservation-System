"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { registerUserSchema } from "@/lib/validationSchemas";
import { generateToken, setAuthCookie } from "@/lib/jwtUtils";

export const registerUser = async (formData: FormData) => {
    const parsedData = registerUserSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsedData.success) {
        return { success: false, errors: parsedData.error.flatten() };
    }

    const { name, email, password } = parsedData.data;

    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { success: false, message: "Email already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = generateToken(newUser.id, newUser.email);
    setAuthCookie(token);

    return { success: true, message: "User registered successfully", token };
};

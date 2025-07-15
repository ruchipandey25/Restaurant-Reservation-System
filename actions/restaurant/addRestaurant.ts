"use server";

import { db } from "@/lib/db";
import { addRestaurantSchema } from "@/lib/validationSchemas";

export const addRestaurant = async (formData: FormData, ownerid: string) => {

    const parsedData = addRestaurantSchema.safeParse({
        name: formData.get("name"),
        location: formData.get("location"),
        coverImage: formData.get("coverImage"),
        openTiming: formData.get("openTiming"),
        tagline: formData.get("tagline"),
        cuisineType: formData.get("cuisineType"),
        tableCharge: formData.get("tableCharge"),
    });

    if (!parsedData.success) {
        console.log("error")
        return { success: false, errors: parsedData.error.flatten() };
    }

    const { name, location, coverImage, openTiming, tagline, cuisineType, tableCharge } = parsedData.data;

    const newRestaurant = await db.restaurant.create({
        data: {
            name,
            location,
            coverImage,
            openTiming,
            ownerid,
            tagline,
            cuisineType,
            tableCharge: parseInt(tableCharge)
        },
    });

    return { success: true, message: "Restaurant added successfully", restaurant: newRestaurant };
};

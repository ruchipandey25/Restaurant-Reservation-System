"use server";

import { db } from "@/lib/db";
import { addMenuItemSchema } from "@/lib/validationSchemas";

export const addMenuItem = async (formData: FormData) => {

    const parsedData = addMenuItemSchema.safeParse({
        dish: formData.get("dish"),
        description: formData.get("description"),
        price: formData.get("price"),
        restaurantId: formData.get("restaurantId"),
    });

    if (!parsedData.success) {
        console.log("error")
        return { success: false, errors: parsedData.error.flatten() };
    }

    const { dish, description, price, restaurantId } = parsedData.data;
    const floatPrice = parseFloat(price)
    const newRestaurant = await db.menuItem.create({
        data: {
            dish,
            description,
            price: floatPrice,
            restaurantId
        },
    });

    return { success: true, message: "Restaurant added successfully", restaurant: newRestaurant };
};

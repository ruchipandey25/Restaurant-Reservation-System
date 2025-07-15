"use server"

import { db } from "@/lib/db";

interface GoLiveProps {
    restaurantId: string
}

export async function goLive({
    restaurantId
}: GoLiveProps) {

    try {
        await db.restaurant.update({
            where: {
                id: restaurantId
            },
            data: {
                isLive: true
            }
        })
    } catch (err) {
        console.log(err);
    }

}
"use server";

import { db } from "@/lib/db";

interface saveTableLayoutProps {
    restaurantId: string,
    rows: number;
    cols: number;
    disabledSeats: string[];
}
export async function saveTable({
    restaurantId,
    rows,
    cols,
    disabledSeats,
}: saveTableLayoutProps) {

    const table = await db.tableLayout.upsert({
        where: {
            restaurantId
        },
        update: {
            rows,
            cols,
            disabledSeats
        },
        create: {
            rows,
            cols,
            restaurantId,
        }
    });

    return table;
}

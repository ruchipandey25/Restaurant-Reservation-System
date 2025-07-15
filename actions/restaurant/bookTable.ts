"use server";

import { db } from "@/lib/db";
import { TimeSlote } from "@prisma/client";

interface BookTableLayoutProps {
    tableId: string;
    userId: string;
    seatId: string;
    timeSlote: TimeSlote;
    preOrder: { menuItemId: string; quantity: number }[]; // Array of pre-order items with their quantities
    totalAmount: number;
}

export async function bookTable({
    userId,
    tableId,
    seatId,
    preOrder,
    timeSlote,
    totalAmount,
}: BookTableLayoutProps) {
    try {
        // Step 1: Create Order Items
        const orderItems = await Promise.all(
            preOrder.map((item) =>
                db.orderItem.create({
                    data: {
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                    },
                })
            )
        );

        // Step 2: Create the Seat Booking
        const booking = await db.seatBooking.create({
            data: {
                seatNumber: seatId,
                userId,
                tableLayoutId: tableId,
                timeSlote,
                totalAmount,
                orderItemId: orderItems[0]?.id, // Associate the first order item with the booking (or handle as needed)
            },
        });

        // Step 3: Update the Table Layout
        await db.tableLayout.update({
            where: { id: tableId },
            data: {
                selectedSeats: {
                    push: seatId, // Add the seat to the list of selected seats
                },
            },
        });

        return booking;
    } catch (error) {
        console.error("Error booking table:", error);
        throw new Error("Failed to book table. Please try again.");
    }
}

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/app/hooks/useOrder";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { bookTable } from "@/actions/restaurant/bookTable";
import { useUser } from "@/app/hooks/useUser";

export default function Confirm() {
    const params = useParams();
    const { restaurantId } = params;
    const { user } = useUser();
    const { selectedTime, currentSelectedSeat, tableId, order } = useOrder();
    const [isPaying, setIsPaying] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();

    const tableBookingCost = 50;
    const totalCost = tableBookingCost + 200;

    const handlePayment = async () => {
        setIsPaying(true);

        setTimeout(() => {
            setIsPaying(false);
            setIsConfirmed(true);


            setTimeout(() => {
                router.push("/my-bookings");
            }, 1000);
        }, 2000);
        await bookTable({
            userId: user?.id!,
            seatId: currentSelectedSeat,
            tableId,
            totalAmount: totalCost,
            timeSlote: selectedTime,
            preOrder: order
        })
    };

    return (
        <div className="space-y-6 px-4 py-6">
            <div>
                <CardHeader>
                    <CardTitle>Payment for Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-medium">Selected Seat:</span> {currentSelectedSeat || "Not selected"}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Selected Time:</span> {selectedTime || "Not selected"}
                    </p>
                </CardContent>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cost Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <span className="font-medium">Table Booking Cost:</span> ${tableBookingCost.toFixed(2)}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Food Cost:</span> ${200}
                        </p>
                        <p className="text-gray-900 font-medium">
                            Total: ${totalCost.toFixed(2)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    onClick={handlePayment}
                >
                    Pay Now
                </Button>
            </div>

            <Dialog open={isPaying}>
                <DialogContent className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                    <p>Processing Payment...</p>
                </DialogContent>
            </Dialog>

            <Dialog open={isConfirmed}>
                <DialogContent className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-xl font-semibold text-green-600">Table Confirmed!</p>
                    <p className="text-sm text-gray-600">
                        Redirecting to your orders...
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}

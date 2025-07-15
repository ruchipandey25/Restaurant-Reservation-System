"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useOrder } from "@/app/hooks/useOrder";
import { Toast } from "../ui/toast";
import { toast } from "@/app/hooks/use-toast";

interface FoodItem {
    id: string;
    restaurantId: string;
    dish: string;
    description: string | null;
    price: number;
}

interface PreOrderProps {
    foodMenu: FoodItem[];
}

const PreOrder: React.FC<PreOrderProps> = ({ foodMenu }) => {

    const router = useRouter();

    const { order, handleAddItem, handleRemoveItem, selectedTime, currentSelectedSeat } = useOrder();

    const calculateTotal = () => {
        return order.reduce((total, orderItem) => {
            const item = foodMenu.find((food) => food.id === orderItem.menuItemId);
            return total + (item?.price || 0) * orderItem.quantity;
        }, 0);
    };


    const handleProceed = () => {
        const selectedItems = Object.entries(order).map(([id, quantity]) => {
            const item = foodMenu.find((food) => food.id === id);
            return { ...item, quantity };
        });
        console.log("Order Details:", {
            items: selectedItems,
            totalPrice: calculateTotal(),
        });
    };

    const handleSkip = () => {
        if (selectedTime && currentSelectedSeat) {
            router.push(`book-table/confirm`)
        } else {
            toast({ description: "Select Timing and table to continue" })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-bold">Preselect Menu</h2>
                <Button
                    variant="secondary"
                    onClick={handleSkip}
                >Skip</Button>
            </div>

            <div className="space-y-4 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Preorder Food</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {foodMenu.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-2 border rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">{item.dish}</p>
                                        {item.description && (
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            -
                                        </Button>
                                        <Input
                                            readOnly
                                            value={order.find((o) => o.menuItemId === item.id)?.quantity || 0}
                                            className="w-12 text-center"
                                        />

                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleAddItem(item.id)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold">
                        Total: ${calculateTotal().toFixed(2)}
                    </p>
                    <Button onClick={handleProceed} variant="default">
                        Proceed with Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PreOrder;

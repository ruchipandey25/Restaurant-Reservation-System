import { MenuItem, TimeSlote } from "@prisma/client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface OrderItem {
    menuItemId: string;
    quantity: number;
}

interface OrderContextType {
    selectedTime: TimeSlote;
    setSelectedTime: (slote: TimeSlote) => void;
    currentSelectedSeat: string;
    setCurrentSelectedSeat: (seat: string) => void;
    order: OrderItem[];
    setOrder: (order: OrderItem[]) => void;
    handleAddItem: (itemId: string) => void;
    handleRemoveItem: (itemId: string) => void;
    tableId: string;
    setTableId: (tableId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export type Props = {
    children: ReactNode;
};

export const MyOrderContextProvider: React.FC<Props> = ({ children }) => {
    const [selectedTime, setSelectedTime] = useState<TimeSlote>("A");
    const [currentSelectedSeat, setCurrentSelectedSeat] = useState<string>("");
    const [tableId, setTableId] = useState<string>("");
    const [order, setOrder] = useState<OrderItem[]>([]);

    const handleAddItem = (itemId: string) => {
        setOrder((prev) => {
            const existingItemIndex = prev.findIndex((orderItem) => orderItem.menuItemId === itemId);

            if (existingItemIndex !== -1) {
                const updated = [...prev];
                updated[existingItemIndex].quantity += 1;
                return updated;
            } else {
                return [...prev, { menuItemId: itemId, quantity: 1 }];
            }
        });
    };

    const handleRemoveItem = (itemId: string) => {
        setOrder((prev) => {
            const existingItemIndex = prev.findIndex((orderItem) => orderItem.menuItemId === itemId);

            if (existingItemIndex !== -1) {
                const updated = [...prev];
                if (updated[existingItemIndex].quantity > 1) {
                    updated[existingItemIndex].quantity -= 1;
                } else {
                    updated.splice(existingItemIndex, 1);
                }
                return updated;
            }
            return prev;
        });
    };
    return (
        <OrderContext.Provider
            value={{
                selectedTime,
                setSelectedTime,
                currentSelectedSeat,
                setCurrentSelectedSeat,
                order,
                setOrder,
                handleAddItem,
                handleRemoveItem,
                tableId,
                setTableId,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};

"use client"

import { MyOrderContextProvider } from "@/app/hooks/useOrder"

type OrderProviderProps = {
    children: React.ReactNode
}

const OrderProvider: React.FC<OrderProviderProps> = ({
    children
}) => {
    return (
        <MyOrderContextProvider>
            {children}
        </MyOrderContextProvider>
    )
}

export default OrderProvider;

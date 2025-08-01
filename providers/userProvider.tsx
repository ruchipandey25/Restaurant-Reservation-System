"use client"

import { MyUserContextProvider } from "@/app/hooks/useUser"


type UserProviderProps = {
    children: React.ReactNode
}


const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;

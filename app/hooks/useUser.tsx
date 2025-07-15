import { getUser } from '@/actions/user/getUser';
import { User as PrismaUser } from '@prisma/client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface UserContextType {
    user: PrismaUser | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export type Props = {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const [user, setUser] = useState<PrismaUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Define fetchUser as a memoized function so it can be used outside useEffect
    const fetchUser = useCallback(async () => {
        setLoading(true);
        const { user, success } = await getUser();
        if (success) {
            setUser(user!);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    // Fetch user on initial load
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }} {...props} />
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
};

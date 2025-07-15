import { LogOut, Settings } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';
import { logoutUser } from '@/actions/user/logoutUser';
import { useUser } from '@/app/hooks/useUser';

export default function ProfileTab() {

    const { user } = useUser();

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col p-5 space-y-2 border rounded-lg shadow-lg bg-secondary w-max'>
            <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 bg-black rounded-full'>
                    <img src="" alt="" />
                </div>
                <div className='flex flex-col'>
                    <span className='font-bold uppercase'>{user?.name}</span>
                    <span className='text-sm'>{user?.email}</span>
                </div>
            </div>

            <div className='flex p-2 space-x-2'>
                <button className='flex items-center p-1 space-x-2 text-sm bg-white border rounded-lg'>
                    <Settings size={20} />
                    <Link href={"/profile"}>Manage account</Link>
                </button>
                <button
                    onClick={handleLogout}
                    className='flex items-center p-1 space-x-2 text-sm bg-white border rounded-lg'>
                    <LogOut size={20} />
                    <span>Sign out</span>
                </button>
            </div>
        </motion.div>
    )
}
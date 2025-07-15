"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
import ProfileTab from "./profile-tab";
import { Button } from "../ui/button";

interface NavBarProps {
    isUser: boolean;
}

export default function NavBar({ isUser }: NavBarProps) {
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="flex items-center justify-between p-4 border-b h-18">
            <div>
                <Link href="/">
                    <h1 className="text-3xl font-bold cursor-pointer">DineDelight</h1>
                </Link>
            </div>
            {isUser ? (
                <div className="relative p-2 rounded-full bg-secondary" onClick={() => setProfileOpen(!profileOpen)}>
                    <UserRound className="cursor-pointer" />
                    {profileOpen && (
                        <div className="absolute z-10 top-12 right-2">
                            <ProfileTab />
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-x-2">
                    <Button
                        onClick={() => router.push("/sign-in")}
                        className="transition duration-200 border rounded-lg bg-slate-950"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => router.push("/sign-up")}
                        className="transition duration-200 border rounded-lg bg-slate-950"
                    >
                        Sign Up
                    </Button>
                </div>
            )}
        </div>
    );
}
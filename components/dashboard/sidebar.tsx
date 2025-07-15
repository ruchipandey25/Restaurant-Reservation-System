"use client";

import {
    CookingPot,
    Settings,
    UserPen
} from "lucide-react";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { ElementType } from "react";
import Link from "next/link";
import clsx from "clsx";

import { UserRole } from "@prisma/client";

import { useUser } from "@/app/hooks/useUser";

interface NavigationLink {
    route: string;
    label: string;
    icon: ElementType;
    requiresHost?: boolean;
}

const navigationLinks: NavigationLink[] = [
    { route: "/profile", label: "Profile", icon: UserPen },
    { route: "/dashboard", label: "Dashboard", icon: GoHome, requiresHost: true },
    { route: "/my-restaurants", label: "My Restaurants", icon: CookingPot, requiresHost: true },
    { route: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useUser();

    const filteredLinks = navigationLinks.filter(
        (link) => user?.role === UserRole.HOST || !link.requiresHost
    );

    return (
        <div className="w-[250px] h-full p-10 border-r">
            <ul className="flex flex-col space-y-2">
                {filteredLinks.map(({ route, label, icon: Icon }) => {
                    const isActive = pathname === route;
                    return (
                        <Link key={route} href={route}>
                            <li
                                className={clsx(
                                    "flex items-center gap-2 p-2 rounded-lg transition-colors duration-200",
                                    isActive ? "bg-slate-300" : "hover:bg-slate-200"
                                )}
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

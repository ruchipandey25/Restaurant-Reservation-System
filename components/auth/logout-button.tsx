"use client";

import { logoutUser } from "@/actions/user/logoutUser";
import { useRouter } from "next/navigation";
import { toast } from "@/app/hooks/use-toast";
import { Button } from "../ui/button";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const result = await logoutUser();

            if (result.success) {
                toast({ title: "Logged out successfully" });
                router.push("/");
            } else {
                toast({ title: "Problem logging out", description: "Please try again later." });
            }
        } catch (error) {
            toast({ title: "An error occurred", description: "Unable to log out at this time." });
        }
    };

    return (
        <Button
            className="px-4 py-2 text-sm font-bold text-red-900 transition-all duration-200 bg-red-200 rounded-lg hover:bg-red-400 hover:underline"
            onClick={handleLogout}
        >
            Sign Out
        </Button>
    );
};

export default LogoutButton;

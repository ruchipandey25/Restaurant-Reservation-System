import { getUser } from "@/actions/user/getUser"
import LogoutButton from "../auth/logout-button";
import { UserRound } from "lucide-react";

export default async function Profile() {
    const { user } = await getUser();
    return (
        <div className="max-w-lg p-10 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Account Details</h2>

            <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-700/20">
                    <UserRound
                        className="text-slate-400"
                        size={40}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800 uppercase">{user?.name}</span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
            </div>

            <div className="space-y-1">
                <p className="font-semibold text-gray-700">Edit Personal Information</p>
                <button className="text-xs text-slate-400">Change your Profile Name or Email</button>
            </div>

            <button className="text-sm text-slate-400 hover:underline">Change Password</button>

            <div className="space-y-2">
                <LogoutButton />
            </div>
        </div>
    )
}
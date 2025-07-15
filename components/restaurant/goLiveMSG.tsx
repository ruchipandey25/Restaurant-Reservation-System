import { AlertCircle } from "lucide-react";

export default function GoLiveMSG() {
    return (
        <div className="w-full p-4 space-y-2 text-red-500 bg-red-100 border border-red-500 rounded-lg">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
                <AlertCircle className="w-5 h-5" />
                Your Restaurant Is Not Live
            </h1>
            <p className="text-sm text-red-500">
                Your restaurant is currently offline, meaning it is not visible to customers. Please update your status to go live and attract customers.
            </p>
        </div>
    );
}

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Welcome() {
    return (
        <div className="flex justify-between max-w-6xl p-4 h-[80vh] items-center mx-auto">
            <div className="flex flex-1 flex-col justify-end pb-32 p-4 space-y-4">
                <h2 className="text-5xl font-bold">DineDelight</h2>
                <p className="text-4xl font-bold bg-black text-white p-2">Discover Your Favorite spots! </p>
                <p >#A restaurant booking company</p>
                <Link href={"/sign-up"}>
                    <Button>Sign-up</Button>
                </Link>
            </div>
            <div className="flex-1 relative w-md aspect-square">
                <Image className="rounded-lg object-cover" fill src={"/assets/home.png"} alt="HomeImage" />
            </div>
        </div>
    )
}
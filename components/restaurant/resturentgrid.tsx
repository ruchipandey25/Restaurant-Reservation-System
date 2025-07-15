import Image from "next/image"
import Link from "next/link"

import * as motion from "framer-motion/client"

import { db } from "@/lib/db";

export default async function RestaurantGrid() {
    const restaurants = await db.restaurant.findMany({
        where: {
            // isLive: true
        }
    });

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map((restaurant) => (
                    <Link href={`/restaurant/${restaurant.id}`} passHref key={restaurant.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "none" }}
                            transition={{ duration: 0.5 }}
                            className="h-full overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={restaurant.coverImage}
                                    alt={restaurant.name}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

import * as motion from "framer-motion/client"
import { IoLocationSharp } from "react-icons/io5";
import { FaShare } from "react-icons/fa";

import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/restaurant/rating-stars";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import MyCarousel from "@/components/restaurant/my-carousel";
import Menutable from "@/components/restaurant/menu-table";


interface PageProps {
    params: {
        restaurantId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const resturent = await db.restaurant.findUnique({
        where: {
            id: params.restaurantId
        },
        include: {
            menu: true,
        },
    })
    return (
        <div className="max-w-6xl p-4 mx-auto space-y-20">
            <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "none" }}
                transition={{ duration: 0.5 }}
                className="flex">
                <div className="w-[50%] relative flex flex-col gap-6 p-6">
                    <FaShare
                        size={20}
                        className="absolute text-blue-400 cursor-pointer top-4 right-4"
                    />

                    <div>
                        <h4 className="text-5xl font-bold mb-2">{resturent?.name}</h4>
                        <p className="text-slate-500 text-lg">{resturent?.tagline}</p>
                    </div>

                    <div className="space-y-4">
                        <RatingStars rating={2} />
                        <p className="flex items-center text-slate-600 text-sm">
                            <IoLocationSharp size={20} className="mr-2 text-blue-500" />
                            {resturent?.location}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <h4 className="text-2xl font-semibold mb-1">Cuisine Type</h4>
                        <p className="text-slate-600">{resturent?.cuisineType}</p>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                        <Link href={`/restaurant/${params.restaurantId}/book-table`}>
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-md">
                                Book a Table
                            </Button>
                        </Link>
                        <p className="font-bold text-slate-700">
                            Table Starting at ${resturent?.tableCharge}
                        </p>
                    </div>
                </div>

                <MyCarousel images={[resturent?.coverImage!]} />
            </motion.div>
            <div>
                <Accordion type="single" collapsible>
                    <AccordionItem value="menu-items">
                        <AccordionTrigger>Available food items</AccordionTrigger>
                        <AccordionContent>
                            <Menutable menuItems={resturent?.menu!} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="contact-info">
                        <AccordionTrigger>Contact Information</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                <div className="text-slate-700 space-y-2">
                                    <p>
                                        <span className="font-bold">Phone:</span> +91 7584XXXXXX
                                    </p>
                                    <p>
                                        <span className="font-bold">Email:</span> contact@fakerestaurant.com
                                    </p>
                                    <p>
                                        <span className="font-bold">Address:</span> 123 Main Street, New York, NY 10001
                                    </p>
                                    <p>
                                        <span className="font-bold">Opening Hours:</span> Mon-Sun, 9:00 AM - 10:00 PM
                                    </p>
                                    <p>
                                        <span className="font-bold">Website:</span>{" "}
                                        <a
                                            href="https://www.fakerestaurant.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            www.fakerestaurant.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

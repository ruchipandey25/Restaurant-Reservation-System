import TableGrid from "@/components/restaurant/table-grid";
import TimeSelector from "@/components/restaurant/time-selector";
import PreOrder from "@/components/restaurant/pre-order";
import { db } from "@/lib/db";

interface PageProps {
    params: {
        restaurantId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: params.restaurantId,
        },
        select: {
            tableLayout: true,
            menu: true,
        },
    });

    return (
        <div className="space-y-8 p-6">
            <div className=" p-10 border-b-2 border-dashed">
                <h2 className="text-3xl font-semibold">Select your time</h2>
                <TimeSelector />
            </div>
            <div className="px-10 border-b-2 border-dashed">
                <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
                <TableGrid
                    mode="user"
                    tableLayout={restaurant?.tableLayout!}
                    restaurantId={params.restaurantId}
                />
            </div>
            <div>
                <PreOrder
                    foodMenu={restaurant?.menu!}
                />
            </div>
        </div>
    );
}

import MyRestaurant from "@/components/restaurant/myRestaurant";
import { db } from "@/lib/db";
import { Restaurant } from "@prisma/client";


interface ManageMenuProps {
    params: {
        restaurantId: string;
    };
}

export default async function Page({ params }: ManageMenuProps) {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: params.restaurantId
        },
        include: {
            tableLayout: true,
            menu: true,
        }
    })

    const menuItemAvailable = restaurant?.menu.length === 0 ? false : true;
    const isLayoutSet = restaurant?.tableLayout ? true : false;

    return (
        <MyRestaurant
            restaurant={restaurant as Restaurant}
            menu={restaurant?.menu!}
            tablelayout={restaurant?.tableLayout!}
            canGoLive={menuItemAvailable && isLayoutSet}
        />
    )
}
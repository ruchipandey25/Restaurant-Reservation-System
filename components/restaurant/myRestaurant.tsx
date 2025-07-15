'use client'

import { goLive } from "@/actions/restaurant/goLive";
import { toast } from "@/app/hooks/use-toast";
import GoLiveMSG from "@/components/restaurant/goLiveMSG";
import ManageMenu from "@/components/restaurant/manage-menu";
import TableGrid from "@/components/restaurant/table-grid";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { MenuItem, Restaurant, TableLayout } from "@prisma/client";

import { Menu, Table as TableIcon } from "lucide-react";

interface MyRestaurantProps {
    restaurant: Restaurant,
    tablelayout: TableLayout
    menu: MenuItem[]
    canGoLive: boolean
}

export default function MyRestaurant({
    restaurant,
    tablelayout,
    menu,
    canGoLive
}: MyRestaurantProps) {

    const handleGoLive = async () => {
        if (canGoLive) {
            await goLive({ restaurantId: restaurant.id });
            toast({ description: "restaurant is Live Now" })
        } else {
            toast({
                description: "Can not go LIVE",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="p-10 space-y-4 w-full max-w-5xl">
            {
                !restaurant.isLive && <GoLiveMSG />
            }
            <Tabs defaultValue='menu' className='space-y-6'>
                <TabsList className='p-2 bg-slate-200'>
                    <TabsTrigger value='menu' className='data-[state=active]:bg-slate-400 gap-2'>
                        <Menu />
                        Menu Items
                    </TabsTrigger>
                    <TabsTrigger value='table' className='data-[state=active]:bg-slate-400 gap-2'>
                        <TableIcon />
                        Table Layout
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='menu'>
                    <ManageMenu
                        menu={menu}
                        restaurantId={restaurant.id}
                    />
                </TabsContent>
                <TabsContent value='table'>
                    <TableGrid
                        mode="host"
                        tableLayout={tablelayout}
                        restaurantId={restaurant.id} />
                </TabsContent>
            </Tabs>
            <Button
                className={`${canGoLive ? "bg-green-500 hover:bg-green-600" : "cursor-not-allowed bg-slate-500"
                    }`}
                onClick={handleGoLive}
            >
                GO LIVE
            </Button>
        </div >
    )
}
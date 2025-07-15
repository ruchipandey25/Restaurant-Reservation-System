import { db } from "@/lib/db";
import Image from "next/image"
import RestaurantGrid from "@/components/restaurant/resturentgrid";
import SearchBar from "@/components/home/searchBar";

export default async function Home() {
  const restaurants = await db.restaurant.findMany();
  return (
    <div className="p-4 mx-auto space-y-4">
      <div className="relative w-full justify-center items-center h-56 flex">

        <SearchBar restaurants={restaurants} />
        <Image
          className="absolute object-cover -z-10"
          src={"/assets/authback.jpg"}
          alt="foodImage"
          fill
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold">Top resturents near you</h2>
        <RestaurantGrid />
        {/* <MyPagination /> */}
      </div>
    </div>
  );
}

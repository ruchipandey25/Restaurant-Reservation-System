import { db } from "@/lib/db";
import { getUser } from "@/actions/user/getUser";
import List from "./list";

export default async function MyBookings() {
    const { user } = await getUser();
    const myBookings = await db.seatBooking.findMany({
        where: {
            userId: user?.id
        }
    })


    return (
        <List
            myBookings={myBookings}
        />
    );
}

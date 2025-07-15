import { getUser } from "@/actions/user/getUser";
import NavBar from "@/components/home/navBar";
import Welcome from "@/components/welcome";

export default async function Page() {
    const { user } = await getUser();
    return (
        <div>
            <NavBar isUser={user ? true : false} />
            <Welcome />
        </div>
    )
}
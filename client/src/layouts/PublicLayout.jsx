import { Outlet } from "react-router";
import PublicNavBar from "../components/PublicNavBar";

function PublicLayout() {
    return (
        <>
            <PublicNavBar />
            <Outlet />
        </>
    )
}

export default PublicLayout;
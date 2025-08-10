import { Outlet } from "react-router";

function PublicLayout() {
    return (
        <div className="bg-fire-500">
            <Outlet />
        </div>
    )
}

export default PublicLayout;
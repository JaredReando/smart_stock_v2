import { FC } from 'react';
import buildRouter from "./build_router";
import AdminPage from "../pages/Admin/admin_page";
import RestockReport from "../pages/Admin/restock_report";

const AdminRouter: FC = () => {
    return buildRouter('/admin', {
        '/home': AdminPage,
        '/settings': RestockReport,
    });
};

export default AdminRouter;

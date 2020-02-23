import { FC } from 'react';
import buildRouter from "./build_router";
import AdminPage from "../pages/Admin/admin_page";
import RestockReport from "../pages/Admin/restock_report_page";
import FixedBins from "../pages/Admin/fixed_bins_page";

const AdminRouter: FC = () => {
    return buildRouter('/admin', {
        '/': AdminPage,
        '/restock_report': RestockReport,
        '/fixed_bins': FixedBins,

    });
};

export default AdminRouter;
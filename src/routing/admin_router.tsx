import { FC } from 'react';
import buildRouter from './build_router';
import AdminPage from '../pages/Admin/admin_page';
import RestockReport from '../pages/Admin/restock_report_page';
import FixedBins from '../pages/Admin/fixed_bins_page';
import ClientRestockingPage from '../pages/Client/client_restocking_page';

const AdminRouter: FC = () => {
    return buildRouter('/', {
        '/': AdminPage,
        '/restock_report': RestockReport,
        '/fixed_bins': FixedBins,
        '/client': ClientRestockingPage,
    });
};

export default AdminRouter;

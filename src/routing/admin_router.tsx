import { FC } from 'react';
import buildRouter from './build_router';
import InventoryPage from '../pages/admin/inventory_page';
import RestockReport from '../pages/admin/restock_report_page';
import FixedBins from '../pages/admin/fixed_bins_page';
import ClientRestockingPage from '../pages/client/client_restocking_page';

const AdminRouter: FC = () => {
    return buildRouter('/', {
        '/': InventoryPage,
        '/restock_report': RestockReport,
        '/fixed_bins': FixedBins,
        '/client': ClientRestockingPage,
    });
};

export default AdminRouter;

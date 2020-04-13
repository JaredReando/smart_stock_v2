import React, { useState } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import {useRestockUpdater} from "../../hooks";
import AdminHeader from "./admin_header";
import {Box, Column} from '../../component_library/styles/layout';
import RestockInfoDashboard from "./restock_info_dashboard";
import AppModal from "../../component_library/modals/app_modal";
import CreateRestockReportModal from "./create_restock_report_modal";

interface Props {
  report?: any;
}

const RestockReport: React.FC<Props> = () => {
  const [showStatus, setShowStatus] = useState(false);
  const status = { title: 'Status', key: 'isMissing', ratio: 5 };
  const report = useRestockUpdater();
  const headerItems = [
    {
      title: 'Source',
      key: 'sourceBin',
      ratio: 2,
    },
    {
      title: 'Destination',
      key: 'destinationBin',
      ratio: 2,
    },
    {
      title: 'Material',
      key: 'material',
      ratio: 3,
    },
    {
      title: 'Description',
      key: 'description',
      ratio: 4,
    },
    {
      title: 'Qty.',
      key: 'available',
      ratio: 1,
    },
    {
      title: 'Storage Unit',
      key: 'storageUnit',
      ratio: 2,
    },
  ];

  if (showStatus) {
    headerItems.unshift(status);
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <AppModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateRestockReportModal closeModal={() => setShowModal(s => !s)}/>
      </AppModal>

      <Column height="100%">
        <AdminHeader
            title="Restock Report"
        >
          <RestockInfoDashboard
            handleClick={() => setShowModal(s => !s)}
          />
        </AdminHeader>
        <Box
          flexGrow={1}
          overflow="hidden"
        >
          <DataTable columnHeaders={headerItems} rowData={report} />

        </Box>
      </Column>
    </>
  );
};

export default RestockReport;

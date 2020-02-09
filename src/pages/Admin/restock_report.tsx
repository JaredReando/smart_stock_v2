import React, { useState } from 'react';
import DataTable from '../../components/data_table';

interface Props {
  report: any;
}
const RestockReport: React.FC<Props> = ({ report }) => {
  const [showStatus, setShowStatus] = useState(false);
  const status = { title: 'Status', key: 'isMissing', ratio: 5 };
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

  return (
    <>
      <button onClick={() => setShowStatus(s => !s)}>Status</button>
      <DataTable columnHeaders={headerItems} rowData={report} />
    </>
  );
};

export default RestockReport;

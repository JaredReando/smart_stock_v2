import React from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import {useFixedBinUpdater} from "../../hooks";
import {Column} from '../../component_library/styles/layout';
import AdminHeader from "./admin_header";


interface Props {
  fixedBins: any;
}
const FixedBins: React.FC<Props> = () => {
  const fixedBins = useFixedBinUpdater();
  const headerItems = [
    {
      title: 'Bin',
      key: 'Bin',
      ratio: 1,
    },
    {
      title: 'Product',
      key: 'Product',
      ratio: 2,
    },
    {
      title: 'Description',
      key: 'Description',
      ratio: 3,
    },
  ];
  return (
    <Column height="100%">
      <AdminHeader title="Fixed Bins"/>
      <DataTable columnHeaders={headerItems} rowData={fixedBins} />
    </Column>
  );
};

export default FixedBins;

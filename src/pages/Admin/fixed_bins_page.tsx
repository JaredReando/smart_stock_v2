import React from 'react';
import DataTable from '../../components/data_table/data_table';
import {useFixedBinUpdater} from "../../hooks";
import {FlexColumn} from '../../styles/layout';
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
    <FlexColumn height="100%">
      <AdminHeader title="Fixed Bins"/>
      <DataTable columnHeaders={headerItems} rowData={fixedBins} />
    </FlexColumn>
  );
};

export default FixedBins;

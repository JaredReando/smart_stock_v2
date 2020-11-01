import { Tab } from '../component_library/components/vertical_icon_bar/vertical_icon_bar';

export interface PouchInventoryDoc {
    doc: any; //TODO: sync with 'InventoryRecord' type
    id: string;
    key: string;
    value: {
        rev: string;
    };
}

export interface RawInventoryRecord {
    'Storage Location': number;
    'Storage Type': string;
    'Storage Bin': string;
    Material: string;
    'Material Description': string;
    'Available stock': number;
    'Storage Unit': string;
    Plant: number;
    'Pick Quantity': number;
    'Storage Unit Type': 'PAL' | '';
    Quant: number;
    Duration: number;
    'GR Date': string;
}

export interface FixedBinStore {
    loading: boolean;
    fixedBins: FixedBinRecord[];
}

export interface AdminDataStoreContext {
    fixedBinStore: FixedBinStore;
    inventoryStore: any;
    restockStore: any[];
    localDB: any;
}

export interface ColumnHeader extends Partial<StringKeys> {
    title: string;
    key: string;
    ratio: number;
    width?: string;
}

export interface RowData extends StringKeys {}

export interface StringKeys {
    [key: string]: string | number;
}

export interface FixedBinRecord extends StringKeys {
    id: string;
    bin: string;
    description: string;
    item: string;
}

export interface AirtableBinRecord {
    id: string;
    fields: {
        Bin: string;
        DESCRIPTION: string[];
        ITEM: string;
    };
}

export interface AirtableFixBinResponse {
    offset?: string;
    records: Array<AirtableBinRecord>;
}

export interface InventoryRecord {
    storageLocation: number;
    storageType: string;
    bin: string;
    material: string;
    stockCategory: string;
    available: number;
    storageUnit: string;
    storageUnitType: 'PAL';
}

export interface InventorySummary {
    lastUpdated: string;
    recordCount: number;
}

type InventoryDB = any[];

export interface InventoryStore {
    inventoryDB: InventoryDB;
    inventorySummary: InventorySummary | null;
}

export type Permission = true | false;

export interface AuthContext {
    validUser?: Permission;
}

export interface DetailProps {
    title: string;
    data: string;
}

export interface NavTab extends Tab {
    path?: string;
}

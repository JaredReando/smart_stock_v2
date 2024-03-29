import { Tab } from '../component_library/components/vertical_icon_bar/vertical_icon_bar';

export interface PouchInventoryDoc {
    doc: { _id: string; _rev: string } & InventoryRecord;
    id: string;
    key: string;
    value: {
        rev: string;
    };
}

export interface RawInventoryRecord {
    [key: string]: string | number;
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

export interface StockSource extends InventoryRecord {
    destinationBin: string;
}
export interface FoundOverstock {
    stockSources: StockSource[];
    outOfStock: Array<{
        material: string;
        description: string;
    }>;
}

export interface InventoryRecord {
    storageLocation: number;
    storageType: string;
    storageBin: string;
    material: string;
    materialDescription: string;
    stockCategory: string;
    available: number;
    storageUnit: string;
    pickQuantity: string;
    storageUnitType: 'PAL';
    quant: string;
    duration: string;
    grDate: string;
}

export interface InventorySummary {
    lastUpdated: string;
    recordCount: number;
}

export interface RestockSummary {
    lastUpdated: string;
    recordCount: number;
    outOfStock: string[];
}

export interface StockLevels {
    total: number;
    empty: string[];
    filled: string[];
}
export interface RestockRecord {
    status: 'pending' | 'complete' | 'missing';
    sourceBin: string;
    destinationBin: string;
    material: string;
    description: string;
    available: number;
    storageUnit: string;
    stockLevels: StockLevels;
    id: string;
}

export interface FixedBinStore {
    loading: boolean;
    fixedBins: FixedBinRecord[];
    getFixedBins: () => FixedBinRecord[];
}

export interface AdminDataStoreContext {
    inventorySummary: InventorySummary;
    fixedBinStore: FixedBinStore;
    inventoryStore: any;
    restockStore: any[];
    overwriteDBs: (inventory: InventoryRecord[], summary: InventorySummary) => Promise<void>;
    localDB: any;
}

export interface ColumnHeader extends Partial<StringKeys> {
    title: string;
    key: string;
    ratio: number;
    width?: string;
    render?: (args?: any) => JSX.Element;
}

export interface RowData extends StringKeys {}

export interface StringKeys {
    [key: string]: any;
}

export interface FixedBinRecord extends StringKeys {
    id: string;
    bin: string;
    description: string;
    lastModified: string;
    item: string;
}

export interface AirtableBinRecord {
    id: string;
    fields: {
        Bin: string;
        DESCRIPTION: string[];
        ITEM: string;
        LAST_MODIFIED: string;
    };
}

export interface AirtableFixBinResponse {
    offset?: string;
    records: Array<AirtableBinRecord>;
}

export interface InventoryStore {
    getInventory: () => Promise<InventoryRecord[]>;
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
    onClick?: () => void;
    render: () => any;
}

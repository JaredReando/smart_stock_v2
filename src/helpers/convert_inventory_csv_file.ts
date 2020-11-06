import { InventoryRecord, RawInventoryRecord } from '../constants/types';
import { csvToObject } from './csv_to_object';
import { hasRequiredKeys } from './has_required_headers';

export const requiredHeaders: Array<keyof RawInventoryRecord> = [
    'Storage Bin',
    'Material',
    'Material Description',
    'Available stock',
    'Storage Unit',
    'Storage Type',
    'Storage Location',
];

/**
 * converts an instance of RawInventoryRecord into
 * @param object
 * @param nameConversion
 * */
function renameRawInventoryRecord(
    object: RawInventoryRecord,
    nameConversion: { [name: string]: string },
) {
    const renamedRecordObject: { [name: string]: string | number } = {};
    const objectKeys = Object.keys(object);
    objectKeys.forEach(key => {
        const convertKeyTo = nameConversion[key];
        const objectValueAtKey = object[key];
        renamedRecordObject[convertKeyTo] = objectValueAtKey;
    });
    return renamedRecordObject;
}

const inventoryNameConversion: { [key: string]: string } = {
    'Storage Location': 'storageLocation',
    'Storage Type': 'storageType',
    'Storage Bin': 'storageBin',
    Material: 'material',
    'Material Description': 'materialDescription',
    'Available stock': 'available',
    'Storage Unit': 'storageUnit',
    Plant: 'plant',
    'Pick Quantity': 'pickQuantity',
    'Storage Unit Type': 'storageUnitType',
    Quant: 'quant',
    Duration: 'duration',
    'GR Date': 'grDate',
};

export const convertInventoryCSVFile = (
    file: File,
    requiredHeaders: Array<keyof RawInventoryRecord>,
): Promise<InventoryRecord[]> => {
    const reader = new FileReader();
    return new Promise((res, rej) => {
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const csvFile = e.target!.result; //selected local .csv file
            const parsedFile: RawInventoryRecord[] = csvToObject(csvFile);
            const csvKeys: string[] = Object.keys(parsedFile[0]);
            let { isValid, missingHeaders } = hasRequiredKeys(requiredHeaders as string[], csvKeys);
            if (isValid) {
                const latestInventory = parsedFile.map((record: RawInventoryRecord) => {
                    return (renameRawInventoryRecord(
                        record,
                        inventoryNameConversion,
                    ) as unknown) as InventoryRecord;
                });
                res(latestInventory);
            } else {
                missingHeaders = missingHeaders.map(h => `"${h}"`);
                const pluralOrSingular = missingHeaders.length === 1 ? 'field' : 'fields';
                alert(
                    `UPLOAD ERROR: Missing required report ${pluralOrSingular} -- ${missingHeaders.join(
                        ', ',
                    )}`,
                );
            }
        };
        reader.readAsText(file);
    });
};

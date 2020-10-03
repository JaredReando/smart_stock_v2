import uuid from 'uuid';
import { FixedBinRecord } from '../api/airtable';

export const hello = 'hello!';

export class SmartStock {
    constructor(private inventory: any, private fixedBins: FixedBinRecord[]) {
        this.inventory = inventory;
        this.fixedBins = fixedBins;
        //Experimental --> for Dashboard summary view.
        this.outOfStock = this.getMaterialStockLevels();
    }

    get MaterialStockLevels() {
        const emptyRestock = this.getEmptyFixedBins();
        const fixedBinDetails = this.fixedBinsJSON.reduce((binDetails, fixedBin) => {
            const bin = fixedBin['Bin'];
            const product = fixedBin['Product'];
            if (!binDetails[product]) {
                binDetails[product] = { binCount: 0, fixedBins: [], binsStocked: 0 };
            }
            if (!emptyRestock.includes(bin)) {
                binDetails[product].binsStocked += 1;
            }
            binDetails[product].binCount += 1;
            binDetails[product].fixedBins.push(bin);
            return binDetails;
        }, {});

        return fixedBinDetails;
    }

    createRestockReportNestedObject = () => {
        const restockReportObjectArray = this.getFixedBinRestockReport();
        const reducer = (nestedObj, obj, index) => {
            nestedObj[index] = obj;
            return nestedObj;
        };
        return restockReportObjectArray.reduce(reducer, {});
    };

    createInventoryReportNestedObject = () => {
        const inventoryReportObjectArray = this.getFifoSortedInventory();
        //method will only work for arrays containing objects with identical key/value pairs
        //1st level: storage location
        const reducer = (nestedObj, obj) => {
            const objStorageLocation = obj['storageLocation'];
            const objStorageType = obj['storageType'];
            const objStorageBin = obj['storageBin'];
            const objStorageUnit = obj['storageUnit'];

            const checkObjectModel = () => {
                //Checks for existence of all required inventory record data structure nodes
                //If any are missing, it is added to nestedObject as a new key
                //Does not add actual inventory data. Just creates the empty object node tree

                if (!nestedObj[objStorageLocation]) {
                    nestedObj[objStorageLocation] = {};
                }
                const levelOne = nestedObj[objStorageLocation];
                if (!levelOne[objStorageType]) {
                    levelOne[objStorageType] = {};
                }
                const levelTwo = nestedObj[objStorageLocation][objStorageType];
                if (!levelTwo[objStorageBin]) {
                    levelTwo[objStorageBin] = {};
                }
                const levelThree = nestedObj[objStorageLocation][objStorageType][objStorageBin];
                if (!levelThree[objStorageUnit]) {
                    const isSysBin = objStorageType[0] === '9';

                    if (objStorageUnit !== 'N/A' && !isSysBin) {
                        levelThree[objStorageUnit] = {};
                    }
                }
            };
            checkObjectModel();
            //Assign inventoryObject to lowest level storageUnit node:
            const isSysBin = objStorageType[0] === '9';

            if (objStorageUnit === 'N/A' && !isSysBin) {
                nestedObj[objStorageLocation][objStorageType][objStorageBin] = 'empty';
            }
            //Sets inventory object to unique index.ts key on storageUnit object node
            if (
                !!nestedObj[objStorageLocation][objStorageType][objStorageBin][objStorageUnit] &&
                !isSysBin
            ) {
                const storageUnitPath =
                    nestedObj[objStorageLocation][objStorageType][objStorageBin][objStorageUnit];
                const objIndex = Object.keys(storageUnitPath).length;
                storageUnitPath[objIndex] = obj;
            }
            //Special exception for non-HU handled system locations
            if (objStorageUnit === 'N/A' && isSysBin) {
                const storageBinPath = nestedObj[objStorageLocation][objStorageType][objStorageBin];
                const objIndex = Object.keys(storageBinPath).length;
                storageBinPath[objIndex] = obj;
            }

            return nestedObj;
        };

        return inventoryReportObjectArray.reduce(reducer, {});
    };

    //PARSES A SINGLE RAW INVENTORY OBJECT RECORD INTO DESIRED KEY/VALUE PAIRS
    parseInventoryRecordObject(jsonIventoryReportObject) {
        const parsedRecord = {
            storageBin: jsonIventoryReportObject['Storage Bin']
                ? jsonIventoryReportObject['Storage Bin']
                : 'N/A',
            material:
                jsonIventoryReportObject['Material'] === undefined
                    ? 'undefined'
                    : jsonIventoryReportObject['Material'],
            available:
                jsonIventoryReportObject['Available stock'] >= 0
                    ? jsonIventoryReportObject['Available stock']
                    : 'N/A',
            storageUnit: jsonIventoryReportObject['Storage Unit']
                ? jsonIventoryReportObject['Storage Unit']
                : 'N/A',
            storageType:
                jsonIventoryReportObject['Storage Type'] === undefined
                    ? 'undefined'
                    : jsonIventoryReportObject['Storage Type'],
            storageLocation: jsonIventoryReportObject['Storage Location']
                ? jsonIventoryReportObject['Storage Location']
                : 1,
            noneStocked: false,
            uuid: uuid(),
        };
        if (parsedRecord.storageBin.includes('.')) {
            const binName = parsedRecord.storageBin;
            parsedRecord.storageBin = binName.replace(/\./g, '_');
        }
        return parsedRecord;
    }

    //2-TIER SORTS INVENTORY ARRAY BY MATERIAL THEN STORAGE UNIT (BIGGEST -> SMALLEST VALUE)
    sortInventoryByFifo(parsedInventoryRecords) {
        const fifoSortedInventory = [...parsedInventoryRecords].sort((bin1, bin2) => {
            //SORT OVERSTOCK ARRAY IN ORDER BY MATERIAL ID
            if (bin1['material'] > bin2['material']) return 1;
            if (bin1['material'] < bin2['material']) return -1;
            //IF MATERIALS ARE THE SAME, SORT THEM IN ORDER OF STORAGE UNIT VALUE, IGNORING LAST 2 SU DIGITS (DISABLED)
            // if (bin1['storageUnit'].slice(0,8) > bin2['storageUnit'].slice(0,8)) return 1;
            // if (bin1['storageUnit'].slice(0,8) < bin2['storageUnit'].slice(0,8)) return -1;

            //SORT MATERIALS BY STORAGE UNIT # LOWEST TO HIGHEST
            if (bin1['storageUnit'] > bin2['storageUnit']) return 1;
            if (bin1['storageUnit'] < bin2['storageUnit']) return -1;
            //IF MATERIALS ARE THE SAME, SORT THEM IN ORDER OF STORAGE UNIT BY CLOSEST TO FARTHEST
            if (bin1['material'] === bin2['material'] && bin1['storageBin'] > bin2['storageBin'])
                return 1;
            if (bin1['material'] === bin2['material'] && bin1['storageBin'] < bin2['storageBin'])
                return -1;
        });
        return fifoSortedInventory;
    }

    //RETURNS COMPLETE INVENTORY REPORT REFORMATTED.
    //RAW JSON INVENTORY FILE CONVERTED TO ONLY CONTAIN DESIRED OBJECT PROPS. NO FILTERING YET TO REMOVE NULL RECORDS.
    getFifoSortedInventory() {
        //FORMAT DATA TO CONTAIN ONLY DESIRED KEY/VALUE OBJECT PAIRS EXPECTED BY REDUCERSS
        const parsedInventoryRecords = this.rawInventoryJSON.map(record => {
            return this.parseInventoryRecordObject(record);
        });
        return this.sortInventoryByFifo(parsedInventoryRecords);
    }

    //FILTER PARSED INVENTORY REPORT TO CONTAIN ONLY VALID RESTOCKING RECORDS (NON-EMPTY ST1 STORAGE TYPE)
    getValidRestockInventory(parsedInventoryRecords) {
        const validRestockInventory = parsedInventoryRecords.filter(
            record =>
                record['storageType'] === 'ST1' &&
                !record['material'].includes('empty') &&
                record['storageLocation'] == 1,
        );
        return validRestockInventory;
    }

    //MATCHES DESIGNATED FIXED Bin WITH EMPTY Bin IN RESTOCK REPORT. RETURNS BACK A SORTED ARRAY OF EMPTY RESTOCK BIN NAMES
    getEmptyFixedBins() {
        //INVENTORY.FILTER => Bin FOUND IN FIXEDBin THAT HAVE 0 STOCK IN INVENTORY REPORT
        //CREATES AN ARRAY OF BIN NAME STRINGS SO 'includes' METHOD CAN BE USED FOR EMPTY BIN MATCHING
        let fixedBinNames = this.fixedBinsJSON.map(record => record['Bin']);
        //CREATES AN ARRAY OF INVENTORY REPORT OBJECTS CORRESPONDING TO EMPTY BIN / FIXED BIN MATCHES
        let binsToRestockObjects = this.getFifoSortedInventory().filter(
            record => (record.available == 0) & fixedBinNames.includes(record.storageBin),
        );
        //MAPS BACK AN ARRAY CONTAINING ONLY EMPTY FIXED BIN NAMES
        let binsToRestockStrings = binsToRestockObjects.map(record => record['storageBin']);
        return binsToRestockStrings;
    }

    getFixedBinRestockReport() {
        const fifoSortedInventory = this.getFifoSortedInventory();
        const validRestockInventory = this.getValidRestockInventory(fifoSortedInventory);
        const emptyFixedBins = this.getEmptyFixedBins();
        const materialStockLevels = this.getMaterialStockLevels();
        const fixedBinRestockReport = [];
        emptyFixedBins.forEach(fixedBin => {
            //MATCHES MATERIAL TO RESTOCK BETWEEN EMPTY FIXED BIN ARRAY AND FIXED BIN 'fixedBinsJSON' MASTER
            const materialToRestock = this.fixedBinsJSON.find(
                jsonBin => jsonBin['Bin'] === fixedBin,
            );
            //RETURNS INDEX REFERENCE FOR FIRST MATCH FOUND IN 'validRestockInventory' OF FIXED BIN MATERIAL
            const sliceIndex = validRestockInventory.findIndex(
                fifoRecord => fifoRecord['material'] === materialToRestock['Product'],
            );
            //LOOKS IN 'validRestockInventory' FOR MATCH OF MATERIAL RECORD. IF FOUND, PULLS FULL OBJECT FROM ARRAY AND RETURNS IN PLACE OF fixedBin
            if (sliceIndex !== -1) {
                const fifoResult = validRestockInventory.splice(sliceIndex, 1)[0];
                const restockRecord = {
                    sourceBin: fifoResult['storageBin'],
                    destinationBin: materialToRestock['Bin'],
                    material: fifoResult['material'],
                    storageUnit: fifoResult['storageUnit'],
                    description: materialToRestock['Description'],
                    available: fifoResult['available'] >= 0 ? fifoResult['available'] : 'N/A',
                    isCompleted: false,
                    isMissing: false,
                    noneStocked: materialStockLevels[fifoResult['material']].binsStocked === 0,
                    uuid: uuid(),
                };
                fixedBinRestockReport.push(restockRecord);
            }
        });
        return fixedBinRestockReport;
    }
}

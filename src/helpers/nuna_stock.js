import v4 from 'uuid/v4';

export default class NunaStock {
    constructor(rawInventoryJSON, fixedBinsJSON) {
        this.rawInventoryJSON = rawInventoryJSON;
        this.fixedBinsJSON = fixedBinsJSON;
        this.restockReport = this.getFixedBinRestockReport()
    }

    //PARSES A SINGLE RAW INVENTORY OBJECT RECORD INTO DESIRED KEY/VALUE PAIRS
    parseInventoryRecordObject(jsonIventoryReportObject) {
        const parsedRecord = {
            storageBin: (jsonIventoryReportObject['Storage Bin'] ? jsonIventoryReportObject['Storage Bin'] : 'N/A'),
            material: (jsonIventoryReportObject['Material'] === undefined ? 'undefined' : jsonIventoryReportObject['Material']),
            available: (jsonIventoryReportObject['Available stock'] >= 0 ? jsonIventoryReportObject['Available stock'] : 'N/A'),
            storageUnit: (jsonIventoryReportObject['Storage Unit'] ? jsonIventoryReportObject['Storage Unit'] : 'N/A'),
            storageType: (jsonIventoryReportObject['Storage Type'] === undefined ? 'undefined' : jsonIventoryReportObject['Storage Type']),
            storageLocation: (jsonIventoryReportObject['Storage Location'] ? jsonIventoryReportObject['Storage Location'] : 'N/A'),
            uuid: v4()
        };
        return parsedRecord
    }

    //2-TIER SORTS INVENTORY ARRAY BY MATERIAL THEN STORAGE UNIT (BIGGEST -> SMALLEST VALUE)
    sortInventoryByFifo(parsedInventoryRecords) {
        const fifoSortedInventory = [...parsedInventoryRecords]
            .sort((bin1, bin2) => {
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
                if ((bin1['material'] === bin2['material']) && (bin1['storageBin'] > bin2['storageBin'])) return 1;
                if ((bin1['material'] === bin2['material']) && (bin1['storageBin'] < bin2['storageBin'])) return -1;
            });
        return fifoSortedInventory;
    }

    //RETURNS COMPLETE INVENTORY REPORT REFORMATTED.
    //RAW JSON INVENTORY FILE CONVERTED TO ONLY CONTAIN DESIRED OBJECT PROPS. NO FILTERING YET TO REMOVE NULL RECORDS.
    getFifoSortedInventory() {
        //FORMAT DATA TO CONTAIN ONLY DESIRED KEY/VALUE OBJECT PAIRS EXPECTED BY REDUCERSS
        const parsedInventoryRecords = this.rawInventoryJSON.map((record) => {
            return this.parseInventoryRecordObject(record)
        })
        return this.sortInventoryByFifo(parsedInventoryRecords)
    }

    //FILTER PARSED INVENTORY REPORT TO CONTAIN ONLY VALID RESTOCKING RECORDS (NON-EMPTY ST1 STORAGE TYPE)
    getValidRestockInventory(parsedInventoryRecords) {
        const validRestockInventory = parsedInventoryRecords
            .filter((record) => record['storageType'] === 'ST1' && !record['material'].includes('empty') && record['storageLocation'] == 1)
        return validRestockInventory;
    }

    //MATCHES DESIGNATED FIXED BINS WITH EMPTY BINS IN RESTOCK REPORT. RETURNS BACK A SORTED ARRAY OF EMPTY RESTOCK BIN NAMES
    getEmptyFixedBins() {
        //INVENTORY.FILTER => BINS FOUND IN FIXEDBINS THAT HAVE 0 STOCK IN INVENTORY REPORT
        //CREATES AN ARRAY OF BIN NAME STRINGS SO 'includes' METHOD CAN BE USED FOR EMPTY BIN MATCHING
        let fixedBinNames = this.fixedBinsJSON.map((record) => record['BINS'])
        //CREATES AN ARRAY OF INVENTORY REPORT OBJECTS CORRESPONDING TO EMPTY BIN / FIXED BIN MATCHES
        let binsToRestockObjects = this.getFifoSortedInventory().filter((record) => (record.available == 0 & fixedBinNames.includes(record.storageBin)));
        //MAPS BACK AN ARRAY CONTAINING ONLY EMPTY FIXED BIN NAMES
        let binsToRestockStrings = binsToRestockObjects.map((record) => record['storageBin'])
        return binsToRestockStrings
    }

    getFixedBinRestockReport() {
        const fifoSortedInventory = this.getFifoSortedInventory();
        const validRestockInventory =  this.getValidRestockInventory(fifoSortedInventory);
        const emptyFixedBins = this.getEmptyFixedBins();
        const fixedBinRestockReport = [];
        emptyFixedBins.forEach((fixedBin) => {
            //MATCHES MATERIAL TO RESTOCK BETWEEN EMPTY FIXED BIN ARRAY AND FIXED BIN 'fixedBinsJSON' MASTER
            const materialToRestock = this.fixedBinsJSON.find((jsonBin) => jsonBin['BINS'] === fixedBin)
            //RETURNS INDEX REFERENCE FOR FIRST MATCH FOUND IN 'validRestockInventory' OF FIXED BIN MATERIAL
            const sliceIndex = validRestockInventory.findIndex((fifoRecord) => fifoRecord['material'] === materialToRestock['Product No'])
            //LOOKS IN 'validRestockInventory' FOR MATCH OF MATERIAL RECORD. IF FOUND, PULLS FULL OBJECT FROM ARRAY AND RETURNS IN PLACE OF fixedBin
            if (sliceIndex !== -1) {
                const fifoResult = validRestockInventory.splice(sliceIndex, 1)[0];
                const restockRecord = {
                    sourceBin: fifoResult['storageBin'],
                    destinationBin: materialToRestock['BINS'],
                    material: fifoResult['material'],
                    storageUnit: fifoResult['storageUnit'],
                    description: materialToRestock['Description'],
                    available: (fifoResult['available'] >= 0 ? fifoResult['available'] : 'N/A'),
                    isCompleted: false,
                    isMissing: false,
                    uuid: v4()
                }
                fixedBinRestockReport.push(restockRecord);
            }
        })
        return fixedBinRestockReport;
    }
}
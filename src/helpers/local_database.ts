import PouchDb from 'pouchdb-browser';
import { FoundOverstock, InventoryRecord, InventorySummary, StockSource } from '../constants/types';
PouchDb.plugin(require('pouchdb-find').default);
/*
 * upon initialization, require 'summary' as constructor arg
 * if summary !== current values, wipe and reset
 * if summary not found, create new db
 * if summary matches, do nothing (continue with instance init)
 * */
//TODO: add generic query method
//TODO: add specific query methods for bin info / material info
export class LocalDatabase {
    private localDB: any;

    constructor() {
        this.localDB = new PouchDb('smart-stock');
    }

    private async destroyDB() {
        await this.localDB.destroy();
    }

    private restoreDB() {
        this.localDB = new PouchDb('smart-stock');
    }

    async rebootDB() {
        await this.destroyDB();
        this.restoreDB();
    }

    get summary(): Promise<InventorySummary> {
        return this.localDB.get('summary');
    }

    async find(selector: any) {
        this.localDB
            .createIndex({
                index: {
                    fields: ['material', 'storageBin'],
                },
            })
            .then(async () => {
                const found = await this.localDB.find({
                    selector: {
                        // storageBin: {$ne: ''},
                        material: { $eq: '<<empty>>' },
                        $or: selector,
                    },
                });
                console.log('found in localDB: ', found);
            });
    }

    async getLocalInventory() {
        const inventory = await this.localDB.allDocs({
            include_docs: true,
            startkey: 'invRec',
            endkey: 'invRec\ufff0',
        });
        return inventory.rows.map((row: any) => row.doc);
    }
    /**
     * Takes an array of formatted query objects
     * Each query object represents a fixed bin name
     * The DB is queried for any bin names that match, that are ALSO empty
     * An empty matching bin represents a fixed bin that needs replenishing
     * A string array is returned with the bin names that need replenishing
     * @param fixedBinQueryParams
     */
    //TODO: calculate totally empty fixed bin materials with this method
    async getBinsToRestock(fixedBinQueryParams: { storageBin: string }[]) {
        const matches = await this.localDB.find({
            selector: {
                material: { $eq: '<<empty>>' },
                $or: fixedBinQueryParams,
            },
        });

        const binsToRestock = matches.docs.map((match: any) => match.storageBin);
        return binsToRestock;
    }

    /**
     * Heavy operator method here.
     * Returns a list of materials that could not be found in stock
     * Returns an array of inventory records to replenish empty fixed bins
     * For each inventory record returned, a 'destinationBin' property is added
     * 'destinationBin' represents the empty fixed bin it is intended to replenish
     *
     * @param materialNeeded
     **/
    async findInOverstock(materialNeeded: {
        [key: string]: { bins: string[]; description: string };
    }): Promise<FoundOverstock> {
        await this.localDB.createIndex({
            index: {
                fields: ['material'],
            },
        });
        const pendingQueries: Promise<any>[] = [];
        const materialsArray: string[] = [];
        for (let material in materialNeeded) {
            const matches = this.localDB.find({
                selector: {
                    //Include more locations in string array to broaden search
                    storageType: { $in: ['ST1'] },
                    storageLocation: { $in: ['1', '0001'] },
                    material: material,
                },
            });
            pendingQueries.push(matches);
            materialsArray.push(material);
        }
        const resolvedQueries = await Promise.all(pendingQueries);
        return resolvedQueries.reduce(
            (acc: FoundOverstock, val: { docs: InventoryRecord[] }, index: number) => {
                const stockedLocations = val.docs.length;
                //Empty array means query found no matches
                if (stockedLocations === 0) {
                    const outOfStock = materialsArray[index];
                    acc['outOfStock'] = [
                        ...acc['outOfStock'],
                        {
                            material: outOfStock,
                            description: materialNeeded[outOfStock].description,
                        },
                    ];
                }
                if (stockedLocations > 0) {
                    //name of the material for this successful query match record
                    const material = val.docs[0].material;
                    const resultsLimit = materialNeeded[material].bins.length;
                    const destinationBins = materialNeeded[material].bins;
                    const sortedResults = val.docs.sort((a: any, b: any) =>
                        a.storageUnit > b.storageUnit ? 1 : -1,
                    );
                    //only return as many records as are needed to replenish fixed bins
                    //might return fewer than needed if there is limited stock
                    const sourceBins = sortedResults.slice(0, resultsLimit);
                    //assigns a fixed bin name as the destinationBin for a found overstock record
                    sourceBins.forEach(
                        (sourceBin: any, idx: number) =>
                            (sourceBin.destinationBin = destinationBins[idx]),
                    );
                    acc.stockSources = [
                        ...(acc.stockSources as StockSource[]),
                        ...(sourceBins as StockSource[]),
                    ];
                }
                return acc;
            },
            { outOfStock: [], stockSources: [] },
        );
    }

    async bulkAddRecords<T, U>(records: T[], summary: U) {
        try {
            await this.localDB.bulkDocs(records);
            await this.localDB.put({
                _id: 'summary',
                ...summary,
            });
        } catch (e) {
            console.error('Error adding bulk records: ', e);
        }
    }
}

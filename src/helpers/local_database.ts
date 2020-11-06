import PouchDb from 'pouchdb-browser';
import { InventorySummary } from '../constants/types';
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

    async resetDB() {
        await this.localDB.destroy();
        this.localDB = new PouchDb('smart-stock');
        console.log('reset from Class');
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
                console.log('hit');
                const found = await this.localDB.find({
                    selector: {
                        // storageBin: {$ne: ''},
                        material: { $eq: '<<empty>>' },
                        $or: selector,
                    },
                });
                console.log('found from find: ', found);
            });
    }

    //TODO: knowing how many pallets of each material, then comparing that against how many fixed bins are empty will show if an item is totally out of stock or not
    async getBinsToRestock(fixedBins: any[]) {
        await this.localDB.createIndex({
            index: {
                fields: ['storageBin'],
            },
        });
        const matches = await this.localDB.find({
            selector: {
                material: { $eq: '<<empty>>' },
                $or: fixedBins,
            },
        });

        const binsToRestock = matches.docs.map((match: any) => match.storageBin);
        return binsToRestock;
    }

    async getRestockRecords(materialNeeded: { [key: string]: number }) {
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
                    //Include more locations in array to broaden search
                    storageType: { $in: ['ST1'] },
                    storageLocation: '0001',
                    material: material,
                },
            });
            pendingQueries.push(matches);
            materialsArray.push(material);
        }
        const resolvedQueries = await Promise.all(pendingQueries);
        return resolvedQueries.reduce(
            (acc: { [key: string]: string[] }, val: any, index: number) => {
                const stockedLocations = val.docs.length;
                if (stockedLocations === 0) {
                    const outOfStock = materialsArray[index];
                    acc['outOfStock'] = [...acc['outOfStock'], outOfStock];
                }
                if (stockedLocations > 0) {
                    const material = val.docs[0].material;
                    const resultsLimit = materialNeeded[material];
                    const sortedResults = val.docs.sort((a: any, b: any) =>
                        a.storageUnit > b.storageUnit ? 1 : -1,
                    );
                    const sourceBins = sortedResults.slice(0, resultsLimit);
                    acc[material] = [...sourceBins];
                }
                return acc;
            },
            { outOfStock: [] },
        );
    }

    async bulkAddRecords<T, U>(records: T[], summary: U) {
        this.localDB.bulkDocs(records).then(() => {
            this.localDB.put({
                _id: 'summary',
                ...summary,
            });
        });
    }
}

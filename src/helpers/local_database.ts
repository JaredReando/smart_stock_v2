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
        const promiseArray = [];
        console.time('all');
        for (let material in materialNeeded) {
            console.log('material.....', material);
            const matches = this.localDB.find({
                selector: {
                    storageType: 'ST1',
                    storageLocation: '0001',
                    material: material,
                },
            });
            //TODO: mine empty results here to build 'out of stock' stat
            promiseArray.push(matches);
        }
        const allPromises = await Promise.all(promiseArray).finally(() => console.timeEnd('all'));
        console.log('all promises: ', allPromises);
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

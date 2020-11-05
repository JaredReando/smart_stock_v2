import PouchDb from 'pouchdb-browser';
PouchDb.plugin(require('pouchdb-find').default);

export class LocalDatabase {
    private localDB: any;

    constructor() {
        this.localDB = new PouchDb('smart-stock');
    }

    async destroyDB() {
        await this.localDB.destroy();
    }

    updateSummary(summary: { lastUpdated: string; recordCount: number }) {
        this.localDB.put({
            _id: 'summary',
            ...summary,
        });
    }
    async bulkAddRecords<T, U>(records: T[], summary: U) {
        this.localDB.bulkDocs(records).then(() => {
            this.updateSummary({
                lastUpdated: 'today',
                recordCount: records.length,
            });
        });
    }
}

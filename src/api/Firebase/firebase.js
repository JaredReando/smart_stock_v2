import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    //User account/authorization logic
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => {
        this.auth.currentUser.updatePassword(password);
    };

    doOverwriteLastUpdated = () => {
        const now = new Date().toString();
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('last_updated')
            .set(now);
    };

    doOverwriteRestockReport = restockReport => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('restock_report')
            .set(restockReport);
    };

    doOverwriteInventoryReport = inventoryReport => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('inventory_report')
            .set(inventoryReport);
    };

    doUpdateRestockRecord = (index, updatedRecord) => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('restock_report')
            .child(index)
            .set(updatedRecord);
    };

    experimentalFixedBins = fixedBinRecords => {
        for (const record in fixedBinRecords) {
            const { fields: bin } = record;
            const binDetails = {
                Bin: bin.Bin,
                Product: bin.ITEM,
                Description: bin.Description,
            };
            this.db
                .ref('Companies')
                .child('Nuna')
                .child('fixed_bins')
                .child('B01-01-B');
            // .set({
            //   bin: 'wacky',
            //   product: 'world',
            //   description: 'of wonder'
            // });
        }
        console.log('done');
    };

    doOverwriteFixedBins = fixedBinRecords => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('fixed_bins')
            .set(fixedBinRecords);
    };

    addATestBin = async () => {
        const reult = await this.db
            .ref('Companies')
            .child('Nuna')
            .child('fixed_bins')
            .child('B01-01-B')
            .set({
                'A01-01-A': 'peepa neat',
                'Z43-02-C': 'scirbble dowg',
            });
        console.log('result? : ', reult);
    };

    doDeleteRestockRecord = recordKey => {
        this.db
            .ref('Companies/Nuna/restock_report')
            .child(recordKey)
            .set(null);
    };

    //Database logic
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;

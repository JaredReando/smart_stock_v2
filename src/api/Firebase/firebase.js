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
    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => {
        this.auth.signOut();
    };

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => {
        this.auth.currentUser.updatePassword(password);
    };

    overwriteRestockReport = (restockReport, outOfStock) => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('restock')
            .child('records')
            .set(restockReport);
        this.updateRestockSummary(restockReport.length, outOfStock);
    };

    updateRestockSummary = (recordCount, outOfStock) => {
        const summary = {
            lastUpdated: new Date().toJSON(),
            recordCount,
            outOfStock,
        };
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('restock')
            .child('summary')
            .set(summary);
    };

    overwriteFixedBins = fixedBins => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('fixed_bins')
            .child('records')
            .set(fixedBins);
    };

    overwriteInventoryReport = (inventoryReport, inventorySummary) => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('inventory')
            .child('records')
            .set(inventoryReport);
        this.updateInventorySummary(inventorySummary);
    };

    updateInventorySummary = inventorySummary => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('inventory')
            .child('summary')
            .set(inventorySummary);
        console.log('firebase inventory summary updated: ', inventorySummary);
    };

    doUpdateRestockRecord = (index, updatedRecord) => {
        this.db
            .ref('Companies')
            .child('Nuna')
            .child('restock')
            .child('records')
            .child(index)
            .set(updatedRecord);
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

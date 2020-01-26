//requires connection to Firebase instance to work:
export const deleteRestockRecord = (recordKey, firebaseInstance) => {
    console.log('Index:', recordKey);
    firebaseInstance.doDeleteRestockRecord(recordKey);
};
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const FIREBASE_STORAGE_BUCKET = "recipe-40071.appspot.com";

const apiFirebaseOptions = {
    ...functions.config().firebase,
    credential: admin.credential.applicationDefault(),
    projectId: 'recipe-40071',
};

admin.initializeApp(apiFirebaseOptions);

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET);
const auth = admin.auth();

module.exports = { functions, auth, firestore, storageBucket, admin };

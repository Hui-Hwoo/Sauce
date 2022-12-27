const functions = require("firebase-functions");
const admin = require("firebase-admin");

const apiFirebaseOptions = {
    ...functions.config().firebase,
    credential: admin.credential.applicationDefault(),
    projectId: "recipe-40071",
};

admin.initializeApp(apiFirebaseOptions);

const auth = admin.auth();

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

const storageBucket = admin.storage().bucket("recipe-40071.appspot.com");

module.exports = { functions, admin, auth, firestore, storageBucket };

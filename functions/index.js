// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// const functions = require("firebase-functions");
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const FirebaseConfig = require("./FirebaseConfig");
const { functions, firestore, storageBucket, admin } = FirebaseConfig;
const RestAPI = require("./RestAPI");

exports.api = functions.https.onRequest(RestAPI);

exports.onCreateSauce = functions.firestore
    .document("sauce/{sauceId}")
    .onCreate(async (snapshot) => {
        const countDocRef = firestore.collection("sauceCounts").doc("all");
        const countDoc = await countDocRef.get();

        if (countDoc.exists) {
            countDocRef.update({
                count: admin.firestore.FieldValue.increment(1),
            });
        } else {
            countDocRef.set({ count: 1 });
        }

        const sauce = snapshot.data();

        if (sauce.isPublished) {
            const countPublishedDocRef = firestore
                .collection("sauceCounts")
                .doc("published");
            const countPublishedDoc = await countPublishedDocRef.get();

            if (countPublishedDoc.exists) {
                countPublishedDocRef.update({
                    count: admin.firestore.FieldValue.increment(1),
                });
            } else {
                countPublishedDocRef.set({ count: 1 });
            }
        }
    });

exports.onUpdateSauce = functions.firestore
    .document("sauce/{sauceId}")
    .onUpdate(async (changes) => {
        const oldSauce = changes.before.data();
        const newSauce = changes.after.data();

        let publishCount = 0;

        if (!oldSauce.isPublished && newSauce.isPublished) {
            publishCount += 1;
        } else if (oldSauce.isPublished && !newSauce.isPublished) {
            publishCount -= 1;
        }

        if (publishCount !== 0) {
            const publishedCountDocRef = firestore
                .collection("sauceCounts")
                .doc("published");

            const publishedCountDoc = await publishedCountDocRef.get();

            if (publishedCountDoc.exists) {
                publishedCountDocRef.update({
                    count: admin.firestore.FieldValue.increment(publishCount),
                });
            } else {
                if (publishCount > 0) {
                    publishedCountDocRef.set({ count: publishCount });
                } else {
                    publishedCountDocRef.set({ count: 0 });
                }
            }
        }
    });

exports.onDeleteSauce = functions.firestore
    .document("sauce/{sauceId}")
    .onDelete(async (snapshot) => {
        const sauce = snapshot.data();
        const imageUrl = sauce.imageUrl;

        if (imageUrl) {
            const decodedUrl = decodeURIComponent(imageUrl);
            const startIndex = decodedUrl.indexOf("/o/") + 3;
            const endIndex = decodedUrl.indexOf("?");
            const fullFilePath = decodedUrl.substring(startIndex, endIndex);
            const file = storageBucket.file(fullFilePath);

            console.log(`Attemping to delete: ${fullFilePath}`);

            try {
                await file.delete();
                console.log("Successfully deleted image.");
            } catch (error) {
                console.log(`Failed to delete file: ${error.message}`);
            }

            const countDocRef = firestore.collection("sauceCounts").doc("all");
            const countDoc = await countDocRef.get();

            if (countDoc.exists) {
                countDocRef.update({
                    count: admin.firestore.FieldValue.increment(-1),
                });
            } else {
                countDocRef.set({ count: 0 });
            }

            const sauce = snapshot.data();

            if (sauce.isPublished) {
                const countPublishedDocRef = firestore
                    .collection("sauceCounts")
                    .doc("published");
                const countPublishedDoc = await countPublishedDocRef.get();

                if (countPublishedDoc.exists) {
                    countPublishedDocRef.update({
                        count: admin.firestore.FieldValue.increment(-1),
                    });
                } else {
                    countPublishedDocRef.set({ count: 0 });
                }
            }
        }
    });

// https://crontab.guru/

const runtimeOptions = {
    timeoutSeconds: 300,
    memory: "256MB",
};

exports.dailyCheckSaucePublishDate = functions
    .runWith(runtimeOptions)
    .pubsub.schedule("0 0 * * *")
    .onRun(async () => {
        console.log("dailyCheckSaucePublishDate() called - time to check");

        const snapshot = await firestore
            .collection("sauce")
            .where("isPublished", "==", false)
            .get();

        snapshot.forEach(async (doc) => {
            const data = doc.data();
            const now = Date.now() / 1000;
            const isPublished = data.publishDate._seconds <= now ? true : false;

            if (isPublished) {
                console.log(`Sauce: ${data.name} is now published!`);

                firestore.collection("sauce").doc(doc.id).set(
                    {
                        isPublished,
                    },
                    {
                        merge: true,
                    }
                );
            }
        });
    });

console.log("SERVER STARTED!");

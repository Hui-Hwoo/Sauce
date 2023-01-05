const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const FirebaseConfig = require("./FirebaseConfig");
const Utilities = require("./utilities");

const auth = FirebaseConfig.auth;
const firestore = FirebaseConfig.firestore;

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

// ~~ RESTFUL CRUD WEB API ENDPOINTS ~~

app.get("/sauce", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    const { state, taste } = request.query;

    let userId = "";
    let collectionRef = firestore.collection("sauce");

    try {
        const userInfo = await Utilities.authorizeUser(
            authorizationHeader,
            auth
        );
        userId = userInfo.uid;
        // response.status(202).send(userId);
        // return;
    } catch (error) {
        // continue
    }

    if (state) {
        const stateList = ["liquid", "solid"];
        collectionRef = collectionRef.where(
            "state",
            "==",
            stateList[parseInt(state)]
        );
    }

    if (taste) {
        const tasteList = ["salty", "hot", "sweet", "sour"];
        for (let i in taste) {
            collectionRef = collectionRef.where(
                tasteList[parseInt(taste[i])],
                ">",
                0
            );
        }
    }

    try {
        const firestoreResponse = await collectionRef.get();

        const fetchedSauce = firestoreResponse.docs.map((sauce) => {
            const id = sauce.id;
            const data = sauce.data();
            data.publishDate = data.publishDate._seconds;

            if ((!data.isPublished) && (userId !== data.creator)) {
                data.title = "Secret Sauce";
                data.description =
                    "Secret Sauce, get more details after it's published";
                data.imageUrl = "";
            }
            return { ...data, id };
        });

        const payload = {
            documents: fetchedSauce,
        };
        response.status(200).send(payload);
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.post("/sauce", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
        response.status(401).send("Missing Authorization Header");
        return;
    }

    var creator = "";
    try {
        const userInfo = await Utilities.authorizeUser(authorizationHeader, auth);
        creator = userInfo.uid;
    } catch (error) {
        response.status(403).send(error.message);
        return;
    }

    const newSauce = request.body;
    const missingFields = Utilities.validateSaucePostPut(newSauce);

    if (missingFields) {
        response
            .status(400)
            .send(
                `Sauce is not valid. Missing/invalid fields: ${missingFields}`
            );
        return;
    }

    try {
        const sauce = Utilities.sanitizeSaucePostPut(newSauce);

        const firestoreResponse = await firestore
            .collection("sauce")
            .add({...sauce, creator});

        const sauceId = firestoreResponse.id;

        response.status(201).send({ id: sauceId });
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.put("/sauce/:id", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
        response.status(401).send("Missing Authorization Header");
        return;
    }

    var creator = "";
    try {
        const userInfo= await Utilities.authorizeUser(authorizationHeader, auth);
        creator = userInfo.uid;
    } catch (error) {
        response.status(401).send(error.message);
        return;
    }

    const id = request.params.id;
    const newSauce = request.body;
    const missingFields = Utilities.validateSaucePostPut(newSauce);

    if (missingFields) {
        response
            .status(400)
            .send(
                `Recipe is not valid. Missing/invalid fields: ${missingFields}`
            );
        return;
    }

    try {
        const sauce = Utilities.sanitizeSaucePostPut(newSauce);
        await firestore.collection("sauce").doc(id).set({...sauce, creator});
        response.status(200).send({ id });
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.delete("/sauce/:id", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.authorizeUser(authorizationHeader, auth);
    } catch (error) {
        response.status(401).send(error.message);
    }

    try {
        const id = request.params.id;
        await firestore.collection("sauce").doc(id).delete();
        response.status(200).send("successfully deleted");
    } catch (error) {
        response.status(400).send(error.message);
    }
});

if (process.env.NODE_ENV !== "production") {
    // Local dev
    app.listen(3005, () => {
        console.log("api started");
    });
}

module.exports = app;

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

app.get("/recipes", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    const { category, order, pageNumber, perPage } = request.query;

    let isAuth = false;
    let collectionRef = firestore.collection("recipes");

    try {
        await Utilities.authorizeUser(authorizationHeader, auth);
        isAuth = true;
    } catch (error) {
        collectionRef = collectionRef.where("isPublished", "==", true);
    }

    if (category) {
        collectionRef = collectionRef.where("category", "==", category);
    }

    collectionRef = collectionRef.orderBy("publishDate", order);

    if (perPage) {
        collectionRef = collectionRef.limit(Number(perPage));
    }

    if (pageNumber > 0 && perPage) {
        const offset = (pageNumber - 1) * perPage;
        collectionRef = collectionRef.offset(offset);
    }

    let recipeCount = 0;
    let countDocRef;

    if (isAuth) {
        countDocRef = firestore.collection("recipeCounts").doc("all");
    } else {
        countDocRef = firestore.collection("recipeCounts").doc("published");
    }

    try {
        const countDoc = await countDocRef.get();

        if (countDoc.exists) {
            const countDocData = countDoc.data();
            if (countDocData) {
                recipeCount = countDocData.count;
            }
        }

        const firestoreResponse = await collectionRef.get();

        const fetchedRecipes = firestoreResponse.docs.map((recipe) => {
            const id = recipe.id;
            const data = recipe.data();
            data.publishDate = data.publishDate._seconds;
            return { ...data, id };
        });

        const payload = {
            recipeCount,
            documents: fetchedRecipes,
        };

        response.status(200).send(payload);
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.post("/recipes", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.authorizeUser(authorizationHeader, auth);
    } catch (error) {
        response.status(401).send(error.message);
        return;
    }

    const newRecipe = request.body;
    const missingFields = Utilities.validateRecipePostPut(newRecipe);

    if (missingFields) {
        response
            .status(400)
            .send(
                `Recipe is not valid. Missing/invalid fields: ${missingFields}`
            );
        return;
    }

    try {
        const recipe = Utilities.sanitizeRecipePostPut(newRecipe);

        const firestoreResponse = await firestore
            .collection("recipes")
            .add(recipe);

        const recipeId = firestoreResponse.id;

        response.status(201).send({ id: recipeId });
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.put("/recipes/:id", async (request, response) => {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.authorizeUser(authorizationHeader, auth);
    } catch (error) {
        response.status(401).send(error.message);
        return;
    }

    const id = request.params.id;
    const newRecipe = request.body;
    const missingFields = Utilities.validateRecipePostPut(newRecipe);

    if (missingFields) {
        response
            .status(400)
            .send(
                `Recipe is not valid. Missing/invalid fields: ${missingFields}`
            );
        return;
    }

    try {
        const recipe = Utilities.sanitizeRecipePostPut(newRecipe);
        await firestore.collection("recipes").doc(id).set(recipe);
        response.status(200).send({ id });
    } catch (error) {
        response.status(400).send(error.message);
    }
});

app.delete("/recipes/:id", async (request, response) => {
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
        await firestore.collection("recipes").doc(id).delete();
        response.status(200).send();
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

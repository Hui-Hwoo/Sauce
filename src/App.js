import React, { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
import FirestoreService from "./firebase/FirestoreService";
import FirebaseAuthService from "./firebase/FirebaseAuthService";
import Filter from "./components/Filter";
import RecipeForm from "./components/RecipeForm";
import LoadMore from "./components/LoadMore";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./App.css";

const App = () => {
    const [user, setUser] = useState(null);
    const [loginMode, setLoginMode] = useState(true);

    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("publishDateDesc");
    const [perPage, setPerPage] = useState(1);
    const [cursorId, setCursorId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);
    }, []);

    useEffect(() => {
        fetchRecipes(cursorId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursorId]);

    useEffect(() => {
        setUpdate(false);
        setCursorId("");
        setCurrentRecipe("");
        fetchRecipes("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage, category, order, update]);

    const fetchRecipes = async (lastRecipe) => {
        const queries = [];
        if (category) {
            queries.push({
                field: "category",
                condition: "==",
                value: category,
            });
        }

        if (!user) {
            queries.push({
                field: "isPublished",
                condition: "==",
                value: true,
            });
        }

        const orderByField = "publishDate";
        let orderByDirection;

        if (order) {
            switch (order) {
                case "publishDateAsc":
                    orderByDirection = "asc";
                    break;
                case "publishDateDesc":
                    orderByDirection = "desc";
                    break;
                default:
                    break;
            }
        }

        try {
            const response = await FirestoreService.readDocuments({
                col: "recipes",
                queries: queries,
                orderByField: orderByField,
                orderByDirection: orderByDirection,
                perPage: perPage,
                cursorId: lastRecipe,
            });
            const responseData = response.docs.map((recipeDoc) => {
                const id = recipeDoc.id;
                const data = recipeDoc.data();
                data.publishDate = new Date(data.publishDate.seconds * 1000);
                return { ...data, id };
            });
            let fetchedRecipes = [];
            if (lastRecipe) {
                fetchedRecipes = [...recipes, ...responseData];
            } else {
                fetchedRecipes = [...responseData];
            }
            setRecipes(fetchedRecipes);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    return (
        <React.Fragment>
            <div className="title-row">
                <h1 className="title">Firebase Recipes</h1>
                {!user &&
                    (loginMode ? (
                        <LoginForm existingUser={user}></LoginForm>
                    ) : (
                        <SignupForm></SignupForm>
                    ))}
                {!user && (
                    <button
                        type="button"
                        onClick={() => {
                            setLoginMode(!loginMode);
                        }}
                    >
                        {"switch to " + (loginMode ? "Signup" : "Login")}
                    </button>
                )}
                {user && <h1>{`Welcome ${user.email}`}</h1>}
                {user && (
                    <button
                        type="button"
                        onClick={() => {
                            console.log("log out");
                        }}
                    >
                        Log out
                    </button>
                )}
            </div>
            <div>
                <Filter
                    category={category}
                    setCategory={setCategory}
                    order={order}
                    setOrder={setOrder}
                ></Filter>
                <RecipeList
                    user={user}
                    recipes={recipes}
                    setCurrentRecipe={setCurrentRecipe}
                ></RecipeList>
                <LoadMore
                    recipes={recipes}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    setCursorId={setCursorId}
                ></LoadMore>
                <RecipeForm
                    currentRecipe={currentRecipe}
                    setCurrentRecipe={setCurrentRecipe}
                    setUpdate={setUpdate}
                ></RecipeForm>
            </div>
        </React.Fragment>
    );
};

export default App;

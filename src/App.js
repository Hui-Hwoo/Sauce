import React, { useEffect, useState } from "react";
import RecipeList from "./components/RecipeList";
// import FirestoreService from "../firebase/FirestoreService";
import FirebaseAuthService from "./firebase/FirebaseAuthService";
import RestService from "./firebase/RestService";
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
    const [perPage, setPerPage] = useState(3);
    const [update, setUpdate] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);
    }, []);

    useEffect(() => {
        setPerPage(3);
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    useEffect(() => {
        setUpdate(false);
        setCurrentRecipe("");
        fetchRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage, category, order, update, currentPage]);

    const fetchRecipes = async () => {
        try {
            const response = await RestService.readDocuments("recipes", {
                category: category,
                order: order === "publishDateAsc" ? "asc" : "desc",
                perPage: perPage,
                pageNumber: currentPage,
                isPublished: !user ? true : false,
            });

            let fetchedRecipes = [];

            if (response && response.documents) {
                setTotalPages(Math.ceil(response.recipeCount / perPage));

                if (response.documents.length === 0 && currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                }

                fetchedRecipes = response.documents;
                fetchedRecipes.forEach((recipe) => {
                    const unixPublishDateTime = recipe.publishDate;
                    recipe.publishDate = new Date(unixPublishDateTime * 1000);
                });
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
                    perPage={perPage}
                    setPerPage={setPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
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

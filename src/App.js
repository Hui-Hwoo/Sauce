import React, { useState, useEffect } from "react";
import FirebaseAuthService from "./firebase/FirebaseAuthService";
// import RestService from "./firebase/RestService";
import Filter from "./components/SauceFilter";

import "bootstrap/dist/css/bootstrap.min.css";
import SauceItem from "./components/SauceItem";
import SauceNavbar from "./components/SauceNavbar";
import SauceCarousel from "./components/SauceCarousel";
import SauceForm from "./components/SauceForm";
import Feedbacks from "./components/Feedbacks";
import { Container, Row, Col } from "react-bootstrap";

// const App = () => {
//     const [user, setUser] = useState(null);
//     const [loginMode, setLoginMode] = useState(true);

//     const [recipes, setRecipes] = useState([]);
//     const [currentRecipe, setCurrentRecipe] = useState(null);

//     const [category, setCategory] = useState("");
//     const [order, setOrder] = useState("publishDateDesc");
//     const [perPage, setPerPage] = useState(3);
//     const [update, setUpdate] = useState(false);
//     const [totalPages, setTotalPages] = useState(1);
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         FirebaseAuthService.subscribeToAuthChanges(setUser);
//     }, []);

//     // useEffect(() => {
//     //     fetchRecipes(true);
//     //     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // }, []);

//     useEffect(() => {
//         fetchRecipes();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [order, currentPage]);

//     useEffect(() => {
//         if (update) {
//             setUpdate(false);
//             setCurrentRecipe("");
//         }
//         fetchRecipes(true);
//         setCurrentPage(1);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [perPage, category, update]);

//     const fetchRecipes = async (restart = false) => {
//         try {
//             const response = await RestService.readDocuments("recipes", {
//                 category: category,
//                 order: order === "publishDateAsc" ? "asc" : "desc",
//                 perPage: perPage,
//                 pageNumber: restart ? 1 : currentPage,
//                 isPublished: user === null ? true : false,
//             });
//             let fetchedRecipes = [];

//             if (response && response.documents) {
//                 setTotalPages(Math.ceil(response.recipeCount / perPage));
//                 fetchedRecipes = response.documents;
//                 fetchedRecipes.forEach((recipe) => {
//                     const unixPublishDateTime = recipe.publishDate;
//                     recipe.publishDate = new Date(unixPublishDateTime * 1000);
//                 });
//             }
//             setRecipes(fetchedRecipes);
//         } catch (error) {
//             console.log(error.message);
//             throw error;
//         }
//     };

//     return (
//         <React.Fragment>
//             <div className="title-row">
//                 <h1 className="title">SAUCE</h1>
//                 {!user &&
//                     (loginMode ? (
//                         <LoginForm setUser={setUser}></LoginForm>
//                     ) : (
//                         <SignupForm></SignupForm>
//                     ))}
//                 {!user && (
//                     <button
//                         type="button"
//                         onClick={() => {
//                             setLoginMode(!loginMode);
//                         }}
//                     >
//                         {"switch to " + (loginMode ? "Signup" : "Login")}
//                     </button>
//                 )}
//                 {user && <h1>{`Welcome ${user.email || "!"}`}</h1>}
//                 {user && (
//                     <button
//                         type="button"
//                         onClick={() => {
//                             FirebaseAuthService.logoutUser();
//                             setUser(null);
//                         }}
//                     >
//                         Log out
//                     </button>
//                 )}
//             </div>
//             <div>
//                 <Filter
//                     category={category}
//                     setCategory={setCategory}
//                     order={order}
//                     setOrder={setOrder}
//                 ></Filter>
//                 <RecipeList
//                     user={user}
//                     recipes={recipes}
//                     setCurrentRecipe={setCurrentRecipe}
//                 ></RecipeList>
//                 <LoadMore
//                     perPage={perPage}
//                     setPerPage={setPerPage}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     totalPages={totalPages}
//                 ></LoadMore>
//                 <RecipeForm
//                     currentRecipe={currentRecipe}
//                     setCurrentRecipe={setCurrentRecipe}
//                     setUpdate={setUpdate}
//                 ></RecipeForm>
//             </div>
//         </React.Fragment>
//     );
// };

const App = () => {
    const [user, setUser] = useState(null);
    const [taste, setTaste] = useState({
        all: true,
        salty: true,
        hot: true,
        sweet: true,
        sour: true,
    });

    const [state, setState] = useState({
        all: true,
        liquid: true,
        solid: true,
    });

    const [isHome, setIsHome] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [showMsg, setShowMsg] = useState(true);
    const [errorMsg, setErrorMsg] = useState(
        "Errorrrrrrrr"
    );
    const [successMsg, setSuccessMsg] = useState(
        "Successsssss"
    );
    const [currentSauce, setCurrentSauce] = useState(null);

    const test = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);
    }, []);

    const editItem = (sauce) => {
        setCurrentSauce(sauce);
        setShowCard(true);
    };

    return (
        <React.Fragment>
            <SauceNavbar
                user={user}
                setUser={setUser}
                setIsHome={setIsHome}
            ></SauceNavbar>
            <Feedbacks
                show={showMsg}
                setShow={setShowMsg}
                errorMsg={errorMsg}
                successMsg={successMsg}
            ></Feedbacks>
            {isHome && <SauceCarousel></SauceCarousel>}
            <SauceForm
                user={user}
                show={showCard}
                setShow={setShowCard}
                currentSauce={currentSauce}
                hasAccess={
                    false && user && user?.uid === currentSauce?.creator
                        ? true
                        : false
                }
            ></SauceForm>
            <Filter
                taste={taste}
                setTaste={setTaste}
                state={state}
                setState={setState}
                isHome={isHome}
            ></Filter>
            <Container>
                <Row>
                    {test.map((item, index) => {
                        return (
                            <Col xl={3} lg={4} md={6} key={index}>
                                <SauceItem
                                    sauce={item}
                                    editItem={editItem}
                                ></SauceItem>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default App;

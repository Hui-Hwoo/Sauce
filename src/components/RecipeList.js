import React from "react";

const RecipeList = (props) => {
    const { recipes, setCurrentRecipe, user } = props;
    const isLoading = false;

    const lookupCategoryLabel = (categoryKey) => {
        const categories = {
            breadsSandwichesAndPizza: "Breads, Sandwiches, and Pizza",
            eggsAndBreakfast: "Eggs & Breakfast",
            dessertsAndBakedGoods: "Desserts & Baked Goods",
            fishAndSeafood: "Fish & Seafood",
            vegetables: "Vegetables",
        };
        const label = categories[categoryKey];
        return label;
    };

    const formatDate = (date) => {
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    };

    const editRecipe = (recipeId) => {
        const selectedRecipe = recipes.find((recipe) => {
            return recipe.id === recipeId;
        });
        if (selectedRecipe) {
            setCurrentRecipe({
                ...selectedRecipe,
                publishDate: formatDate(selectedRecipe.publishDate),
            });
            window.scrollTo(0, document.body.scrollHeight);
        }
    };

    return (
        <div className="center">
            <div className="recipe-list-box">
                {isLoading && (
                    <div className="fire">
                        <div className="flames">
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                            <div className="flame"></div>
                        </div>
                        <div className="logs"></div>
                    </div>
                )}
                {!isLoading && recipes && recipes.length === 0 && (
                    <h5 className="no-recipes">No Recipe Found</h5>
                )}
                {!isLoading && recipes && recipes.length > 0 && (
                    <div className="recipe-list">
                        {recipes.map((recipe) => {
                            return (
                                <div className="recipe-card" key={recipe.id}>
                                    {!recipe.isPublished && (
                                        <div className="unpublished">
                                            UNPUBLISHED
                                        </div>
                                    )}
                                    <div className="recipe-name">
                                        {recipe.name}
                                    </div>
                                    <div className="recipe-image-box">
                                        {recipe.imageUrl && (
                                            <img
                                                src={recipe.imageUrl}
                                                alt={recipe.name}
                                                className="recipe-image"
                                            ></img>
                                        )}
                                    </div>
                                    <div className="recipe-field">
                                        Category:{" "}
                                        {lookupCategoryLabel(recipe.category)}
                                    </div>
                                    <div className="recipe-field">
                                        Publish Date:{" "}
                                        {formatDate(recipe.publishDate)}
                                    </div>
                                    {user && (
                                        <button
                                            type="button"
                                            className="primary-button edit-button"
                                            onClick={() => {
                                                editRecipe(recipe.id);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;

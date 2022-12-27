import React, { useEffect, useState } from "react";
// import FirestoreService from "../firebase/FirestoreService";
import RestService from "../firebase/RestService";
import ImageUpload from "./imageUpload";

const RecipeForm = (props) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [publishDate, setPublishDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [directions, setDirections] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredientName, setIngredientName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const { currentRecipe, setCurrentRecipe, setUpdate } = props;

    useEffect(() => {
        if (currentRecipe) {
            setName(currentRecipe.name);
            setCategory(currentRecipe.category);
            setDirections(currentRecipe.directions);
            setPublishDate(currentRecipe.publishDate);
            setIngredients(currentRecipe.ingredients);
            setImageUrl(currentRecipe.imageUrl);
        } else {
            // resetForm();
            setName("");
            setCategory("");
            setDirections("");
            setPublishDate("");
            setIngredients([]);
            setImageUrl("");
        }
    }, [currentRecipe]);

    const addRecipe = async (newRecipe) => {
        try {
            // const response = await FirestoreService.createDocument(
            //     "recipes",
            //     newRecipe
            // );
            const response = await RestService.createDocument(
                "recipes",
                newRecipe
            );

            alert(`successfully create a new recipe with ID ${response.id}!`);
            setCurrentRecipe(null);
            setUpdate(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const updateRecipe = async (newRecipe, recipeId) => {
        try {
            // await FirestoreService.updateDocument(
            //     "recipes",
            //     recipeId,
            //     newRecipe
            // );
            await RestService.updateDocument(
                "recipes",
                recipeId,
                newRecipe
            );
            alert(`successfully updated a recipe with ID ${recipeId}`);
            setCurrentRecipe(null);
            setUpdate(true);
        } catch (error) {
            alert(error.message);
            throw error;
        }
    };

    const cancelEditRecipe = () => {
        setCurrentRecipe(null);
    };

    const deleteRecipe = async (recipeId) => {
        const deleteConfirmtion = window.confirm("Sure?");

        if (deleteConfirmtion) {
            try {
                // await FirestoreService.deleteDocument("recipes", recipeId);
                await RestService.deleteDocument("recipes", recipeId);
                setCurrentRecipe(null);
                window.scrollTo(0, 0);
                alert("Successfully deleted the recipe");
                setUpdate(true);
            } catch (error) {
                alert(error.message);
                throw error;
            }
        }
    };

    const addIngredient = (e) => {
        if (e.key && e.key !== "Enter") {
            return;
        }
        if (!ingredientName) {
            alert("Missing ingredient field. Please double check.");
            return;
        }
        setIngredients([...ingredients, ingredientName]);
        setIngredientName("");
    };

    const deleteIngredient = (ingredientName) => {
        const remainingIngredients = ingredients.filter((ingredient) => {
            return ingredient !== ingredientName;
        });

        setIngredients(remainingIngredients);
    };

    const submitRecipeFormHandler = (event) => {
        event.preventDefault();
        if (ingredients.length === 0) {
            alert(
                "Ingredients cannot be empty. Please add at least 1 ingredient"
            );
            return;
        }

        if (!imageUrl) {
            alert("Missing recipe image!");
            return;
        }

        const isPublished = new Date(publishDate) <= new Date() ? true : false;
        const newRecipe = {
            name,
            category,
            directions,
            publishDate: new Date(publishDate).getTime() / 1000,
            isPublished,
            ingredients,
            imageUrl,
        };

        if (currentRecipe) {
            updateRecipe(newRecipe, currentRecipe.id);
        } else {
            addRecipe(newRecipe);
        }
        setCurrentRecipe(null);
        // resetForm();
    };

    // const resetForm = () => {
    //     setName("");
    //     setCategory("");
    //     setDirections("");
    //     setPublishDate("");
    //     setIngredients([]);
    // };

    return (
        <form
            onSubmit={submitRecipeFormHandler}
            className="add-edit-recipe-form-container"
        >
            {currentRecipe ? (
                <h2>Update the Recipe</h2>
            ) : (
                <h2>Add a New Recipe</h2>
            )}
            <div className="top-form-section">
                <div className="image-input-box">
                    Recipe ImageUpload
                    <ImageUpload
                        basePath="recipes"
                        URL={imageUrl}
                        uploadImage={(url) => {
                            setImageUrl(url);
                        }}
                        cancelImage={() => {
                            setImageUrl("");
                        }}
                    ></ImageUpload>
                </div>
                <div className="fields">
                    <label className="recipe-label input-label">
                        Recipe Name:
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </label>
                    <label className="recipe-label input-label">
                        Category:
                        <select
                            value={category}
                            required
                            onChange={(e) => setCategory(e.target.value)}
                            className="select"
                        >
                            <option value=""></option>
                            <option value="breadsSandwichesAndPizza">
                                Breads, Sandwiches, and Pizza
                            </option>
                            <option value="eggsAndBreakfast">
                                Eggs & Breakfast
                            </option>
                            <option value="dessertsAndBakedGoods">
                                Desserts & Baked Goods
                            </option>
                            <option value="fishAndSeafood">
                                Fish & Seafood
                            </option>
                            <option value="vegetables">Vegetables</option>
                        </select>
                    </label>
                    <label className="recipe-label input-label">
                        Directions:
                        <textarea
                            required
                            value={directions}
                            onChange={(e) => setDirections(e.target.value)}
                            className="input-text directions"
                        ></textarea>
                    </label>
                    <label className="recipe-label input-label">
                        Publish Date:
                        <input
                            type="date"
                            required
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                        ></input>
                    </label>
                </div>
            </div>
            <div className="ingredients-list">
                <h3 className="text-center">Ingredients</h3>
                <table className="ingredients-table">
                    <thead>
                        <tr>
                            <th className="table-header">Ingredient</th>
                            <th className="table-header">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients && ingredients.length > 0
                            ? ingredients.map((ingredient, index) => {
                                  return (
                                      <tr key={ingredient + index}>
                                          <td className="table-data text-center">
                                              {ingredient}
                                          </td>
                                          <td className="ingredient-delete-box">
                                              <button
                                                  type="button"
                                                  className="secondary-button ingredient-delete-button"
                                                  onClick={() => {
                                                      deleteIngredient(
                                                          ingredient
                                                      );
                                                  }}
                                              >
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
                {ingredients && ingredients.length === 0 ? (
                    <h3 className="text-center no-ingredients">
                        No Ingredients Added Yet
                    </h3>
                ) : null}
                <label className="ingredient-label">
                    Ingredient:
                    <input
                        type="text"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        // onKeyPress={addIngredient}
                        className="input-text"
                        placeholder="ex. 1 cup of sugar"
                    ></input>
                </label>
                <button
                    type="button"
                    className="primary-button add-ingredient-button"
                    onClick={addIngredient}
                >
                    Add Ingredient
                </button>
            </div>
            <div className="action-buttons">
                <button type="submit" className="primary-button action-button">
                    {currentRecipe ? "Update Recipe" : "Create Recipe"}
                </button>
                {currentRecipe && (
                    <>
                        <button
                            type="button"
                            onClick={cancelEditRecipe}
                            className="primary-button action-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteRecipe(currentRecipe.id)}
                            className="primary-button action-button"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default RecipeForm;

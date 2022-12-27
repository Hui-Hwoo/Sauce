import React from "react";

const LoadMore = (props) => {
    const { recipes, setCursorId, perPage, setPerPage } = props;

    const changePerPageHandler = (event) => {
        setPerPage(event.target.value);
        setCursorId("");
    };

    const loadMoreHandler = () => {
        if (recipes.length > 0) {
            const lastRecipe = recipes[recipes.length - 1];
            setCursorId(lastRecipe.id);
        }
    };

    return (
        <>
            <label className="input-label">
                Recipe Per Page:
                <select value={perPage} onChange={changePerPageHandler}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
            <div className="pagination">
                <button
                    type="button"
                    onClick={loadMoreHandler}
                    className="primary-button"
                >
                    Load More Recipes
                </button>
            </div>
        </>
    );
};

export default LoadMore;

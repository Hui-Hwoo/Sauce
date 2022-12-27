import React from "react";

const LoadMore = (props) => {
    const { perPage, setPerPage, currentPage, setCurrentPage, totalPages } =
        props;

    // const loadMoreHandler = () => {
    //     if (recipes.length > 0) {
    //         const lastRecipe = recipes[recipes.length - 1];
    //         setCursorId(lastRecipe.id);
    //     }
    // };

    return (
        <>
            <label className="input-label">
                Recipe Per Page:
                <select
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(e.target.value);
                    }}
                >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <div className="pagination">
                {/* <button
                    type="button"
                    onClick={loadMoreHandler}
                    className="primary-button"
                >
                    Load More Recipes
                </button> */}
                <div className="row">
                    <button
                        type="button"
                        className={
                            currentPage === 1
                                ? "primary-button hidden"
                                : "primary-button"
                        }
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                        }}
                    >
                        Previous
                    </button>
                    <div>Page {currentPage}</div>
                    <button
                        type="button"
                        className={
                            currentPage === totalPages
                                ? "primary-button hidden"
                                : "primary-button"
                        }
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                        }}
                    >
                        Next
                    </button>
                </div>
                <div className="row">
                    {new Array(totalPages).fill(0).map((value, index) => {
                        return (
                            <button
                                key={index + 1}
                                type="button"
                                className={
                                    currentPage === index + 1
                                        ? "selected-page primary-button page-button"
                                        : "primary-button page-button"
                                }
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default LoadMore;

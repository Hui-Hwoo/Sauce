import React from "react";

const Filter = props => {
    const {order, setOrder, category, setCategory} = props;

    return (
        <div className="row filters">
            <label className="recipe-label input-label">
                Category:
                <select
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    className="select"
                >
                    <option value="">All</option>
                    <option value="breadsSandwichesAndPizza">
                        Breads, Sandwiches, and Pizza
                    </option>
                    <option value="eggsAndBreakfast">Eggs & Breakfast</option>
                    <option value="dessertsAndBakedGoods">
                        Desserts & Baked Goods
                    </option>
                    <option value="fishAndSeafood">Fish & Seafood</option>
                    <option value="vegetables">Vegetables</option>
                </select>
            </label>
            <label className="input-label">
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    id="dateSelector"
                    className="select"
                >
                    <option value="publishDateDesc">
                        Publish Date (newest - oldest)
                    </option>
                    <option value="publishDateAsc">
                        Publish Date (oldest - newest)
                    </option>
                </select>
            </label>
        </div>
    );
};

export default Filter;

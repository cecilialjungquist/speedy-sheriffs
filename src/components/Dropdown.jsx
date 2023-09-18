function Dropdown({ handleCategoryChange, selectedCategory, categories }) {

    const renderedCategories = categories.map((category, i) => {
        return <option key={i} value={category.toLowerCase()}>{category}</option>
    });


    return (  
        <select onChange={handleCategoryChange} value={selectedCategory}>
            {renderedCategories}
        </select>
    );
}

export default Dropdown;
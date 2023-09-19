function Dropdown({ handleCategoryChange, selectedCategory, categories }) {

    const renderedCategories = categories.map((category, i) => {
        return <option key={i} value={category.toLowerCase()}>{category}</option>
    });

    return (  
        <select className="dropdown" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="" disabled>Choose upload album...</option>
            {renderedCategories}
        </select>
    );
}

export default Dropdown;
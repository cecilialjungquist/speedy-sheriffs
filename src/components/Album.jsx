function Album({ categories, handleAlbums }) {

    const albums = categories.map((category, i) => {
        return <button key={i} onClick={() => handleAlbums(category.toLowerCase())}>{category}</button> 
    });

    return ( 
        <section>
            <button onClick={() => handleAlbums()}>Show all</button>
            {albums}
        </section>
    );
}

export default Album;
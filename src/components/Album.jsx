function Album({ categories, handleAlbums }) {

    const albums = categories.map((category, i) => {
        return <button key={i} onClick={() => handleAlbums(category.toLowerCase())}>{category}</button> 
    });

    return ( 
        <section>
            {albums}
        </section>
    );
}

export default Album;
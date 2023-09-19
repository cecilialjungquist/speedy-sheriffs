function Albums({ categories, handleAlbums }) {

    const albums = categories.map((category, i) => {
        return <button key={i} onClick={() => handleAlbums(category.toLowerCase())}>{category}</button> 
    });

    return ( 
        <section className="albums">
            <button onClick={() => handleAlbums()}>Show all</button>
            {albums}
        </section>
    );
}

export default Albums;
let movies = [
    {
        id: 1,
        name: "맨인블랙1",
        score: 5,
    },
    {
        id: 2,
        name: "맨인블랙2",
        score: 4,
    },
    {
        id: 3,
        name: "맨인블랙3",
        score: 5,
    },
    {
        id: 4,
        name: "Starwars - 1",
        score: 3,
    },
    {
        id: 5,
        name: "Starwars - 2",
        score: 5,
    },
    {
        id: 6,
        name: "Starwars - 3",
        score: 5,
    },
    {
        id: 7,
        name: "IronMan",
        score: 4,
    },
    {
        id: 8,
        name: "Tor",
        score: 1,
    }
];

export const getMovies = () => movies;

export const getById = (id) => {
    const filteredMovies = movies.filter(movie => movie.id === id);
    return filteredMovies[0];
}

export const deleteMovie = (id) => {
    const cleanedMovie = movies.filter(movie => movie.id !== id);
    if(movies.length > cleanedMovie.length) {
        movies = cleanedMovie;
        return true;
    } else {
        return false;
    }
}

export const addMovie = (name, score) => {
    const newMovie = {
        id: `${movies.length + 1}`,
        name,
        score
    };
    movies.push(newMovie);
    return newMovie;
}
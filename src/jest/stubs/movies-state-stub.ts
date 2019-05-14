import {MoviesState} from '../../store/movies/reducer';

export const moviesStateStub: MoviesState = {
    isFavoriteLoading: false,
    isLoading: false,
    currentMovieId: '',
    queryString: '',
    movies: [
        {
            title: 'The Shawshank Redemption',
            id: 278,
            posterPath: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
            releaseDate: '1994-09-23',
            genres: [
                'Drama',
                'Crime'
            ],
            voteAverage: 8.6
        },
        {
            title: 'Your Name.',
            id: 372058,
            posterPath: 'https://image.tmdb.org/t/p/w500/xq1Ugd62d23K2knRUx6xxuALTZB.jpg',
            releaseDate: '2016-08-26',
            genres: [
                'Romance',
                'Animation',
                'Drama'
            ],
            voteAverage: 8.5
        },
        {
            title: 'The Godfather',
            id: 238,
            posterPath: 'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg',
            releaseDate: '1972-03-14',
            genres: [
                'Drama',
                'Crime'
            ],
            voteAverage: 8.5
        },
        {
            title: 'Sister\'s Younger Husband',
            id: 418827,
            posterPath: 'https://image.tmdb.org/t/p/w500/wKCkyb7dyDTbZn7qy6zh8oqtFrT.jpg',
            releaseDate: '2016-10-11',
            genres: [
                'Comedy',
                'Drama',
                'Romance'
            ],
            voteAverage: 8.5
        }
    ],
    favMovies: [
        {
            title: 'Untitled Avengers',
            id: 299534,
            posterPath: 'https://image.tmdb.org/t/p/w500/aMETsaNNcDc6g5ZatQtVbySnSaA.jpg',
            releaseDate: '2019-04-24',
            genres: [
                'Action',
                'Adventure',
                'Science Fiction'
            ],
            voteAverage: 0,
            tagLine: '',
            runtime: 12,
            overview: 'The culmination of the Marvel Cinematic Universe.'
        },
        {
            title: 'Fifty Shades Freed',
            id: 337167,
            posterPath: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
            releaseDate: '2018-02-07',
            genres: [
                'Drama',
                'Romance'
            ],
            voteAverage: 6.1,
            tagLine: 'Don\'t miss the climax',
            runtime: 106,
            overview: 'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.'
        }
    ],
    currentMovie: {
        title: 'Star Wars: The Last Jedi',
        id: 181808,
        posterPath: 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
        releaseDate: '2017-12-13',
        genres: [
            'Fantasy',
            'Adventure',
            'Science Fiction'
        ],
        voteAverage: 7.1,
        tagLine: 'The Saga Continues',
        runtime: 152,
        overview: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.'
    }
};

import {MovieItem} from '../../store/movies/reducer';

export const favMoviesStub: MovieItem[] = [
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
];

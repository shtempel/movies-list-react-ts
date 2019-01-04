import axios from 'axios';

import { MovieItem } from '../store/movies/actions';
import { BASE_URL } from '../constants/constants';

export class MoviesService {

    getMovies(searchQuery: string, searchBy: string) {
        return axios.get(`${ BASE_URL }?search=${ searchQuery }&searchBy=${ searchBy }`)
            .then((response) => {
                return response.data.data.map(
                    (movie: any) => {
                        return {
                            title: movie.title,
                            id: movie.id,
                            posterPath: movie.poster_path,
                            releaseDate: movie.release_date,
                            genres: movie.genres,
                            voteAverage: movie.vote_average,
                            tagLine: movie.tagline,
                            runtime: movie.runtime,
                            overview: movie.overview
                        }
                    }
                )
            })
    }

    getMovieById() {}
}

const service = new MoviesService();

export default service;

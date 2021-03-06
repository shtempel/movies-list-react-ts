import axios from 'axios';

import { BASE_URL } from '../constants/constants';
import { MovieItem } from '../store/movies/reducer';

export class MoviesService {

    getMovies(searchQuery: string, searchBy: string, limit: string) {
        return axios.get(`${ BASE_URL }?search=${ searchQuery }&searchBy=${ searchBy }&limit=${ limit }`)
            .then((response): MovieItem[] => {
                return response.data.data.map(
                    (movie: any): MovieItem => {
                        return {
                            title: movie.title,
                            id: movie.id,
                            posterPath: movie.poster_path,
                            releaseDate: movie.release_date,
                            genres: movie.genres,
                            voteAverage: movie.vote_average
                        }
                    }
                )
            })
    }

    getMovieById(id: number) {
        return axios.get(`${ BASE_URL }/${ id }`)
            .then(response => {
                return response.data = {
                    title: response.data.title,
                    id: response.data.id,
                    posterPath: response.data.poster_path,
                    releaseDate: response.data.release_date,
                    genres: response.data.genres,
                    voteAverage: response.data.vote_average,
                    tagLine: response.data.tagline,
                    runtime: response.data.runtime,
                    overview: response.data.overview,
                    voteCount: response.data.vote_count
                }
            })
    }
}

const service = new MoviesService();

export default service;

import axios from 'axios';

import { BASE_URL } from './../constants/constants';

export class MoviesService {

    getMovies() {
        // return axios.get(`${BASE_URL}?search=${action.payload}&searchBy=${urlType}`)
        return axios.get(`${ BASE_URL }?search=wars&searchBy=title`)
            .then()
    }

}

const service = new MoviesService();

export default service;

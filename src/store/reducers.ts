import searchByReducer from './search-by/reducer';
import movieReducer from './movies/reducer';

export default {
    moviesState: movieReducer,
    searchBy: searchByReducer
};

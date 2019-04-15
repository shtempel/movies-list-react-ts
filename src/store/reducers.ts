import searchByReducer from './search-by/reducer';
import sortByReducer from './sort-by/reducer';
import movieReducer from './movies/reducer';
import searchLimitReducer from './search-limit/reducer';

export default {
    moviesState: movieReducer,
    sortBy: sortByReducer,
    searchBy: searchByReducer,
    searchLimit: searchLimitReducer
};

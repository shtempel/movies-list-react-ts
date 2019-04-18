import React, {useEffect, ReactNode} from 'react';
import {connect} from 'react-redux';

import SearchResult from './search-result/search-result';
import {GlobalState} from '../../store/store';
import {fetchMovies} from '../../store/movies/actions';
import {selectIsLoading, selectMovies} from '../../store/selectors';
import {Header, SortBy, Loader} from '../../components';
import {MovieItem} from '../../store/movies/reducer';

interface HomeProps {
    movies: MovieItem[];
    isLoading: boolean;

    fetchMovies(): void;
}

const mapStateToProps = (state: GlobalState) => ({
    movies: selectMovies(state),
    isLoading: selectIsLoading(state)
});

const mapDispatchToProps = {
    fetchMovies
};

const Home = (props: HomeProps) => {
    const {fetchMovies, movies, isLoading} = props;

    useEffect(() => {
        fetchMovies();
    }, [!movies]);

    const searchResult: ReactNode = (
        movies.length
            ? <SearchResult movies={movies}/>
            : < div className='no-films-found'><h1> No films found</h1></div>
    );

    const content: ReactNode = (
        isLoading
            ? <Loader/>
            : searchResult
    );

    return (
        <div>
            <Header/>
            <SortBy/>
            {content}
        </div>
    );

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { SearchResult } from './search-result/search-result';
import { GlobalState } from '../../store/store';
import { fetchMovies } from '../../store/movies/actions';
import { selectMovies } from '../../store/selectors';
import { Header, SortBy, Loader } from '../../components';
import { MovieItem } from '../../store/movies/reducer';

interface HomeProps {
    movies: MovieItem[];
    isLoading: boolean;
    fetchMovies: () => any;
}

class Home extends Component<HomeProps> {
    componentWillMount(): void {
        this.props.fetchMovies();
    }

    render() {
        const { movies, isLoading } = this.props;

        const searchResult: ReactNode = (
            movies.length
            ? <SearchResult movies={ movies }/>
            : < div className='no-films-found'>< h1> No films found</h1></div>
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
                { content }
            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        movies: selectMovies(state),
        isLoading: state.moviesState.isLoading
    }),
    {
        fetchMovies: fetchMovies
    }
)(Home);

export const sort = () => {

};

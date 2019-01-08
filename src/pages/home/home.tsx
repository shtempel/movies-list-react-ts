import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchResult } from './search-result/search-result';
import { GlobalState } from '../../store/store';
import { fetchMovies, FetchMoviesPayload, MovieItem } from '../../store/movies/actions';
import { getMovies } from '../../store/selectors';
import { Header, SortBy, Loader } from '../../components';

interface HomeProps {
    movies: MovieItem[];
    isLoading: boolean;
    fetchMovies: (payload: FetchMoviesPayload) => any;
}

class Home extends Component<HomeProps> {
    componentWillMount(): void {
        this.props.fetchMovies({ searchQuery: ' ', searchBy: 'title' });
    }

    render() {
        const { movies, isLoading } = this.props;

        return (
            <div>
                <Header/>
                <SortBy/>
                { isLoading ? <Loader/> :
                    movies.length
                        ? <SearchResult movies={ movies }/>
                        : < div className='no-films-found'>< h1> No films found</h1></div>
                }
            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        movies: getMovies(state),
        isLoading: state.moviesState.isLoading
    }),
    {
        fetchMovies: fetchMovies
    }
)(Home);

export const sort = () => {


};
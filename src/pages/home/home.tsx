import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SearchResult } from "./search-result/search-result";
import { appHistory, GlobalState } from "../../store/store";
import { MovieItem } from "../../store/movies/actions";
import { getMovies } from "../../store/selectors";

interface HomeProps {
    movies: MovieItem[];
}

class Home extends Component<HomeProps> {

    private handleOnClick = () => {
        appHistory.push({
            // pathname: `/movie/:${movie.id}`
        });
        console.log(this.props);
    };

    render() {
        const { movies } = this.props;
        return (
            <div>
                {
                    movies.length
                        ? <SearchResult movies={ movies } />
                        : < div className='no-films-found'>< h1> No films found</h1></div>
                }
            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        movies: getMovies(state)
    }),
    null
)(Home);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GlobalState } from "../../store/store";
import { fetchMovieById, FetchMovieByIdPayload, MovieItem } from "../../store/movies/actions";
import { getCurrentMovie } from "../../store/movies/selectors";

interface DetailedInfoProps {
    match: any;
    fetchMovieById: (payload: FetchMovieByIdPayload) => any,
    currentMovie: MovieItem
}

class DetailedInfo extends Component<DetailedInfoProps> {
    componentWillMount(): void {
        this.props.fetchMovieById({ id: this.props.match.params.id });
    }

    render() {
        console.log(this.props.currentMovie);
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        currentMovie: getCurrentMovie(state)
    }),
    {
        fetchMovieById: fetchMovieById
    }
)(DetailedInfo);

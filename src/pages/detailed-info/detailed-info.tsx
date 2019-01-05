import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GlobalState } from "../../store/store";
import { MovieItem } from "../../store/movies/actions";

interface DetailedInfoProps {
    movie: MovieItem;
}

class DetailedInfo extends Component<DetailedInfoProps> {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({}),
    null
)(DetailedInfo);

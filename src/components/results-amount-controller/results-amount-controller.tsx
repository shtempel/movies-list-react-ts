import React, {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {setSearchLimit} from '../../store/search-limit/actions';
import {fetchMovies} from "../../store/movies/actions";

import {GlobalState} from "../../store/store";
import {selectSearchLimit} from "../../store/search-limit/selectors";

import './results-amount-controller.scss';
import {common} from "../../constants/constants";

interface ResultsAmountControllerProps {
    searchLimit: string;

    setSearchLimit(limit: string): void;

    fetchMovies(): void;
}

export enum Amount {
    ten = '10',
    twenty = '20',
    thirty = '30',
}

const mapStateToProps = (state: GlobalState) => ({
    searchLimit: selectSearchLimit(state)
});

const mapDispatchToProps = {
    setSearchLimit,
    fetchMovies
};

class ResultsAmountController extends Component<ResultsAmountControllerProps> {
    render() {
        return (
            <div className='results-amount-controller'>
                <span>{common.RESULTS_ON_PAGE}</span>
                {this.getSingleControl(Amount.ten)}
                {this.getSingleControl(Amount.twenty)}
                {this.getSingleControl(Amount.thirty)}
            </div>
        );
    }

    setAmountItems = (e: any) => {
        const {setSearchLimit, fetchMovies, searchLimit} = this.props;

        searchLimit !== e.target.id && setSearchLimit(e.target.id) && fetchMovies();
    };

    getSingleControl = (content: string): ReactNode => {
        const {searchLimit} = this.props;

        return (
            <span id={content}
                  onClick={this.setAmountItems}
                  className={cn('single-control', {'single-control-active': searchLimit === content})}>
                {content}
            </span>
        )
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsAmountController);

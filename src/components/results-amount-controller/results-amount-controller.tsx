import React, {ReactNode} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {setSearchLimit} from '../../store/search-limit/actions';
import {fetchMovies} from '../../store/movies/actions';
import {GlobalState} from '../../store/store';
import {selectSearchLimit} from '../../store/search-limit/selectors';
import {common} from '../../constants/constants';

import './results-amount-controller.scss';

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

const ResultsAmountController = (props: ResultsAmountControllerProps) => {
    const setAmountItems = (e: any) => {
        const {setSearchLimit, fetchMovies, searchLimit} = props;

        searchLimit !== e.target.id && setSearchLimit(e.target.id) && fetchMovies();
    };

    const getSingleControl = (content: string): ReactNode => {
        const {searchLimit} = props;

        return (
            <span id={content}
                  onClick={setAmountItems}
                  className={cn('single-control', {'single-control-active': searchLimit === content})}>
                {content}
            </span>
        )
    };

    return (
        <div className='results-amount-controller'>
            <span>{common.RESULTS_ON_PAGE}</span>
            {getSingleControl(Amount.ten)}
            {getSingleControl(Amount.twenty)}
            {getSingleControl(Amount.thirty)}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsAmountController);

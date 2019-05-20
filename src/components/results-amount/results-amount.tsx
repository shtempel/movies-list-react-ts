import React, { FunctionComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from '../../store/interfaces';
import { fetchMovies } from '../../store/movies/actions';
import { setSearchLimit } from '../../store/search-limit/actions';
import { selectSearchLimit } from '../../store/search-limit/selectors';

import './results-amount.scss';
import { useTranslation } from 'react-i18next';

interface ResultsAmountProps {
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

const ResultsAmount: FunctionComponent<ResultsAmountProps> =
    (props: ResultsAmountProps) => {
        const { t } = useTranslation();
        const { setSearchLimit, fetchMovies, searchLimit } = props;

        const setAmountItems = (e: any) => searchLimit !== e.target.id && setSearchLimit(e.target.id) && fetchMovies();

        const getSingleControl = (content: string): ReactNode => {
            const { searchLimit } = props;

            return (
                <span id={ content }
                      onClick={ setAmountItems }
                      className={ cn('single-control', { 'single-control-active': searchLimit === content }) }>
                { content }
            </span>
            )
        };

        return (
            <div className='results-amount row'>
                <span>{ t('') }</span>
                { getSingleControl(Amount.ten) }
                { getSingleControl(Amount.twenty) }
                { getSingleControl(Amount.thirty) }
            </div>
        );
    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsAmount);

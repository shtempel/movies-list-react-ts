import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { GlobalState } from '../../store/interfaces';
import { fetchMovies } from '../../store/movies/actions';
import { setSearchLimit } from '../../store/search-limit/actions';
import { selectSearchLimit } from '../../store/search-limit/selectors';

import './results-amount.scss';

interface ResultsAmountProps {
    className?: string
}

export enum Amount {
    ten = '10',
    twenty = '20',
    thirty = '30',
}

const ResultsAmount: FC<ResultsAmountProps> = (props: ResultsAmountProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const searchLimit = useSelector<GlobalState, string>(selectSearchLimit);
    const setAmountItems = (e: any) =>
        searchLimit !== e.target.id && setSearchLimit(e.target.id) && dispatch({ type: getType(fetchMovies) });
    const getSingleControl = (content: string): ReactNode => {

        return (
            <span id={ content }
                  onClick={ setAmountItems }
                  className={ cn('single-control', { 'single-control-active': searchLimit === content }) }>
                { content }
            </span>
        )
    };

    return (
        <div className={ `results-amount ${ props.className }` }>
            <span className='amount-title'>{ t('home.search.resultsOnPage') }</span>
            { getSingleControl(Amount.ten) }
            { getSingleControl(Amount.twenty) }
            { getSingleControl(Amount.thirty) }
        </div>
    );
};

export default ResultsAmount;

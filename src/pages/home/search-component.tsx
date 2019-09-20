import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import ResultsAmount from '../../components/results-amount/results-amount';
import { GlobalState } from '../../store/interfaces';
import { fetchMovies, setQueryString } from '../../store/movies/actions';
import { selectIsLoading } from '../../store/movies/selectors';
import { setSearchBy } from '../../store/search-by/actions';
import { selectSearchBy } from '../../store/search-by/selectors';
import { appHistory } from '../../store/store';
import { Button } from '../../components';

import './search-component.scss';

const SearchComponent: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const isLoading = useSelector<GlobalState, boolean>(selectIsLoading);
    const searchByState = useSelector<GlobalState, string>(selectSearchBy);
    const [ value, setValue ] = useState<string>('');

    const handleChange = (e: any) => setValue(e.target.value);

    const submitEvent = (e: any) => e.key === 'Enter' && handleSubmit();

    const onSetSearchBy = (e: any) => dispatch({ type: getType(setSearchBy), payload: e.target.value });

    const setActiveBtn = (searchBy: string) => searchBy === searchByState;

    const handleSubmit = () => {
        appHistory.push(`/search/:${ value }`);
        dispatch({ type: getType(setQueryString), payload: value });
        dispatch({ type: getType(fetchMovies) });
    };

    return (
        <div className='search-component'>
            <div className='search-form'>
                <input className='search-input'
                       type='search'
                       placeholder={ t('home.search.find') }
                       onKeyPress={ submitEvent }
                       value={ value }
                       onChange={ handleChange }/>
                <Button type='button'
                        className={ cn('search-button', { 'disabled-btn': isLoading }) }
                        onClick={ handleSubmit }
                        disabled={ isLoading }
                        name={ t('home.search.search') }/>
            </div>
            <div className='search-by'>
                <span>{ t('home.search.searchBy') }:</span>
                <Button value={ 'title' }
                        onClick={ onSetSearchBy }
                        type='button'
                        disabled={ setActiveBtn('title') }
                        className={ cn('btn', { 'active-button': setActiveBtn('title') }) }
                        name={ t('home.search.title') }/>
                <Button value={ 'genres' }
                        onClick={ onSetSearchBy }
                        type='button'
                        disabled={ setActiveBtn('genres') }
                        className={ cn('btn', { 'active-button': setActiveBtn('genres') }) }
                        name={ t('home.search.genres') }/>
            </div>
            <ResultsAmount className='amount'/>
        </div>
    );
};

export default SearchComponent;

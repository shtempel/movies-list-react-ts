import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import cn from 'classnames';

import { fetchMovies, setQueryString } from '../../store/movies/actions';
import { MovieItem } from '../../store/movies/reducer';
import { selectFavorites, selectMoviesQuantity } from '../../store/movies/selectors';
import { setSearchBy } from '../../store/search-by/actions';
import { appHistory } from '../../store/store';
import { Button, ResultsAmount } from '../../components';
import { GlobalState } from '../../store/interfaces';

import './search-component.scss';

interface SearchComponentProps {
    searchBy: string,
    isLoading: boolean;
    favorites: MovieItem[];

    fetchMovies(): void,
    setSearchBy(payload: string): void,
    setQueryString(payload: string): void
}

const mapStateToProps = (state: GlobalState) => ({
    searchBy: state.searchBy,
    favorites: selectFavorites(state),
    isLoading: state.moviesState.isLoading,
    moviesCount: selectMoviesQuantity(state)
});

const mapDispatchToProps = {
    fetchMovies,
    setSearchBy,
    setQueryString
};

const SearchComponent: FunctionComponent<SearchComponentProps> = (props: SearchComponentProps) => {
    const { setQueryString, fetchMovies, isLoading, setSearchBy } = props;
    const { t } = useTranslation();
    const state: string = '';

    const [value, setValue] = useState(state);

    const handleChange = (e: any) => setValue(e.target.value);

    const submitEvent = (e: any) => e.key === 'Enter' && handleSubmit();

    const onSetSearchBy = (e: any) => setSearchBy(e.target.value);

    const setActiveBtn = (searchBy: string) => searchBy === props.searchBy;

    const handleSubmit = () => {
        appHistory.push(`/search/:${ value }`);
        setQueryString(value);
        fetchMovies();
    };

    return (
        <div className='search-component column'>
            <div className='search-form column'>
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
            <div className='search-by row'>
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
            <ResultsAmount/>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComponent);

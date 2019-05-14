import React, {useState} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {Common} from '../../constants/constants';
import {appHistory, GlobalState} from '../../store/store';
import {fetchMovies, setQueryString, setSearchBy} from '../../store/actions';
import {Button, Title} from '..';
import {selectFavorites, selectMoviesQuantity} from '../../store/movies/selectors';
import {MovieItem} from '../../store/movies/reducer';

import './header.scss';

export interface HeaderProps {
    searchBy: string,
    isLoading: boolean;
    favorites: MovieItem[];

    fetchMovies(): void,
    setSearchBy(payload: string): void,
    setQueryString(payload: string): void,
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

const Header = (props: HeaderProps) => {
    const {setQueryString, fetchMovies, isLoading, setSearchBy} = props;
    const state: string = '';
    const [value, setValue] = useState(state);

    const handleChange = (e: any) => {
        setValue(e.target.value);
    };

    const submitEvent = (e: any) => {
        e.key === 'Enter' && handleSubmit();
    };

    const handleSubmit = () => {
        appHistory.push(`/search/:${value}`);
        setQueryString(value);
        fetchMovies();
    };

    const onSetSearchBy = (e: any) => {
        setSearchBy(e.target.value);
    };

    const setActiveBtn = (searchBy: string) => {
        return searchBy === props.searchBy;
    };

    return <div className='header column'>
        <Title className='header__title' title={Common.MainTitle}/>
        <span className='header__find_your'>{Common.FindYourMovie}</span>
        <input className='header__search-input'
               type='search'
               onKeyPress={submitEvent}
               value={value}
               onChange={handleChange}/>
        <div className='header__controls row'>
            <div className='header__controls__left'>
                <span>{Common.SearchBy}</span>
                <Button value={Common.Title}
                        onClick={onSetSearchBy}
                        type='button'
                        disabled={setActiveBtn(Common.Title)}
                        className={cn('btn', {'active-button': setActiveBtn(Common.Title)})}
                        name={Common.Title}/>
                <Button value={Common.Genres}
                        onClick={onSetSearchBy}
                        type='button'
                        disabled={setActiveBtn(Common.Genres)}
                        className={cn('btn', {'active-button': setActiveBtn(Common.Genres)})}
                        name={Common.Genres}/>
            </div>
            <Button className='header__controls__search-button btn'
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type='submit'
                    name={Common.Search}/>
        </div>
    </div>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

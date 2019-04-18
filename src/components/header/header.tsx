import React, {useState} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {common} from '../../constants/constants';
import {appHistory, GlobalState} from '../../store/store';
import {fetchMovies, setQueryString, setSearchBy} from '../../store/actions';
import {Button, Title} from '..';
import {selectMoviesQuantity} from '../../store/movies/selectors';

import './header.scss';

export interface HeaderProps {
    searchBy: string,
    isLoading: boolean;

    fetchMovies(): void,
    setSearchBy(payload: string): void,
    setQueryString(payload: string): void,
}

const mapStateToProps = (state: GlobalState) => ({
    searchBy: state.searchBy,
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
        <Title className='header__title' title={common.MAIN_TITLE}/>
        <span className='header__find_your'>{common.FIND_YOUR_MOVIE}</span>
        <input className='header__search-input'
               type='search'
               onKeyPress={submitEvent}
               value={value}
               onChange={handleChange}/>
        <div className='header__controls row'>
            <div className='header__controls__left'>
                <span>{common.SEARCH_BY}</span>
                <Button value={common.TITLE}
                        onClick={onSetSearchBy}
                        type='button'
                        disabled={setActiveBtn(common.TITLE)}
                        className={cn('btn', {'active-button': setActiveBtn(common.TITLE)})}
                        name={common.TITLE}/>
                <Button value={common.GENRE}
                        onClick={onSetSearchBy}
                        type='button'
                        disabled={setActiveBtn(common.GENRE)}
                        className={cn('btn', {'active-button': setActiveBtn(common.GENRE)})}
                        name={common.GENRE}/>
            </div>
            <Button className='header__controls__search-button btn'
                    onClick={handleSubmit}
                    disabled={isLoading}
                    type='submit'
                    name={common.SEARCH}/>
        </div>
    </div>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './header.scss';
import { common } from '../../constants/constants';
import { appHistory, GlobalState } from '../../store/store';
import { fetchMovies, FetchMoviesPayload, setSearchBy } from '../../store/actions';
import { Button, Title } from '..';
import { getMoviesQuantity } from '../../store/movies/selectors';

export interface HeaderProps {
    fetchMovies: (payload: FetchMoviesPayload) => any,
    setSearchBy: (payload: string) => any,
    searchBy: string,
    match?: any;
    isLoading?: boolean;
}

export interface HeaderState {
    value: string;
}

class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = { value: '' };
    }

    handleSubmit = () => {
        appHistory.push(`/search/:${ this.state.value }`);
        this.props.fetchMovies({ searchQuery: this.state.value, searchBy: this.props.searchBy });
    };

    private handleChange = (e: any) => {
        this.setState({ value: e.target.value });
    };

    private submitEvent = (e: any) => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    };

    private setSearchBy = (e: any) => {
        this.props.setSearchBy(e.target.value);
    };

    private setActiveBtn = (searchBy: string) => {
        return searchBy === this.props.searchBy;
    };

    render() {
        return (
            <div className='header column'>
                <Title className='header__title' title={ common.MAIN_TITLE }/>
                <span className='header__find_your'>{ common.FIND_YOUR_MOVIE }</span>
                <input className='header__search-input'
                       type='search'
                       onKeyPress={ this.submitEvent }
                       value={ this.state.value }
                       onChange={ this.handleChange }/>
                <div className='header__controls row'>
                    <div className='header__controls__left'>
                        <span>{ common.SEARCH_BY }</span>
                        <Button value='title'
                                onClick={ this.setSearchBy }
                                type='button'
                                disabled={ this.setActiveBtn('title') }
                                className={ cn('btn', { 'active-button': this.setActiveBtn('title') }) }
                                name={ common.TITLE }/>
                        <Button value='genre'
                                onClick={ this.setSearchBy }
                                type='button'
                                disabled={ this.setActiveBtn('genre') }
                                className={ cn('btn', { 'active-button': this.setActiveBtn('genre') }) }
                                name={ common.GENRE }/>
                    </div>
                    <Button className='header__controls__search-button btn'
                            onClick={ this.handleSubmit }
                            disabled={ this.props.isLoading }
                            type='submit'
                            name={ common.SEARCH }/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: GlobalState) => ({
        searchBy: state.searchBy,
        isLoading: state.moviesState.isLoading,
        moviesCount: getMoviesQuantity(state)
    }),
    {
        fetchMovies: fetchMovies,
        setSearchBy: setSearchBy
    }
)(Header);

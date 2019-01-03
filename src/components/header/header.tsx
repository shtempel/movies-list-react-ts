import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './header.scss';
import { common } from '../../constants/constants';
import { appHistory } from '../../store/store';
import { fetchMovies, FetchMoviesPayload } from '../../store/movies/actions';
import { Button } from "..";
import { setSearchBy } from "../../store/search-by/actions";

export interface HeaderProps {
    fetchMovies: (payload: FetchMoviesPayload) => any,
    setSearchBy: (payload: string) => any,
    searchBy: string
}

export interface HeaderState {
    value: string;
}

export class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = { value: '' };
    }

    private handleSubmit = () => {
        appHistory.push(`/search/${ this.state.value }`);
        this.props.fetchMovies({ searchQuery: this.state.value, searchBy: this.props.searchBy });
    };

    private handleChange = (e: any) => {
        this.setState({ value: e.target.value });
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
                <span className='header__title'>{ common.MAIN_TITLE }</span>
                <form onSubmit={ this.handleSubmit } className='header__form column'>
                    <input className='header__form__search-input'
                           type='text'
                           value={ this.state.value }
                           onChange={ this.handleChange }/>
                    <Button className='header__form__search-button btn' type='submit' name={ common.SEARCH }/>
                </form>
                <div className='header__search-by row'>
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
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        searchBy: state.searchBy
    }),
    {
        fetchMovies: fetchMovies,
        setSearchBy: setSearchBy
    }
)(Header);

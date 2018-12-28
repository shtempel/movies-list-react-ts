import React, { Component } from 'react';
import { connect } from 'react-redux';

import './header.scss';
import { appHistory } from '../../store/store';
import { fetchMovies } from '../../store/movies/actions';

export interface HeaderProps {
    fetchMovies: (payload: string) => any
}

export interface HeaderState {
    value: string;
}

export class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps,) {
        super(props);

        this.state = { value: '' };
    }

    private handleSubmit = (e: any) => {
        appHistory.push(`/search/${ this.state.value }`);
        this.props.fetchMovies(this.state.value);
    };

    private handleChange = (e: any) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return (
            <div className='header'>
                <form onSubmit={ this.handleSubmit }>
                    <input type='text' value={ this.state.value } onChange={ this.handleChange }/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    {
        fetchMovies: fetchMovies
    }
)(Header);

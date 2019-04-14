import React, {Component} from 'react';
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

export interface HeaderState {
    value: string;
}

const mapStateToProps = (state: GlobalState) => ({
    searchBy: state.searchBy,
    isLoading: state.moviesState.isLoading,
    moviesCount: selectMoviesQuantity(state)
});

const mapDispatchToProps = {
    fetchMovies: fetchMovies,
    setSearchBy: setSearchBy,
    setQueryString: setQueryString
};

class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {value: ''};
    }

    render() {
        const {value} = this.state;
        const {isLoading} = this.props;

        return (
            <div className='header column'>
                <Title className='header__title' title={common.MAIN_TITLE}/>
                <span className='header__find_your'>{common.FIND_YOUR_MOVIE}</span>
                <input className='header__search-input'
                       type='search'
                       onKeyPress={this.submitEvent}
                       value={value}
                       onChange={this.handleChange}/>
                <div className='header__controls row'>
                    <div className='header__controls__left'>
                        <span>{common.SEARCH_BY}</span>
                        <Button value= {common.TITLE}
                                onClick={this.setSearchBy}
                                type='button'
                                disabled={this.setActiveBtn(common.TITLE)}
                                className={cn('btn', {'active-button': this.setActiveBtn(common.TITLE)})}
                                name={common.TITLE}/>
                        <Button value={common.GENRE}
                                onClick={this.setSearchBy}
                                type='button'
                                disabled={this.setActiveBtn(common.GENRE)}
                                className={cn('btn', {'active-button': this.setActiveBtn(common.GENRE)})}
                                name={common.GENRE}/>
                    </div>
                    <Button className='header__controls__search-button btn'
                            onClick={this.handleSubmit}
                            disabled={isLoading}
                            type='submit'
                            name={common.SEARCH}/>
                </div>
            </div>
        );
    }

    handleSubmit = () => {
        const {value} = this.state;
        const {setQueryString, fetchMovies} = this.props;

        appHistory.push(`/search/:${value}`);
        setQueryString(value);
        fetchMovies();
    };

    handleChange = (e: any) => {
        this.setState({value: e.target.value});
    };

    submitEvent = (e: any) => {
        e.key === 'Enter' && this.handleSubmit();
    };

    setSearchBy = (e: any) => {
        this.props.setSearchBy(e.target.value);
    };

    setActiveBtn = (searchBy: string) => {
        return searchBy === this.props.searchBy;
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

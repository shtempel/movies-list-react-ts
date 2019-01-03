import React from 'react';

import './search-result.scss';
import { MovieItem } from "../../../store/movies/actions";

interface SearchResultProps {
    movies: MovieItem[];
}

export const SearchResult = (props: SearchResultProps) => {
    return (
        <div className='search-result' { ...props }>
            Search result
        </div>
    );
};
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import './search-component.scss';

interface SearchComponentProps {

}

export const SearchComponent: FunctionComponent<SearchComponentProps> = (props: SearchComponentProps) => {
    const { t } = useTranslation();

    return (
        <div className='search-component column'>
            <span className='find-your-movie'>{ t('home.search.find') }</span>
        </div>
    );
};

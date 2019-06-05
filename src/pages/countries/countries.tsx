import React, { FunctionComponent } from 'react';

import { NavMenu } from '../../components';

interface CountriesProps {

}

const Countries: FunctionComponent<CountriesProps> = (props: CountriesProps) => {
    const tr: string[] = ['bla', 'bl1a'];

    return (
        <div>
            <NavMenu menuItems={tr}/>
        </div>
    );
};

export default Countries;

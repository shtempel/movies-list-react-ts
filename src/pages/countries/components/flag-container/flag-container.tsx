import React, { FunctionComponent } from 'react';

import './flag-container.scss';

interface FlagContainerProps {
	alpha2Code: string;
	style: 'flat' | 'shiny';
	height: '16' | '24' | '32' | '48' | '64';
}

export const FlagContainer: FunctionComponent<FlagContainerProps> = (props: FlagContainerProps) => {
	const { alpha2Code, style, height } = props;
	const url = `https://www.countryflags.io/${ alpha2Code }/${ style }/${ height }.png`;

	return <img className='flag-container' src={ url }/>;
};

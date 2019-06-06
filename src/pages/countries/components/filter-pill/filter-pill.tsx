import React, { FunctionComponent } from 'react';
import cn from 'classnames';

import './filter-pill.scss';

interface FilterPillProps {
	isSelected: boolean;
	title: string;

	onClick(id: any): void;
}

export const FilterPill: FunctionComponent<FilterPillProps> = (props: FilterPillProps) =>
	<span id={ props.title }
		  onClick={ props.onClick }
		  className={ cn('filter-pill', { 'filter-pill__active': props.isSelected }) }>
		{ props.title }
	</span>;

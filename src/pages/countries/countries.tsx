import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button } from '../../components';
import { FilterPill } from './components';

import './countries.scss';

interface CountriesProps {

}

const T_KEY_PREFIX = 'countries.search.filters';

const Countries: FunctionComponent<CountriesProps> = (props: CountriesProps) => {
	const { t } = useTranslation();
	const [value, setValue] = useState('');
	const [filterName, setFilter] = useState('country name');
	const isLoading = false;
	const submitEvent = (e: any) => e.key === 'Enter' && handleSubmit();

	const handleChange = (e: any) => setValue(e.target.value);

	const handleSubmit = () => '';

	const selectFilter = (e: any) => {
		const id: string = e.target.id;

		if(filterName === id) {
			return;
		}
		
		setFilter(id)
	};

	const searchFilterMap = [
		{ title: t(`${ T_KEY_PREFIX }.country`) },
		{ title: t(`${ T_KEY_PREFIX }.countryCode`) },
		{ title: t(`${ T_KEY_PREFIX }.callingCode`) },
		{ title: t(`${ T_KEY_PREFIX }.capital`) },
		{ title: t(`${ T_KEY_PREFIX }.currency`) },
		{ title: t(`${ T_KEY_PREFIX }.language`) },
		{ title: t(`${ T_KEY_PREFIX }.region`) },
		{ title: t(`${ T_KEY_PREFIX }.subRegion`) }
	];

	const filters: ReactNode = (
		<div className='filters'>
			{
				searchFilterMap.map(
					(filter: any) =>
						<FilterPill onClick={ selectFilter }
									key={ filter.title }
									title={ filter.title }
									isSelected={ filterName === filter.title }/>
				)
			}
		</div>
	);

	return (
		<div className='countries'>
			<div className='search-form'>
				<input className='search-input'
					   type='search'
					   placeholder={ t('countries.search.findCountry') + ` by ${ filterName }` }
					   onKeyPress={ submitEvent }
					   value={ value }
					   onChange={ handleChange }/>
				<Button type='button'
						className={ cn('search-button', { 'disabled-btn': isLoading }) }
						onClick={ handleSubmit }
						disabled={ isLoading }
						name={ t('home.search.search') }/>
			</div>
			{ filters }
		</div>
	);
};

export default Countries;

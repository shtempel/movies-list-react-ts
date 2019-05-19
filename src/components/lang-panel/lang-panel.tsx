import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Locales } from '../../services';
import { setLocale } from '../../store/language/actions';
import { selectLocale } from '../../store/language/selectors';
import { selectIsLoading } from '../../store/movies/selectors';
import { GlobalState } from '../../store/store';

import './lang-panel.scss';

interface LangPanelProps {
    locale: string;
    isLoading: boolean;

    setLocale(locale: string): void;
}

const mapStateToProps = (state: GlobalState) => ({
    locale: selectLocale(state),
    isLoading: selectIsLoading(state)
});

const mapDispatchToProps = { setLocale };

const LangPanel: FunctionComponent<LangPanelProps> = (props: LangPanelProps) => {
    const { locale, setLocale, isLoading } = props;
    const { t } = useTranslation();

    const changeLocale = (e: any) => {
        if (e.target.id !== locale && !isLoading) {
            setLocale(e.target.id);
            window.location.reload();
        }
    };

    return (
        <div className='lang-panel row'>
            <span id={ Locales.en }
                  onClick={ changeLocale }
                  className={ cn('not-active', { 'active': locale === 'en-US' }) }>{ t('header.eng') }</span>
            <span id={ Locales.ru }
                  onClick={ changeLocale }
                  className={ cn('not-active', { 'active': locale === 'ru-RU' }) }>{ t('header.rus') }</span>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LangPanel);

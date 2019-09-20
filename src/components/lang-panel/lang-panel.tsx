import React, { FC } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { Languages } from '../../services';
import { GlobalState } from '../../store/interfaces';
import { setLanguage } from '../../store/language/actions';
import { selectLanguage } from '../../store/language/selectors';
import { selectIsLoading } from '../../store/movies/selectors';

import './lang-panel.scss';

const LangPanel: FC = () => {
    const { t } = useTranslation();
    const dispatch: Dispatch = useDispatch();
    const language = useSelector<GlobalState, string>(selectLanguage);
    const isLoading = useSelector<GlobalState, boolean>(selectIsLoading);
    const changeLanguage = (e: any): void => {
        if ( e.target.id !== language && !isLoading ) {
            dispatch({ type: getType(setLanguage), payload: e.target.id });
            window.location.reload();
        }
    };

    return (
        <div className='lang-panel row'>
            <span id={ Languages.en }
                  onClick={ changeLanguage }
                  className={ cn('not-active', { 'active': language === 'en-US' }) }>{ t('header.eng') }</span>
            <span id={ Languages.ru }
                  onClick={ changeLanguage }
                  className={ cn('not-active', { 'active': language === 'ru-RU' }) }>{ t('header.rus') }</span>
        </div>
    );
};

export default LangPanel;

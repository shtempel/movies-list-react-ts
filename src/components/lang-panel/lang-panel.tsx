import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Languages } from '../../services';
import { setLanguage } from '../../store/language/actions';
import { selectLanguage } from '../../store/language/selectors';
import { selectIsLoading } from '../../store/movies/selectors';
import { GlobalState } from '../../store/interfaces';

import './lang-panel.scss';

interface LangPanelProps {
    language: string;
    isLoading: boolean;

    setLanguage(language: string): void;
}

const mapStateToProps = (state: GlobalState) => ({
    language: selectLanguage(state),
    isLoading: selectIsLoading(state)
});

const mapDispatchToProps = { setLanguage };

const LangPanel: FunctionComponent<LangPanelProps> = (props: LangPanelProps) => {
    const { language, setLanguage, isLoading } = props;
    const { t } = useTranslation();

    const changeLanguage = (e: any) => {
        if (e.target.id !== language && !isLoading) {
            setLanguage(e.target.id);
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LangPanel);

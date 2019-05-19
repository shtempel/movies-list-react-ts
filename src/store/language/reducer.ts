import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { Locales } from '../../services/translation-service';

import { restoreSavedState } from '../saved-state/actions';
import * as actions from './actions';

export type LanguageAction =
    | ActionType<typeof actions>
    | ActionType<typeof restoreSavedState>;

export const initialState: string = Locales.en;

const reducer: Reducer<string, LanguageAction> = (state = initialState, action) => {
        switch (action.type) {
            case getType(actions.setLocale): {
                return action.payload;
            }
            case getType(restoreSavedState): {
                const { locale } = action.payload;
                return locale
            }
            default: {
                return state;
            }
        }
    }
;

export default reducer;

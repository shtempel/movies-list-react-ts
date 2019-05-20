import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { Languages } from '../../services';

import { restoreSavedState } from '../saved-state/actions';
import * as actions from './actions';

export type LanguageAction =
    | ActionType<typeof actions>
    | ActionType<typeof restoreSavedState>;

export const initialState: string = Languages.en;

const reducer: Reducer<string, LanguageAction> = (state = initialState, action) => {
        switch (action.type) {

            case getType(actions.setLanguage): {
                return action.payload;
            }

            case getType(restoreSavedState): {
                return action.payload.language
            }

            default: {
                return state;
            }
        }
    }
;

export default reducer;

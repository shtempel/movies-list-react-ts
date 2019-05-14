import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import {Common} from '../../constants/constants';

export type SearchByAction = ActionType<typeof actions>;
export type SearchBy = Common.Genres | Common.Title;

export const initialState: SearchBy = Common.Title;

const reducer: Reducer<string, SearchByAction> = (
    state = initialState, action) => {

    switch (action.type) {

        case getType(actions.setSearchBy): {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default reducer;

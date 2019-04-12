import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type SearchByAction = ActionType<typeof actions>;

export const initialState: string = 'title';

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

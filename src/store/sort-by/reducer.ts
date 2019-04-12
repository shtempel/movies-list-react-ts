import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type SortByAction = ActionType<typeof actions>;

export const initialState: string = 'date';

const reducer: Reducer<string, SortByAction> = (
    state = initialState, action) => {

    switch (action.type) {

        case getType(actions.setSortBy): {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default reducer;

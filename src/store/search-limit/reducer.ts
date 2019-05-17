import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';

export enum Amount {
    ten = '10',
    twenty = '20',
    thirty = '30',
}

export type SearchLimitAction = ActionType<typeof actions>;
export type SearchLimit = Amount;
export const initialState: string = Amount.ten;

const reducer: Reducer<string, SearchLimitAction> = (
    state = initialState, action) => {

    switch (action.type) {

        case getType(actions.setSearchLimit): {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default reducer;

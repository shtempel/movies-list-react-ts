import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actions';
import {Amount} from '../../components/results-amount-controller/results-amount-controller';

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

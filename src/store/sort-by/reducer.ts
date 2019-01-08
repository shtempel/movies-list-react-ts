import { Reducer } from 'redux';
import { Action } from '../store';
import { SortByActions, SortByActionType } from './actions';

export const initialState: string = 'date';

const reducer: Reducer<string, SortByActionType> = (
    state = initialState, action: SortByActionType) => {

    switch (action.type) {

        case SortByActions.SetSortBy: {
            const { payload: sortBy } = action as Action<string>;
            return sortBy;
        }

        default: {
            return state;
        }
    }
};

export default reducer;

import { Reducer } from 'redux';
import { Action } from '../store';
import { SearchByActions, SearchByActionType } from "./actions";

export const initialState: string = 'title';

const reducer: Reducer<string, SearchByActionType> = (
    state = initialState, action: SearchByActionType) => {

    switch (action.type) {

        case SearchByActions.SetSearchBy: {
            const { payload: searchBy } = action as Action<string>;
            return searchBy;
        }

        default: {
            return state;
        }
    }
};

export default reducer;

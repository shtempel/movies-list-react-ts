import * as selectors from './selectors';
import {GlobalState} from '../store';
import {Common} from '../../constants/constants';
import {SearchBy} from "./reducer";

describe('search-by selectors', () => {
    let state: GlobalState;

    const mutateSliceState = (
        rootState: GlobalState,
        change: Partial<SearchBy>
    ): GlobalState => ({
        ...rootState,
        searchBy: change
    });

    test('selectSearchBy selects search by', () => {
        const testState = mutateSliceState(state, Common.Genres);
        const actual = selectors.selectSearchBy(testState);

        expect(actual).toEqual(Common.Genres);
    });
});

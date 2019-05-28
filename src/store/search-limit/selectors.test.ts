import * as selectors from './selectors';
import { GlobalState } from '../store';
import { SearchLimit } from './reducer';
import { Amount } from '../../components/results-amount/results-amount-controller';

describe('search limit selectors', () => {
    let state: GlobalState;

    const mutateSliceState = (
        rootState: GlobalState,
        change: Partial<SearchLimit>
    ): GlobalState => ({
        ...rootState,
        searchLimit: change
    });

    test('selectSearchLimit selects search limit', () => {
        const testState = mutateSliceState(state, Amount.twenty);
        const actual = selectors.selectSearchLimit(testState);

        expect(actual).toEqual(Amount.twenty);
    });
});

import reducer, { initialState } from './reducer';
import { Amount } from '../../components/results-amount-controller/results-amount-controller';
import * as actions from './actions';

describe('search limit reducer', () => {
    test('returns the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });

    test('set search limit', () => {
        const expected: Amount = Amount.thirty;
        const actual = reducer(initialState, actions.setSearchLimit(Amount.thirty));

        expect(actual).toEqual(expected);
    });
});

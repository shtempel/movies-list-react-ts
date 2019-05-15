import reducer, { initialState, SortByEnum } from './reducer';
import * as actions from './actions';

describe('sort by reducer', () => {
    test('returns the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });

    test('set sort by', () => {
        const expected: SortByEnum = SortByEnum.Rating;
        const actual = reducer(initialState, actions.setSortBy(SortByEnum.Rating));

        expect(actual).toEqual(expected);
    });
});

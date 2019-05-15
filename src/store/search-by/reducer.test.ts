import reducer, { initialState, SearchBy } from './reducer';
import * as actions from './actions';
import { Common } from '../../constants/constants';

describe('search by reducer', () => {
    test('returns the initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });

    test('set search by', () => {
        const expected: SearchBy = Common.Genres;
        const actual = reducer(initialState, actions.setSearchBy(Common.Genres));

        expect(actual).toEqual(expected);
    });
});

import * as selectors from './selectors';
import {getRootReducer} from '../../jest/test-helpers';
import {RouterState} from 'connected-react-router';
import {GlobalState} from '../store';

describe('router selectors', () => {
    const rootReducer = getRootReducer();
    let state: GlobalState;

    const mutateSliceState = (
        rootState: GlobalState,
        change: Partial<RouterState>
    ): GlobalState => ({
        ...rootState,
        router: {
            ...rootState.router,
            ...change
        }
    });

    beforeEach(() => {
        state = rootReducer(undefined, {type: 'FAKE'});
    });

    test('selectCurrentPath selects current path', () => {
        const testState = mutateSliceState(state, {
            location: {
                hash: '',
                pathname: 'path',
                search: '',
                state: ''
            }
        });
        const actual = selectors.selectCurrentPath(testState);

        expect(actual).toEqual('path');

    });

    test('selectRouterSavedState selects saved state', () => {
        const testState = mutateSliceState(state, {
            location: { pathname: '/movies', search: '', hash: '', state: '' }
        });
        const actual = selectors.selectRouterSavedState(testState);

        expect(actual).toEqual({ location: { pathname: '/movies' } });
    });
});

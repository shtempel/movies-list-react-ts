import { itCreatesActionWithPayload } from '../../jest/test-helpers';
import * as actions from './actions';
import { Common } from '../../constants/constants';

describe('search-by actions', () => {
    itCreatesActionWithPayload('set search by', actions.setSearchBy, Common.Title);
});

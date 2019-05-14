import * as actions from './actions';

import {itCreatesActionWithPayload} from '../../jest/test-helpers';
import {SortByEnum} from './reducer';

describe('sort by actions', () => {
    itCreatesActionWithPayload('set sort by', actions.setSortBy, SortByEnum.Rating);
});

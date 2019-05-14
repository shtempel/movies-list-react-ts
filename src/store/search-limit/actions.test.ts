import * as actions from './actions';

import {itCreatesActionWithPayload} from '../../jest/test-helpers';
import {Amount} from '../../components/results-amount-controller/results-amount-controller';

describe('search limit actions', () => {
    itCreatesActionWithPayload('set search limit', actions.setSearchLimit, Amount.ten);
});

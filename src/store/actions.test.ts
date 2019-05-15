import * as actions from './actions';
import { itCreatesAction } from '../jest/test-helpers';

describe('store actions', () => {
    itCreatesAction('init', actions.init);
});

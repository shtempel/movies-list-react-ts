import { GlobalState } from '../store';

export const selectLocale = (state: GlobalState) => state.locale;

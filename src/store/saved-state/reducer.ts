export interface SavedState {
    appState: boolean;
}

export const initialState: SavedState = {
    appState: false
};

const reducer = (state = initialState, action: any): SavedState => {
    switch (action.type) {

        default: {
            return state;
        }
    }
};

export default reducer;

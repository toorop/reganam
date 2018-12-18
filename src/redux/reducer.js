import {SHOW_LOADER, HIDE_LOADER, SHOW_SNACKBAR, HIDE_SNACKBAR} from "./constants"

// todo ck region logout

const initialState = {
    // Loader
    loaderIsVisible: false,
    loaderMessage: '',

    // Snackbar
    snackbarIsVisible: false,
    snackbarMessage: '',
    snackbarLevel: '',

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loader
        case SHOW_LOADER:
            return {...state, loaderIsVisible: true, loaderMessage: action.msg}
        case HIDE_LOADER:
            return {...state, loaderIsVisible: false, loaderMessage: ''}

        // Snackbar
        case SHOW_SNACKBAR:
            return {...state, snackbarIsVisible: true, snackbarMessage: action.msg, snackbarLevel: action.level}
        case HIDE_SNACKBAR:
            return {...state, snackbarIsVisible: false, snackbarMessage: ''}

        default:
            return state
    }
}

export default rootReducer
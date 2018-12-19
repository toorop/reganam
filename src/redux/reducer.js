import {SHOW_LOADER, HIDE_LOADER, SHOW_SNACKBAR, HIDE_SNACKBAR, LOGOUT, SET_CLIENT_KEY, SET_REGION} from "./constants"
import user from '../models/User'

// todo ck region logout

const initialState = {
    // Loader
    loaderIsVisible: false,
    loaderMessage: '',

    // Snackbar
    snackbarIsVisible: false,
    snackbarMessage: '',
    snackbarLevel: '',

    // User
    clientKey: '',
    region: ''
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

        // User
        case SET_CLIENT_KEY:
            return {...state, clientKey: action.clientKey}
        case SET_REGION:
            return {...state, region: action.region}
        case LOGOUT:
            user.reset()
            return {...state, clientKey: '', region: ''}
        default:
            return state
    }
}

export default rootReducer
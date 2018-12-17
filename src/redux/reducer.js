import {SHOW_LOADER, HIDE_LOADER} from "./constants"

const initialState = {
    loaderIsVisible: false,
    loaderMessage: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loaderIsVisible: true, loaderMessage: action.msg}
        case HIDE_LOADER:
            return {...state, loaderIsVisible: false, loaderMessage: ''}
        default:
            return state
    }
}

export default rootReducer
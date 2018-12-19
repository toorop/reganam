import {SHOW_LOADER, HIDE_LOADER, HIDE_SNACKBAR, LOGOUT, SET_CLIENT_KEY, SET_REGION, SHOW_SNACKBAR} from "./constants"

// Loader
export const showLoader = (msg) => ({type: SHOW_LOADER, msg: msg})
export const hideLoader = () => ({type: HIDE_LOADER})

// Snackbar
export const showSnackbar = (msg, level) => ({type: SHOW_SNACKBAR, msg: msg, level: level})
export const hideSnackbar = () => ({type: HIDE_SNACKBAR})

// User
export const setClientKey = (clientKey) => ({type: SET_CLIENT_KEY, clientKey: clientKey})
export const setRegion = (region) => ({type: SET_REGION, region: region})
export const logout = () => ({type: LOGOUT})

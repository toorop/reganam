import {SHOW_LOADER, HIDE_LOADER, HIDE_SNACKBAR, SHOW_SNACKBAR} from "./constants"

export const showLoader = (msg) => ({type: SHOW_LOADER, msg: msg})
export const hideLoader = () => ({type: HIDE_LOADER})
export const showSnackbar = (msg, level) => ({type: SHOW_SNACKBAR, msg: msg, level: level})
export const hideSnackbar = () => ({type: HIDE_SNACKBAR})


import {SHOW_LOADER, HIDE_LOADER} from "./constants"

export const showLoader = (msg) => ({type: SHOW_LOADER, msg: msg})
export const hideLoader = () => ({type: HIDE_LOADER})


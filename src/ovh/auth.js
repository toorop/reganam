import store from '../redux/store'
import {hideLoader, showLoader, showSnackbar} from '../redux/actions'
import {accessRules} from './constants'
import getBaseClient from './baseClient'
import {defaultErrorMsg} from '../helpers/constants'
import user from '../models/User'

export const getNewClientToken = async () => {
    const {region} = store.getState()

    // get new credential token
    store.dispatch(showLoader('Requesting OVH for a "credentialToken"'))

    try {
        user.load()
        const r = await getCredentialToken(region)
        const {consumerKey, validationUrl} = r
        // we will be redirected to OVH so we need to keep CK and region in local storage
        user.setCk(consumerKey)
        user.setRegion(region)
        store.dispatch(showLoader('🚀 Hang your belt, you will be redirected to OVH for authentication 🚀'))
        setTimeout(() => window.location = validationUrl, 1000)
    } catch (e) {
        let userMsg = defaultErrorMsg
        if (e.response && e.response.data && e.response.data.message) userMsg = e.response.data.message
        else if (e.toString() !== '') userMsg = e.toString()
        store.dispatch(showSnackbar(userMsg, 'error'))
        store.dispatch(hideLoader())
    }
}

// return a token
const getCredentialToken = async () => {
    const {region} = store.getState()
    const payload = {
        'accessRules': accessRules,
        'redirection': window.location.origin
    }

    const client = getBaseClient(region)
    return client.post('auth/credential', payload)
        .then((response) => {
            return response.data
        })
}
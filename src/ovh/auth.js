import axios from 'axios'

import store from '../redux/store'
import {hideLoader, showLoader, showSnackbar} from '../redux/actions'
import {accessRules, keyRing, regionToEndPoint} from './constants'
import {defaultErrorMsg} from '../helpers/constants'
import user from '../models/User'

const getBaseClient = (region) => {
    return axios.create({
        baseURL: 'https://' + regionToEndPoint[region],
        headers: {
            'Accept': 'application/json',
            'X-Ovh-Application': keyRing.ak
        },
    })
}

export const getNewClientToken = async (region) => {
    // get new credential token
    console.log(user)
    store.dispatch(showLoader('Requesting OVH for a "credentialToken"'))

    try {
        user.load()
        const r = await getCredentialToken(region)
        console.log(r)
        const {consumerKey, validationUrl, state} = r
        user.setCk(consumerKey, state)
        store.dispatch(showLoader('🚀 Hang your belt, you will be redirected to OVH for authentication 🚀'))
        setTimeout(() => window.location = validationUrl, 2000)
    } catch (e) {
        let userMsg = defaultErrorMsg
        if (e.response && e.response.data && e.response.data.message) userMsg = e.response.data.message
        else if (e.toString() !== '') userMsg = e.toString()
        store.dispatch(showSnackbar(userMsg, 'error'))
        store.dispatch(hideLoader())
    }
}

const getCredentialToken = async (region) => {
    const payload = {
        'accessRules': accessRules,
        'redirection': 'http://localhost:3000/fromovh'
    }

    const client = getBaseClient(region)
    return client.post('auth/credential', payload)
        .then((response) => {
            return response.data
        })
}
import axios from 'axios'
import sha1 from 'sha1'

import store from '../../redux/store'
import {showSnackbar} from '../../redux/actions'

import {keyRing, regionToEndPoint} from '../constants'
import {defaultErrorMsg} from "../../helpers/constants"

const signRequest = (httpMethod, url, body, timestamp) => {
    const {clientKey, region} = store.getState()
    let s = [
        keyRing[region].as,
        clientKey,
        httpMethod,
        url,
        body || '',
        timestamp
    ]
    return '$1$' + sha1(s.join('+'))
}

let client = axios.create({
    headers: {
        'Accept': 'application/json',
    },
})

// Request interceptor
client.interceptors.request.use((config) => {
    const {clientKey, region, timeDrift} = store.getState()
    const now = Math.round(Date.now() / 1000) - timeDrift
    config.baseURL = 'https://' + regionToEndPoint[region]
    config.headers['X-Ovh-Application'] = keyRing[region].ak
    config.headers['X-Ovh-Consumer'] = clientKey
    config.headers['X-Ovh-Timestamp'] = now
    config.headers['X-Ovh-Signature'] = signRequest(
        config.method.toUpperCase(),
        config.baseURL + config.url,
        config.data || '',
        now
    )
    return config
}, (error) => {
    return Promise.reject(error)
})

client.interceptors.response.use((response) => {
    return response
}, (error) => {
    //console.log(error.response.data.errorCode)
    let userMsg = defaultErrorMsg
    let errorCode = null
    if (error.response && error.response.data) {
        // get errCode
        if (error.response.data.errorCode) errorCode = error.response.data.errorCode
        // get message
        if (error.response.data.message) userMsg = error.response.data.message
        else if (error.toString() !== '') userMsg = error.toString()
    }

    // switch errCode
    switch (errorCode) {
        case 'NOT_GRANTED_CALL' :
            userMsg = `${userMsg} -> logout and (re)login to update your token`
            break
        case 'NOT_CREDENTIAL':
            userMsg = `${userMsg} anymore -> logout and (re)login to get a new token`
            break
        default:
        // nothing
    }

    store.dispatch(showSnackbar(userMsg, 'error'))
    return Promise.reject(error)
})

export default client


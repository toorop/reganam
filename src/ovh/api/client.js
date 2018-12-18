import axios from 'axios'
import sha1 from 'sha1'

import store from '../../redux/store'
import {hideLoader, showLoader, showSnackbar} from '../../redux/actions'

import {keyRing, regionToEndPoint} from '../constants'
import user from '../../models/User'
import {defaultErrorMsg} from "../../helpers/constants"

// todo handle err

user.load()

const signRequest = (httpMethod, url, body, timestamp) => {
    let s = [
        keyRing[user.region].as,
        user.ck,
        httpMethod,
        url,
        body || '',
        timestamp
    ]
    return '$1$' + sha1(s.join('+'))
}

const client = axios.create({
    baseURL: 'https://' + regionToEndPoint[user.region],
    headers: {
        'Accept': 'application/json',
        'X-Ovh-Application': keyRing[user.region].ak,
        'X-Ovh-Consumer': user.ck
    }
})

// Request interceptor
client.interceptors.request.use((config) => {
    store.dispatch(showLoader('Requesting OVH API'))
    const now = Math.round(Date.now() / 1000)
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
    let userMsg = defaultErrorMsg
    if (error.response && error.response.data && error.response.data.message) userMsg = error.response.data.message
    else if (error.toString() !== '') userMsg = error.toString()
    store.dispatch(showSnackbar(userMsg, 'error'))
    store.dispatch(hideLoader())
    return Promise.reject(error)
})
export default client


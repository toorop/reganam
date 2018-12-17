import axios from 'axios'

import store from '../redux/store'
import {hideLoader, showLoader, showSnackbar} from "../redux/actions"
import {accessRules, keyRing, regionToEndPoint} from "./constants"

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
    store.dispatch(showLoader('Requesting OVH for a "credentialToken"'))
    try {

        const r = await getCredentialToken(region)
        console.log(r)
        const {consumerKey, validationUrl} = r

        // todo redux consumerKey

        console.log(validationUrl)
        store.dispatch(showLoader('Hang your belt, you will be redirected to OVH to be authenticated 🚀'))
    }
    catch (e) {
        console.log(e.response.data.message)
        store.dispatch(showSnackbar(e.response.data.message, 'error'))
        store.dispatch(hideLoader())
    }
    // redirect to validationURL

}

const getCredentialToken = async (region) => {
    const payload = {
        'accesRules': accessRules,
        'redirection': 'http://localhost:3000/fromovh'
    }

    const client = getBaseClient(region)
    return client.post('auth/credential', payload)
        .then((response) => {
            return response.data
        })
}
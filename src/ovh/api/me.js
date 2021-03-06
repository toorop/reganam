import client from './client'
import {cacheGet, cacheSet} from '../../helpers/cache'

// get me return user info
export const getMe = async () => {
    const r = await client.get('/me')
    return r.data
}

// return array off all credentials
export const getCredentials = async () => {
    const r = await client.get('/me/api/credential')
    return r.data
}

// return credential info
export const getCredentialInfo = async (credentialId) => {
    const key = 'credential-' + credentialId
    let credentialInfo = cacheGet(key)
    if (credentialInfo === null) {
        const r = await client.get(`/me/api/credential/${credentialId}`)
        credentialInfo = r.data
        cacheSet(key, credentialInfo)
    }
    return credentialInfo
}

// delete credential
export const deleteCredential = async (credentialId) => {
    await client.delete(`/me/api/credential/${credentialId}`)
}

// return app info
export const getAppInfo = async (credentialId) => {
    const key = 'appinfo-' + credentialId
    let appInfo = cacheGet(key)
    if (appInfo === null) {
        const r = await client.get(`/me/api/credential/${credentialId}/application`)
        appInfo = r.data
        cacheSet(key, appInfo)
    }
    return appInfo
}

// Billing

// get bills
export const getBills = async (from, to) => {
    from = encodeURI(new Date(from).toISOString())
    to = encodeURI(new Date(to).toISOString())
    const r = await client.get(`/me/bill?date.from=${from}&date.to=${to}`)
    return r.data
}

// get bill
export const getBill = async (id) => {
    const key = 'billinfo-' + id
    let billInfo = cacheGet(key)
    if (billInfo === null) {
        const r = await client.get(`/me/bill/${id}`)
        billInfo = r.data
        cacheSet(key, billInfo)
    }
    return billInfo
}
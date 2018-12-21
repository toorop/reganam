import client from './client'


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

export const getCredentialInfo = async (credentialID) => {
    const r = await client.get(`/me/api/credential/${credentialID}`)
    return r.data
}

export const getAppInfo = async (credentialID) => {
    const r = await client.get(`/me/api/credential/${credentialID}/application`)
    return r.data

}


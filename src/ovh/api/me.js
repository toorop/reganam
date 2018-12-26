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

// return credential info
export const getCredentialInfo = async (credentialId) => {
    const r = await client.get(`/me/api/credential/${credentialId}`)
    return r.data
}

// delete credential
export const deleteCredential = async (credentialId) => {
    await client.delete(`/me/api/credential/${credentialId}`)
}

// return app info
export const getAppInfo = async (credentialId) => {
    const r = await client.get(`/me/api/credential/${credentialId}/application`)
    return r.data

}


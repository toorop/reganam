import client from './client'

export const getCurrentCredential = () => {
    return client.get('/auth/currentCredential')
}

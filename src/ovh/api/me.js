import client from './client'

export const getMe = async () => {
    const r = await client.get('/me')
    return r.data
}

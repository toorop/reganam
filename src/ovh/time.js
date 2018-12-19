import getBaseClient from './baseClient'

export const getTimeDrift = async (region) => {
    const client = getBaseClient(region)
    client.get('auth/time')
        .then(ts => {
                console.log('time')
                console.log(ts)
            }
        )
}
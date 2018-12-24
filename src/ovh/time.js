import store from '../redux/store'
import {setTimeDrift} from '../redux/actions'
import getBaseClient from './baseClient'

export const getTimeDrift = async (region) => {
    const client = getBaseClient(region)
    const response = await client.get('auth/time')
    if (typeof response.data !== "undefined") {
        store.dispatch(setTimeDrift(Math.round(Date.now() / 1000 - response.data)))
    }
}
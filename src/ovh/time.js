import store from '../redux/store'
import {setTimeDrift} from '../redux/actions'
import getBaseClient from './baseClient'

export const getTimeDrift = async (region) => {
    const client = getBaseClient(region)
    client.get('auth/time')
        .then(response => {
                if (typeof response.data !== "undefined") {
                    store.dispatch(setTimeDrift(Math.round(Date.now() / 1000 - response.data)))
                }
            }
        )
}
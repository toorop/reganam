import axios from "axios"
import {keyRing, regionToEndPoint} from "./constants"

const getBaseClient = (region) => {
    return axios.create({
        baseURL: 'https://' + regionToEndPoint[region],
        headers: {
            'Accept': 'application/json',
            'X-Ovh-Application': keyRing[region].ak
        },
    })
}

export default getBaseClient
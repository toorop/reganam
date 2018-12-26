import sha1 from 'sha1'

const store = sessionStorage

// get form cache
export const cacheGet = (key) => {
    let cached =  store.getItem(sha1(key))
    cached= JSON.parse(cached)
    if (cached != null && (cached.expireAt ===0 || new Date(cached.expireAt) < Date.now())){
        return cached.value
    } else {
        store.removeItem(key)
    }
    return null
}

// set in cache
export const cacheSet = (key, value, expiration=0) => {
    const cached = {
        expireAt: expiration===0 ? 0 : Date.now() + expiration*1000,
        value: value
    }
    store.setItem(sha1(key), JSON.stringify(cached))
}



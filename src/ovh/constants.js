export const regionToEndPoint = {
    'ovh-eu': 'eu.api.ovh.com/1.0',
    'ovh-us': 'api.us.ovhcloud.com/1.0',
    'ovh-ca': 'ca.api.ovh.com/1.0'
}

export const keyRing = {
    'ak': 'RNl3SvWi3zUpiPVY',
    'as': 'iPf8ty2F0wjuNhcZYpRMini78v6kjeUZ'
}

export const accessRules = [
    {
        'method': 'POST',
        'path': '/auth/*'
    },
    {
        'method': 'GET',
        'path': '/auth/*'
    }
]


export const regionToEndPoint = {
    'ovh-eu': 'eu.api.ovh.com/1.0',
    'ovh-us': 'api.us.ovhcloud.com/1.0',
    'ovh-ca': 'ca.api.ovh.com/1.0'
}

export const keyRing = {
    'ovh-eu': {
        'ak': 'RNl3SvWi3zUpiPVY',
        'as': 'iPf8ty2F0wjuNhcZYpRMini78v6kjeUZ'
    },
    'ovh-us': {
        'ak': 'dEpqIVMadS8nnTVB',
        'as': 'oIiRx2f8zcH285UztMbgNOGR1zP7V77O'
    },
    'ovh-ca': {
        'ak': 'KYWEGSQQIkIxYxdu',
        'as': 'MwxR6co0FCur4qsim0e2JiQK9khvaeJK'
    },
}

export const accessRules = [
    {
        'path': '/auth/*',
        'method': 'POST'
    }, {
        'path': '/auth/*',
        'method': 'GET'
    }, {
        'path': '/me',
        'method': 'GET'
    }, {
        'path': '/me/*',
        'method': 'GET'
    }
]


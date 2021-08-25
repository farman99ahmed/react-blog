const AuthHeader = () => {
    return ({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
}

const ImageHeader = (token) => {
    return ({
        'mimeType': '',
        'x-access-token': token
    })
}

const JWTHeader = (token) => {
    return ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
    })
}

export {
    AuthHeader,
    ImageHeader,
    JWTHeader
}
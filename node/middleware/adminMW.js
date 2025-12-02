const jwt = require('jsonwebtoken')

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).send('unauthorized')
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_PSWD,
        (err, decode) => {
            if (err || decode.role !== 'admin')
                res.status(401).send("forbidden")
            req.body = decode
            next()
        }
    )

}

module.exports = verifyJwt
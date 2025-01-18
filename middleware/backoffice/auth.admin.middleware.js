import { AdminToken } from '../../database/index.js'
import jwt from 'jsonwebtoken'

const authAdminMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.send("You are not authorization.")
    }
    let token = req.headers.authorization.split(' ')
    if (!token || token.length < 2 || token[0] !== "Bearer") {
        return res.send("You are not authorization.")
    }
    token = token[1]
    const checkToken = await AdminToken.findOne({
        where: {
            token: token
        }
    })
    if(!checkToken) {
        return res.send("You are not authorization.")
    }
    req.auth = jwt.decode(token)
    next()
}

export default authAdminMiddleware
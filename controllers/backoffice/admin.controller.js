import { Op } from "sequelize";
import { Admin, AdminToken } from "../../database/index.js";
import jwt from 'jsonwebtoken'

export const adminControllers = {
    async getAll (req, res) {
        try {
            const admin = await Admin.findAll()
            res.send(admin)
        } catch (error) {
            res.error(error)
        }
    },

    async adminCreate () {
        try {
            await Admin.create({
                username: 'admin',
                password: '12345'
            })
            console.log('SUCCESS')
        } catch (error) {
            console.log(error)
        }
    },

    async adminLogin (req, res) {
        try {
            const { username, password } = req.body.data
            const admin = await Admin.findOne({
                where: {
                    [Op.and] : [{username: username}, {password: password}] 
                }
            })
            if(!admin) {
                return res.status(400).send("Username or Password is incorrect")
            }

            const adminLogin = await AdminToken.findOne({
                where: {
                    username: admin.username
                }
            })
            if(adminLogin) {
                return res.send({ data: adminLogin.token})
            }
            
            const token = jwt.sign({ id: admin.id, username: admin.username}, 'adminBitShop999', { algorithm: 'HS256' })
            await AdminToken.create({
                adminId: admin.id,
                username: admin.username,
                token: token
            })

            return res.send({ data: token})
        } catch (error) {
            console.log(error)
        }
    }
}
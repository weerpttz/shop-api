import { User, SessionToken } from "../database/index.js"
import { Op } from 'sequelize'
import { hash, verify } from '@node-rs/bcrypt'
import jwt from 'jsonwebtoken'


export const userControllers = {
    async getAll (req, res) {
        try {
            const user = await User.findAll()
            res.send(user)
        } catch (error) {
            res.error(error)
        }
    },
    
    async getById (req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.send("You are not authorization.")
            }
            if (user.id.toString() === req.auth.id.toString() && user.id.toString() === req.params.id.toString()) {
                const userResponse = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phoneNumber: user.phone_number,
                    birthDate: user.birth_date,
                    country: user.country
                }
                res.send(userResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    },

    async onRegister (req, res) {
        try {
            const { username, password, email, firstName, lastName, phoneNumber, birthDate, country  } = req.body.data
            if (username.length < 8 || password.length < 8 ) {
                return res.status(400).send("Username or Password is misformat")
            }
            if (email.length < 10) {
                return res.status(400).send("Email is misformat")
            }
            
            const user = await User.findOne({ 
                where: {
                    [Op.or] : [{username: username}, {email: email}],
                },
            })
            if (user) {
                return res.status(400).send("Username or Email is already exist")
            }

            const hashedPassword = await hash(password.normalize("NFKC"), 10)

            await User.create({
                username,
                password: hashedPassword,
                email,
                firstName: firstName ?? '', 
                lastName: lastName ?? '',
                phoneNumber: phoneNumber ?? '',
                birthDate: birthDate ?? '',
                country: country ?? '',
                updateBy,
                deleteBy
            })
            res.send('REGISTER SUCCESS')
        } catch (error) {
            res.error(error)
        }
    },

    async onLogin (req, res) {
        try {
            const { username, password } = req.body.data
            if (username.length < 8 || password.length < 8 ) {
                return res.status(400).send("Username or Password is misformat")
            }

            const user = await User.findOne({ 
                where: {
                    username: username
                }
            })
            if(!user) {
                return res.status(400).send("Username or Password is incorrect")
            }

            const verifiedPassword = await verify(password.normalize("NFKC"), user.password)
            if(!verifiedPassword){
                return res.status(400).send("Username or Password is incorrect")
            }
            const userLogin = await SessionToken.findOne({
                where: {
                    username: user.username
                }
            })
            if(userLogin) {
                return res.send({ data: userLogin.token})
            }
            
            const token = jwt.sign({ id: user.id, username: user.username}, 'tWeepPim66789', { algorithm: 'HS256' })
            await SessionToken.create({
                userId: user.id,
                username: user.username,
                token: token
            })

            return res.send({ data: token})
        } catch (error) {
            res.error(error)
        }
    },

    async onLogout (req, res) {
        try {
            const delToken = await SessionToken.findOne({
                where: {
                    userId: req.auth.id
                }
            })
            if (delToken) {
                delToken.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            delToken.save()
            res.send("LOGOUT")
        } catch (error) {
            res.error(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.send("You are not authorization.")
            }
            if(user.id.toString() === req.auth.id.toString() && user.id.toString() === req.params.id.toString()) {
                user.firstName = req.body.firstName
                user.lastName = req.body.lastName
                user.phoneNumber = req.body.phoneNumber
                user.birthDate = req.body.birthDate
                user.country = req.body.country
                user.updateBy = req.auth.id
            } else {
                return res.send("You are not authorization.")
            }
            user.save()
            res.send('EDIT SUCCESS')
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            if (!user) {
                return res.send("You are not authorization.")
            }
            if(user.id.toString() === req.auth.id.toString() && user.id.toString() === req.params.id.toString()) {
                user.deleteBy = req.auth.id
                user.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            user.save()
            res.send('DELETE SUCCESS')
        } catch (error) {
            res.error(error)
        }
    },

    async sessionToken (req, res) {
        try {
            const session = await SessionToken.findAll()
            res.send(session)
        } catch (error) {
            res.error(error)
        }
    }
}
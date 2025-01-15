import { User, Session_Token } from "../database/index.js"
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
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone_number: user.phone_number,
                    birth_date: user.birth_date,
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
            const { username, password, email, first_name, last_name, phone_number, birth_date, country  } = req.body.data
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
                first_name: first_name ?? '', 
                last_name: last_name ?? '',
                phone_number: phone_number ?? '',
                birth_date: birth_date ?? '',
                country: country ?? ''
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
            const userLogin = await Session_Token.findOne({
                where: {
                    username: user.username
                }
            })
            if(userLogin) {
                return res.send({ data: userLogin.token})
            }
            
            const token = jwt.sign({ id: user.id, username: user.username}, 'tWeepPim66789', { algorithm: 'HS256' })
            await Session_Token.create({
                user_id: user.id,
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
            const delToken = await Session_Token.findOne({
                where: {
                    user_id: req.auth.id
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
                user.first_name = req.body.first_name
                user.last_name = req.body.last_name
                user.phone_number = req.body.phone_number
                user.birth_date = req.body.birth_date
                user.country = req.body.country
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
            const session = await Session_Token.findAll()
            res.send(session)
        } catch (error) {
            res.error(error)
        }
    }
}
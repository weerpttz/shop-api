import { Address } from "../database/index.js"

export const addressControllers = {
    async getAll (req, res) {
        try {
            const address = await Address.findAll()
            res.send(address)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const address = await Address.findByPk(req.params.id)
            if (!address) {
                return res.send("You are not authorization.")
            }
            if (address.user_id.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                const addressResponse = {
                    id: address.id,
                    user_id: address.user_id,
                    first_name: address.first_name,
                    last_name: address.last_name,
                    phone_number: address.phone_number,
                    address: address.address,
                    sub_district: address.sub_district,
                    district: address.district,
                    province: address.province,
                    country: address.country,
                    zip_code: address.zip_code
                }
                res.send(addressResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    },

    async onCreate (req, res) {
        try {
            const { first_name, last_name, phone_number, address, sub_district, district, province, country, zip_code } = req.body.data
            await Address.create({
                user_id: req.auth.id,
                first_name,
                last_name,
                phone_number,
                address,
                sub_district,
                district,
                province,
                country,
                zip_code
            })
            res.send("CREATE ADDRESS")
        } catch (error) {
            res.error(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const address = await Address.findByPk(req.params.id)
            if (!address) {
                return res.send("You are not authorization.")
            }
            if(address.user_id.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                address.first_name = req.body.first_name
                address.last_name = req.body.last_name
                address.phone_number = req.body.phone_number
                address.address = req.body.address
                address.sub_district = req.body.sub_district
                address.district = req.body.district
                address.province = req.body.province
                address.country = req.body.country
                address.zip_code = req.body.zip_code
            } else {
                return res.send("You are not authorization.")
            }
            address.save()
            res.send("EDIT ADDRESS")
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const address = await Address.findByPk(req.params.id)
            if (!address) {
                return res.send("You are not authorization.")
            }
            if(address.user_id.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                address.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            address.save()
            res.send("DELETE ADDRESS")
        } catch (error) {
            res.error(error)
        }
    }
}
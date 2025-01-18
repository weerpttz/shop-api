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
            if (address.userId.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                const addressResponse = {
                    id: address.id,
                    userId: address.userId,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    phoneNumber: address.phoneNumber,
                    address: address.address,
                    subDistrict: address.subDistrict,
                    district: address.district,
                    province: address.province,
                    country: address.country,
                    zipCode: address.zipCode
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
            const { firstName, lastName, phoneNumber, address, subDistrict, district, province, country, zipCode } = req.body.data
            await Address.create({
                userId: req.auth.id,
                firstName,
                lastName,
                phoneNumber,
                address,
                subDistrict,
                district,
                province,
                country,
                zipCode,
                updateBy,
                deleteBy
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
            if(address.userId.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                address.firstName = req.body.firstName
                address.lastName = req.body.lastName
                address.phoneNumber = req.body.phoneNumber
                address.address = req.body.address
                address.subDistrict = req.body.subDistrict
                address.district = req.body.district
                address.province = req.body.province
                address.country = req.body.country
                address.zipCode = req.body.zipCode
                address.updateBy = req.auth.id
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
            if(address.userId.toString() === req.auth.id.toString() && address.id.toString() === req.params.id.toString()) {
                address.deleteBy = req.auth.id
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
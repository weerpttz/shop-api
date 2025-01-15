import { Address, Order, Shipping } from "../database/index.js";

export const shippingControllers = {
    async getAll (req, res) {
        try {
            const shipping = await Shipping.findAll()
            res.send(shipping)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const shipping = await Shipping.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!shipping) {
                return res.send("You are not authorization.")
            }
            if (order.createBy.toString() === req.auth.id.toString() && shipping.id.toString() === req.params.id.toString()) {
                const shippingResponse = {
                    id: shipping.id,
                    order_id: shipping.order.id,
                    address_id: shipping.address.id,
                    address_first_name: shipping.address.first_name,
                    address_last_name: shipping.address.last_name,
                    address_phone_number: shipping.address.phone_number,
                    address_address: shipping.address.address,
                    address_sub_district: shipping.address.sub_district,
                    address_district: shipping.address.district,
                    address_province: shipping.address.province,
                    address_country: shipping.address.country,
                    address_zip_code: shipping.address.zip_code,
                    shipping_status: shipping.shipping_status,
                    shipping_type: shipping.shipping_type
                }
                res.send(shippingResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    },

    async onCreate (req, res) {
        try {
            const { shipping_status, shipping_type } = req.body.data
            const order = await Order.findByPk(req.params.id)
            const address = await Address.findByPk(req.params.id)
            await Shipping.create({
                order_id: order.id,
                address_id: address.id,
                address_first_name: address.first_name,
                address_last_name: address.last_name,
                address_phone_number: address.phone_number,
                address_address: address.address,
                address_sub_district: address.sub_district,
                address_district: address.district,
                address_province: address.province,
                address_country: address.country,
                address_zip_code: address.zip_code,
                shipping_status,
                shipping_type
            })
            res.send("CREATE SHIPPING")
        } catch (error) {
            res.error(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const shipping = await Shipping.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!shipping) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && shipping.id.toString() === req.params.id.toString()) {
                shipping.shipping_status = req.body.shipping_status
                shipping.shipping_type = req.body.shipping_type
            } else {
                return res.send("You are not authorization.")
            }
            shipping.save()
            res.send("EDIT ORDER")
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const shipping = await Shipping.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!shipping) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && shipping.id.toString() === req.params.id.toString()) {
                shipping.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            shipping.save()
            res.send("DELETE ORDER")
        } catch (error) {
            res.error(error)
        }
    }
}
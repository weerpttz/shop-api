import { Order } from "../database/index.js";

export const orderControllers = {
    async getAll (req, res) {
        try {
            const order = await Order.findAll()
            res.send(order)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                return res.send("You are not authorization.")
            }
            if (order.createBy.toString() === req.auth.id.toString() && order.id.toString() === req.params.id.toString()) {
                const orderResponse = {
                    id: order.id,
                    discount: order.discount,
                    orderStatus: order.orderStatus,
                    createBy: order.createBy
                }
                res.send(orderResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    },

    async onCreate (req, res) {
        try {
            const { discount, orderStatus } = req.body.data
            await Order.create({
                discount,
                orderStatus,
                createBy: req.auth.id
            })
            res.send("CREATE ORDER")
        } catch (error) {
            res.error(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && order.id.toString() === req.params.id.toString()) {
                order.discount = req.body.discount,
                order.orderStatus = req.body.orderStatus
            } else {
                return res.send("You are not authorization.")
            }
            order.save()
            res.send("EDIT ORDER")
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && order.id.toString() === req.params.id.toString()) {
                order.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            order.save()
            res.send("DELETE ORDER")
        } catch (error) {
            res.error(error)
        }
    }
}
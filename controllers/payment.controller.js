import { Order, Payment } from "../database/index.js";

export const paymentControllers = {
    async getAll (req, res) {
        try {
            const payment = await Payment.findAll()
            res.send(payment)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!payment) {
                return res.send("You are not authorization.")
            }
            if (order.createBy.toString() === req.auth.id.toString() && payment.id.toString() === req.params.id.toString()) {
                const paymentResponse = {
                    id: payment.id,
                    orderId: payment.orderId,
                    totalPrice: payment.totalPrice,
                    paymentMethod: payment.paymentMethod,
                    paidAmount: payment.paidAmount,
                    paidDate: payment.paidDate,
                    slip: payment.slip,
                    paymentStatus: payment.paymentStatus
                }
                res.send(paymentResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    },

    async onCreate (req, res) {
        try {
            const { totalPrice, paymentMethod, paidAmount, paidDate, slip, paymentStatus } = req.body.data
            const order = await Order.findByPk(req.params.id)
            await Payment.create({
                orderId: order.id,
                totalPrice,
                paymentMethod,
                paidAmount,
                paidDate,
                slip,
                paymentStatus
            })
            res.send("CREATE PAYMENT")
        } catch (error) {
            res.error(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!payment) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && payment.id.toString() === req.params.id.toString()) {
                payment.totalPrice = req.body.totalPrice,
                payment.paymentMethod = req.body.paymentMethod,
                payment.paidAmount = req.body.paidAmount,
                payment.paidDate = req.body.paidDate,
                payment.slip = req.body.slip,
                payment.paymentStatus = req.body.paymentStatus
            } else {
                return res.send("You are not authorization.")
            }
            payment.save()
            res.send("EDIT ORDER")
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id)
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                return res.send("You are not authorization.")
            }
            if(order.createBy.toString() === req.auth.id.toString() && payment.id.toString() === req.params.id.toString()) {
                payment.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            payment.save()
            res.send("DELETE ORDER")
        } catch (error) {
            res.error(error)
        }
    }
}
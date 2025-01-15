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
                    order_id: payment.order_id,
                    total_price: payment.total_price,
                    payment_method: payment.payment_method,
                    paid_amount: payment.paid_amount,
                    paid_date: payment.paid_date,
                    slip: payment.slip,
                    payment_status: payment.payment_status
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
            const { total_price, payment_method, paid_amount, paid_date, slip, payment_status } = req.body.data
            const order = await Order.findByPk(req.params.id)
            await Payment.create({
                order_id: order.id,
                total_price,
                payment_method,
                paid_amount,
                paid_date,
                slip,
                payment_status
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
                payment.total_price = req.body.total_price,
                payment.payment_method = req.body.payment_method,
                payment.paid_amount = req.body.paid_amount,
                payment.paid_date = req.body.paid_date,
                payment.slip = req.body.slip,
                payment.payment_status = req.body.payment_status
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
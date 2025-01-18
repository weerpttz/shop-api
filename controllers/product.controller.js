import { Product } from "../database/index.js";

export const productControllers = {
    async getAll (req, res) {
        try {
            const product = await Product.findAll()
            res.send(product)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            if (!product) {
                return res.send("You are not authorization.")
            }
            if (product.id.toString() === req.params.id.toString()) {
                const productResponse = {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price,
                    createBy: product.createBy
                }
                res.send(productResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    }
}
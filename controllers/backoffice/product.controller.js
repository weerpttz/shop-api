import { Category, Product } from "../../database/index.js"

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
    },

    async onCreate (req, res) {
        try {
            const { name, image, description, quantity, price } = req.body.data
            await Product.create({
                name,
                image,
                description,
                quantity,
                price,
                createBy: req.auth.id
            })
            res.send("CREATE PRODUCT")
        } catch (error) {
            console.log(error)
        }
    },

    async onUpdate (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            if (!product) {
                return res.send("You are not authorization.")
            }
            if(product.createBy.toString() === req.auth.id.toString() && product.id.toString() === req.params.id.toString()) {
                product.name = req.body.name,
                product.image = req.body.image,
                product.description = req.body.description,
                product.quantity = req.body.quantity,
                product.price = req.body.price
                product.updateBy = req.auth.id
            } else {
                return res.send("You are not authorization.")
            }
            product.save()
            res.send("EDIT PRODUCT")
        } catch (error) {
            res.error(error)
        }
    },

    async onDelete (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            if (!product) {
                return res.send("You are not authorization.")
            }
            if(product.createBy.toString() === req.auth.id.toString() && product.id.toString() === req.params.id.toString()) {
                product.deleteBy = req.auth.id
                product.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            product.save()
            res.send("DELETE PRODUCT")
        } catch (error) {
            res.error(error)
        }
    }
}
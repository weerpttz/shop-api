import { Category } from "../database/index.js";

export const categoryControllers = {
    async getAll (req, res) {
        try {
            const category = await Category.findAll()
            res.send(category)
        } catch (error) {
            res.error(error)
        }
    },

    async getById (req, res) {
        try {
            const category = await Category.findByPk(req.params.id)
            if (!category) {
                return res.send("You are not authorization.")
            }
            if (category.id.toString() === req.params.id.toString()) {
                const categoryResponse = {
                    id: category.id,
                    name: category.name
                }
                res.send(categoryResponse)
            } else {
                return res.send("You are not authorization.")
            }
        } catch (error) {
            res.error(error)
        }
    }
}
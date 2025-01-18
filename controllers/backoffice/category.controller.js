import { Category } from "../../database/index.js";

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
    },

    async onCreate (req, res) { //For Admin
        try {
            const { name } = req.body.data
            await Category.create({
                name,
                createBy: req.auth.id
            })
            res.send("CREATE CATEGORY")
        } catch (error) {
            console.log(error)
        }
    },

    async onUpdate (req, res) { //For Admin
        try {
            const category = await Category.findByPk(req.params.id)
            if (!category) {
                return res.send("You are not authorization.")
            }
            if(category.createBy.toString() === req.auth.id.toString() && category.id.toString() === req.params.id.toString()) {
                category.name = req.body.name
                category.updateBy = req.auth.id
            } else {
                return res.send("You are not authorization.")
            }
            category.save()
            res.send("EDIT CATEGORY")
        } catch (error) {
            console.log(error)
        }
    },

    async onDelete (req, res) { //For Admin
        try {
            const category = await Category.findByPk(req.params.id)
            if (!category) {
                return res.send("You are not authorization.")
            }
            if(category.createBy.toString() === req.auth.id.toString() && category.id.toString() === req.params.id.toString()) {
                category.deleteBy = req.auth.id
                category.destroy()
            } else {
                return res.send("You are not authorization.")
            }
            category.save()
            res.send("DELETE CATEGORY")
        } catch (error) {
            res.error(error)
        }
    }
}
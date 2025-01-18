import { categoryControllers } from "../../controllers/category.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/category',
        method: 'get',
        middleware: authMiddleware,
        controller: categoryControllers.getAll
    },
    {
        endpoint: '/category/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: categoryControllers.getById
    }
]
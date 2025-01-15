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
        endpoint: '/category',
        method: 'post',
        middleware: authMiddleware,
        controller: categoryControllers.onCreate
    },
    {
        endpoint: '/category/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: categoryControllers.getById
    },
    {
        endpoint: '/category/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: categoryControllers.onUpdate
    },
    {
        endpoint: '/category/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: categoryControllers.onDelete
    }
]
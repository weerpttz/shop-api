import { productControllers } from "../../controllers/product.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/product',
        method: 'get',
        middleware: authMiddleware,
        controller: productControllers.getAll
    },
    {
        endpoint: '/product',
        method: 'post',
        middleware: authMiddleware,
        controller: productControllers.onCreate
    },
    {
        endpoint: '/product/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: productControllers.getById
    },
    {
        endpoint: '/product/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: productControllers.onUpdate
    },
    {
        endpoint: '/product/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: productControllers.onDelete
    }
]
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
        endpoint: '/product/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: productControllers.getById
    }
]
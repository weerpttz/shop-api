import { orderControllers } from "../../controllers/order.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/order',
        method: 'get',
        middleware: authMiddleware,
        controller: orderControllers.getAll
    },
    {
        endpoint: '/order',
        method: 'post',
        middleware: authMiddleware,
        controller: orderControllers.onCreate
    },
    {
        endpoint: '/order/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: orderControllers.getById
    },
    {
        endpoint: '/order/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: orderControllers.onUpdate
    },
    {
        endpoint: '/order/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: orderControllers.onDelete
    }
]
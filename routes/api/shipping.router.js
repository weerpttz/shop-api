import { shippingControllers } from "../../controllers/shipping.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/shipping',
        method: 'get',
        middleware: authMiddleware,
        controller: shippingControllers.getAll
    },
    {
        endpoint: '/shipping',
        method: 'post',
        middleware: authMiddleware,
        controller: shippingControllers.onCreate
    },
    {
        endpoint: '/shipping/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: shippingControllers.getById
    },
    {
        endpoint: '/shipping/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: shippingControllers.onUpdate
    },
    {
        endpoint: '/shipping/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: shippingControllers.onDelete
    }
]
import { paymentControllers } from "../../controllers/payment.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/payment',
        method: 'get',
        middleware: authMiddleware,
        controller: paymentControllers.getAll
    },
    {
        endpoint: '/payment',
        method: 'post',
        middleware: authMiddleware,
        controller: paymentControllers.onCreate
    },
    {
        endpoint: '/payment/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: paymentControllers.getById
    },
    {
        endpoint: '/payment/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: paymentControllers.onUpdate
    },
    {
        endpoint: '/payment/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: paymentControllers.onDelete
    }
]
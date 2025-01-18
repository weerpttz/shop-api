import { adminControllers } from "../../../controllers/backoffice/admin.controller.js";
import { categoryControllers } from "../../../controllers/backoffice/category.controller.js";
import { productControllers } from "../../../controllers/backoffice/product.controller.js";
import authAdminMiddleware from "../../../middleware/backoffice/auth.admin.middleware.js";

export default [
    {
        endpoint: '/login',
        method: 'post',
        controller: adminControllers.adminLogin
    },
    {
        endpoint: '/',
        method: 'get',
        middleware: authAdminMiddleware,
        controller: adminControllers.getAll
    },
    {
        endpoint: '/category',
        method: 'get',
        middleware: authAdminMiddleware,
        controller: categoryControllers.getAll
    },
    {
        endpoint: '/category',
        method: 'post',
        middleware: authAdminMiddleware,
        controller: categoryControllers.onCreate
    },
    {
        endpoint: '/category/:id',
        method: 'get',
        middleware: authAdminMiddleware,
        controller: categoryControllers.getById
    },
    {
        endpoint: '/category/:id',
        method: 'put',
        middleware: authAdminMiddleware,
        controller: categoryControllers.onUpdate
    },
    {
        endpoint: '/category/:id',
        method: 'delete',
        middleware: authAdminMiddleware,
        controller: categoryControllers.onDelete
    },
    {
        endpoint: '/product',
        method: 'get',
        middleware: authAdminMiddleware,
        controller: productControllers.getAll
    },
    {
        endpoint: '/product',
        method: 'post',
        middleware: authAdminMiddleware,
        controller: productControllers.onCreate
    },
    {
        endpoint: '/product/:id',
        method: 'get',
        middleware: authAdminMiddleware,
        controller: productControllers.getById
    },
    {
        endpoint: '/product/:id',
        method: 'put',
        middleware: authAdminMiddleware,
        controller: productControllers.onUpdate
    },
    {
        endpoint: '/product/:id',
        method: 'delete',
        middleware: authAdminMiddleware,
        controller: productControllers.onDelete
    }
]
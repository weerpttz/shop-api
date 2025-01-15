import { addressControllers } from "../../controllers/address.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/address',
        method: 'get',
        middleware: authMiddleware,
        controller: addressControllers.getAll
    },
    {
        endpoint: '/address',
        method: 'post',
        middleware: authMiddleware,
        controller: addressControllers.onCreate
    },
    {
        endpoint: '/address/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: addressControllers.getById
    },
    {
        endpoint: '/address/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: addressControllers.onUpdate
    },
    {
        endpoint: '/address/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: addressControllers.onDelete
    }
]


// const addressRouter = new Router()

// addressRouter.get('/', addressControllers.getAll)
// addressRouter.get('/:id', addressControllers.getById)
// addressRouter.post('/', addressControllers.onCreate)
// addressRouter.put('/:id', addressControllers.onUpdate)
// addressRouter.delete('/:id', addressControllers.onDelete)

import { userControllers } from "../../controllers/user.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

export default [
    {
        endpoint: '/user/register',
        method: 'post',
        controller: userControllers.onRegister
    },
    {
        endpoint: '/user/login',
        method: 'post',
        controller: userControllers.onLogin
    },
    {
        endpoint: '/user/session',
        method: 'get',
        controller: userControllers.sessionToken
    },
    {
        endpoint: '/user/logout',
        method: 'post',
        middleware: authMiddleware,
        controller: userControllers.onLogout
    },
    {
        endpoint: '/user',
        method: 'get',
        controller: userControllers.getAll
    },
    {
        endpoint: '/user/:id',
        method: 'get',
        middleware: authMiddleware,
        controller: userControllers.getById
    },
    {
        endpoint: '/user/:id',
        method: 'put',
        middleware: authMiddleware,
        controller: userControllers.onUpdate
    },
    {
        endpoint: '/user/:id',
        method: 'delete',
        middleware: authMiddleware,
        controller: userControllers.onDelete
    }
]


// const userRouter = new Router()

// userRouter.get('/session', userControllers.sessionToken)
// userRouter.get('/', userControllers.getAll)
// userRouter.get('/:id',authMiddleware, userControllers.getById)
// userRouter.put('/:id',authMiddleware, userControllers.onUpdate)
// userRouter.delete('/:id',authMiddleware, userControllers.onDelete)
// userRouter.post('/register', userControllers.onRegister)
// userRouter.post('/login', userControllers.onLogin)
// userRouter.post('/logout',authMiddleware, userControllers.onLogout)

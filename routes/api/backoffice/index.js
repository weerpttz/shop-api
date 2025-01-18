import { Router } from "express";
import adminRoute from "./admin.router.js";

const adminRouter = new Router()

adminRoute.forEach((route) => {
    if (route.middleware) {
        switch (route.method) {
            case 'get' : adminRouter.get(`${route.endpoint}`, route.middleware, route.controller);break
            case 'post' : adminRouter.post(`${route.endpoint}`, route.middleware, route.controller);break
            case 'put' : adminRouter.put(`${route.endpoint}`, route.middleware, route.controller);break
            case 'delete' : adminRouter.delete(`${route.endpoint}`, route.middleware, route.controller);break
            default: break
        }
    } else {
        switch (route.method) {
            case 'get' : adminRouter.get(`${route.endpoint}`, route.controller);break
            case 'post' : adminRouter.post(`${route.endpoint}`, route.controller);break
            case 'put' : adminRouter.put(`${route.endpoint}`, route.controller);break
            case 'delete' : adminRouter.delete(`${route.endpoint}`, route.controller);break
            default: break
        }
    }
})

export default adminRouter
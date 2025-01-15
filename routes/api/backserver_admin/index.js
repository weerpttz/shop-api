import { Router } from "express";
import adminRouter from "./admin.router.js";



const adminrouter = new Router()

adminRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : adminrouter.get(`${route.endpoint}`, route.controller);break
        case 'post' : adminrouter.post(`${route.endpoint}`, route.controller);break
        default: break
    }
})

export default adminrouter
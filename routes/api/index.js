import { Router } from "express";
import userRouter from "./user.router.js";
import addressRouter from "./address.router.js";
import categoryRouter from "./category.router.js";
import productRouter from "./product.router.js";
import orderRouter from "./order.router.js";
import paymentRouter from "./payment.router.js";
import shippingRouter from "./shipping.router.js";

const router = new Router()

userRouter.forEach((route) => {
    if (route.middleware) {
        switch (route.method) {
            case 'get' : router.get(`${route.endpoint}`, route.middleware, route.controller);break
            case 'post' : router.post(`${route.endpoint}`, route.middleware, route.controller);break
            case 'put' : router.put(`${route.endpoint}`, route.middleware, route.controller);break
            case 'delete' : router.delete(`${route.endpoint}`, route.middleware, route.controller);break
            default: break
        }
    } else {
        switch (route.method) {
            case 'get' : router.get(`${route.endpoint}`, route.controller);break
            case 'post' : router.post(`${route.endpoint}`, route.controller);break
            case 'put' : router.put(`${route.endpoint}`, route.controller);break
            case 'delete' : router.delete(`${route.endpoint}`, route.controller);break
            default: break
        }
    }
})

addressRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

categoryRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

productRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

orderRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

paymentRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

shippingRouter.forEach((route) => {
    switch (route.method) {
        case 'get' : router.get(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'post' : router.post(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'put' : router.put(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        case 'delete' : router.delete(`${route.endpoint}`, route.middleware ? route.middleware : (req, res, next) => {next()}, route.controller);break
        default: break
    }
})

// router.use('/address',authMiddleware, addressRouter)
// router.use('/category',authMiddleware, categoryRouter)
// router.use('/product',authMiddleware, productRouter)
// router.use('/order', authMiddleware, orderRouter)

export default router
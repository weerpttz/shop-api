import { adminControllers } from "../../../controllers/backserver_admin/admin.controller.js";

export default [
    {
        endpoint: '/admin',
        method: 'get',
        controller: adminControllers.getAll
    },
    {
        endpoint: '/admin/login',
        method: 'post',
        controller: adminControllers.adminLogin
    }
]
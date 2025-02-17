import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Users from '../pages/users/Users.vue'
import Register from '../pages/Register.vue'
import Wrapper from '../pages/Wrapper.vue'
import Login from '../pages/Login.vue'
import UserCreate from "@/pages/users/UserCreate.vue";
import UserEdit from "@/pages/users/UserEdit.vue";
import Roles from '../pages/roles/Roles.vue'
import RoleCreate from '../pages/roles/RoleCreate.vue'
import RoleEdit from '../pages/roles/RoleEdit.vue'
import Products from '../pages/products/Products.vue'
import ProductCreate from '../pages/products/ProductCreate.vue'
import ProductEdit from '../pages/products/ProductEdit.vue'
import Orders from '../pages/orders/Orders.vue'

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'wrapper',
            component: Wrapper,
            children: [
                {
                    path: 'dashboard', // Önceki versiyonda /dashboard şeklindeydi, baştaki / kaldırıldı
                    name: 'dashboard',
                    component: Dashboard
                },
                {
                    path: 'users', // Önceki versiyonda /users şeklindeydi, baştaki / kaldırıldı
                    name: 'users',
                    component: Users
                },
                {
                    path: 'users/create',
                    name: 'usersCreate',
                    component: UserCreate
                },
                {
                    path: 'users/:id/edit',
                    name: 'usersEdit',
                    component: UserEdit
                },
                {
                    path: 'roles', // Önceki versiyonda /roles şeklindeydi, baştaki / kaldırıldı
                    name: 'roles',
                    component: Roles
                },
                {
                    path: 'roles/create',
                    name: 'roleCreate',
                    component: RoleCreate
                },
                {
                    path: 'roles/:id/edit',
                    name: 'roleEdit',
                    component: RoleEdit
                },
                {
                    path: 'products', // Önceki versiyonda /users şeklindeydi, baştaki / kaldırıldı
                    name: 'products',
                    component: Products
                },
                {
                    path: 'products/create', // Önceki versiyonda /users şeklindeydi, baştaki / kaldırıldı
                    name: 'productCreate',
                    component: ProductCreate
                },
                {
                    path: 'products/:id/edit', // Önceki versiyonda /users şeklindeydi, baştaki / kaldırıldı
                    name: 'productEdit',
                    component: ProductEdit
                },
                {
                    path: 'orders', // Önceki versiyonda /users şeklindeydi, baştaki / kaldırıldı
                    name: 'orders',
                    component: Orders
                },
            ]
        },
    ]
})

export default router

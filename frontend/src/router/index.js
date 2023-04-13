import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AnnounceBookView from '../views/AnnounceBookView.vue'
import ProfileView from '../views/ProfileView.vue'
import DetailBookView from '../views/DetailBookView.vue'
import CarrinhoView from '../views/CarrinhoView.vue'

function isAuthenticated() {
    const token = window.localStorage.getItem('token')
    return token ? true : false
}

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/register',
        name: 'RegistrationView',
        component: RegistrationView
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/announce-book',
        name: 'AnnounceBookView',
        component: AnnounceBookView,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/detail-book/:id',
        name: 'DetailBookView',
        component: DetailBookView
    },
    {
        path: '/carrinho/:id',
        name: 'CarrinhoView',
        component: CarrinhoView,
        beforeEnter: [isAuthenticated]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
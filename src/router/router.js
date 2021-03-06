import { createRouter, createWebHistory } from "vue-router"
import About from "../views/About.vue"
import Home from "../views/Home.vue";

const routes = [
      {
        name: 'Home',
        path: "/",
        component:Home
    },
    {
        name: 'About',
        path: "/about",
        component:About
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
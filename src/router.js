import { createRouter, createWebHistory } from 'vue-router';

// Components
import NotFound from './pages/NotFound.vue';
import AppHome from './pages/AppHome.vue';
import ApartmentIndex from './pages/ApartmentIndex.vue';
import ApartmentShow from './pages/ApartmentShow.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments',
            name: 'apartments-index',
            component: ApartmentIndex
        },
        // {
        //     path: '/apartments/show',
        //     name: 'apartments-show',
        //     component: ApartmentShow
        // },
        // esempio pagina con un parametro
        {
            path: '/apartments/:slug',
            name: 'apartment-show',
            component: ApartmentShow
        },

        // pagina 404
        {
            path: '/:pathMath(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
});

export { router };
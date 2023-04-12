import {createRouter, createWebHistory} from 'vue-router';

// Components
import NotFound from './pages/NotFound.vue';
import AppHome from './pages/AppHome.vue';
import ApartmentIndex from './pages/ApartmentIndex.vue';
import ApartmentShow from './pages/ApartmentShow.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments/index',
            name: 'apartments-index',
            component: ApartmentIndex
        },
        {
            path: '/apartments/show',
            name: 'apartments-show',
            component: ApartmentShow
        },
        // esempio pagina con un parametro
        // {
        //     path: '/projects/:slug',
        //     name: 'projects-show',
        //     component: ProjectsShow
        // },
        
        // pagina 404
        {
            path: '/:pathMath(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
});

export {router};
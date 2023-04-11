import {createRouter, createWebHistory} from 'vue-router';

// Components
import NotFound from './pages/NotFound.vue';
import AppHome from './pages/AppHome.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'home',
            component: AppHome
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
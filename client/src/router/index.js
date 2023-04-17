import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";


export const create = function (options) {

    const routes = !!options && !!options.routes ? options.routes : [];
    const beforeEachHandlers = !!options && !!options.beforeEach ? options.beforeEach : [];
    const afterEachHandlers = !!options && !!options.routes ? options.afterEach : [];

    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                name: 'home',
                component: HomeView,
                meta: {requiresAuth: true}
            }
        ].concat(routes)
    });

    beforeEachHandlers.map(h => router.beforeEach(h));
    afterEachHandlers.map(h => router.afterEach(h));

    return router;
}

export default {};

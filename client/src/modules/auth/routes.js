import {useAuthStore} from "@/stores/auth";

export default {
    // List routes the module supports
    routes: [
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/LoginView.vue')
        },
    ],

    // Before each route
    beforeEach: [
        async (to) => {
            if (!!to.meta.requiresAuth && !useAuthStore().isLoggedIn()) {
                return '/login';
            }

            if (to.name === "login" && useAuthStore().isLoggedIn()) {
                return '/';
            }
        }
    ],

    // After each route
    afterEach: [
        () => {}
    ]
};

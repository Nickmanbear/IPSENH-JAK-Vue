import Vue from 'vue';
import VueRouter from 'vue-router';
import BoardOverview from '../views/BoardOverview.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Board overview',
    component: BoardOverview,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/board/:id',
    name: 'Boards',
    component: () => import('../views/Board.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)
    && !store.getters.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;

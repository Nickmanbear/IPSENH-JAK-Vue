import Vue from 'vue';
import VueRouter from 'vue-router';
import BoardOverview from '../views/BoardOverview.vue';
import LoginComponent from '../views/Login.vue';
import Register from '../views/Register.vue';
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
    name: 'Board',
    component: () => import('../views/Board.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: () => import('../views/Board.vue'),
    meta: {
      requiresAuth: true,
    },
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;

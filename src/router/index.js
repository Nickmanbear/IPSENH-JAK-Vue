import Vue from 'vue';
import VueRouter from 'vue-router';
import BoardOverview from '../views/BoardOverview.vue';
import LoginComponent from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/b',
    name: 'Board overview',
    component: BoardOverview,
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: () => import('../views/Board.vue'),
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

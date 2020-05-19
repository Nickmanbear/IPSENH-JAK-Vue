import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BoardOverview from '../views/BoardOverview.vue';
import LoginComponent from "../views/login.vue"
import SecureComponent from "../views/secure.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent
  },
  {
    path: "/secure",
    name: "secure",
    component: SecureComponent
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
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

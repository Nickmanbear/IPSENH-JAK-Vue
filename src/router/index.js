import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BoardOverview from '../views/BoardOverview.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/b',
    name: 'Board overview',
    component: BoardOverview,
  },
  {
    path: '/board',
    name: 'Board',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

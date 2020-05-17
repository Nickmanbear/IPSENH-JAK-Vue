import Vue from 'vue';
import VueRouter from 'vue-router';
import BoardOverview from '../views/BoardOverview.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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

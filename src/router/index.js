import { createRouter, createWebHistory } from 'vue-router';
import Signin from '@/views/Signin.vue';
import Restaurants from '@/views/Restaurants.vue';

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'restaurants' }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feed',
    name: 'restaurants-feed',
    component: () => import('../views/RestaurantsFeed.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-top',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },

  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active'
});

export default router;

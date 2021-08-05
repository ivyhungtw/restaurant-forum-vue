import { createRouter, createWebHistory } from 'vue-router';
import Signin from '@/views/Signin.vue';
import Restaurants from '@/views/Restaurants.vue';
import store from '../store';

const authenticatedAdmin = (to, from, next) => {
  const { currentUser } = store.state;
  if (currentUser && !currentUser.isAdmin) {
    return next({ name: 'not-found' });
  }
  return next();
};

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'signin' }
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
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-profile-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id',
    name: 'user-profile',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants',
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authenticatedAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authenticatedAdmin
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const tokenInStore = store.state.token;
  let { isAuthenticated } = store.state;

  // call action
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser');
  }

  const pathsWithoutAuth = ['signin', 'signup'];

  if (!isAuthenticated && !pathsWithoutAuth.includes(to.name)) {
    return next({ name: 'signin' });
  }

  if (isAuthenticated && pathsWithoutAuth.includes(to.name)) {
    return next({ name: 'restaurants' });
  }

  return next();
});

export default router;

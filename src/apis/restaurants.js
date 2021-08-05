import { apiHelper } from '../utils/helpers';

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });

    return apiHelper.get(`/restaurants?${searchParams.toString()}`);
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`);
  },
  getDashboard({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}/dashboard`);
  },
  getRestaurantsFeed() {
    return apiHelper.get('/restaurants/feeds');
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top');
  },
  addFavorite({ restaurantId }) {
    return apiHelper.post(`restaurants/${restaurantId}/favorites`, null);
  },
  removeFavorite({ restaurantId }) {
    return apiHelper.delete(`restaurants/${restaurantId}/favorites`);
  },
  like({ restaurantId }) {
    return apiHelper.post(`restaurants/${restaurantId}/likes`, null);
  },
  unlike({ restaurantId }) {
    return apiHelper.delete(`restaurants/${restaurantId}/likes`);
  }
};

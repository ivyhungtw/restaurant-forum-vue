import { apiHelper } from '../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId });

    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  getRestaurantsFeed() {
    return apiHelper.get('/restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  addFavorite({ restaurantId }) {
    return apiHelper.post(`restaurants/${restaurantId}/favorites`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  removeFavorite({ restaurantId }) {
    return apiHelper.delete(`restaurants/${restaurantId}/favorites`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};

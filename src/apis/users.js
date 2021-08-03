import { apiHelper } from '../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
  addFavorite({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  removeFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  like({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  unlike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  getTopUsers() {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  follow(userId) {
    return apiHelper.post(`/users/${userId}/followships`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  unfollow(userId) {
    return apiHelper.delete(`/users/${userId}/followships`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};

import { apiHelper } from '../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
  getCurrentUser() {
    return apiHelper.get('/current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  get(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
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

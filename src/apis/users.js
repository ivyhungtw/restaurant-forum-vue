import { apiHelper } from '../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
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

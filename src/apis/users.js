import { apiHelper } from '../utils/helpers';

export default {
  getCurrentUser() {
    return apiHelper.get('/current_user');
  },
  get(userId) {
    return apiHelper.get(`/users/${userId}`);
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData);
  },
  getTopUsers() {
    return apiHelper.get('/users/top');
  },
  follow(userId) {
    return apiHelper.post(`/users/${userId}/followships`, null);
  },
  unfollow(userId) {
    return apiHelper.delete(`/users/${userId}/followships`);
  }
};

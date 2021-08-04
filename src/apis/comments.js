import { apiHelper } from '../utils/helpers';

const getToken = () => localStorage.getItem('token');

export default {
  create({ text, restaurantId }) {
    return apiHelper.post(
      '/comments',
      { text, restaurantId },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );
  },
  delete({ commentId }) {
    console.log('----gettoken-----', getToken());
    return apiHelper.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};

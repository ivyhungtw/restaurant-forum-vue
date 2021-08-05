import { apiHelper } from '../utils/helpers';

export default {
  create({ text, restaurantId }) {
    return apiHelper.post('/comments', { text, restaurantId });
  },
  delete({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`);
  }
};

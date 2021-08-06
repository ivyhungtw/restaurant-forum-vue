<template>
  <form @submit.prevent.stop="submitComment">
    <div class="form-group mb-4">
      <label class="mb-2 form-label" for="text"
        >Leave your comment：(must be greater than 50 and less than 200 characters)</label
      >
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">Back</button>
      <button type="submit" class="btn btn-primary mr-0">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import commentsAPI from '../apis/comments';
import { Toast } from '../utils/helpers';

export default {
  name: 'CreateComment',
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    async submitComment() {
      try {
        if (!this.text.trim() || this.text.trim().length < 50 || this.text.trim().length > 200) {
          return Toast.fire({
            icon: 'warning',
            title: 'Your comment does not meet the required length.'
          });
        }

        const { data } = await commentsAPI.create({
          text: this.text,
          restaurantId: this.restaurantId
        });
        console.log('data', data);

        if (data.status !== 'success') {
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        this.$emit('add-comment', {
          commentId: data.comment.id,
          restaurantId: this.restaurantId,
          text: this.text
        });

        this.text = '';

        return null;
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Unable to post a comment, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>

<template>
  <vee-form :validation-schema="schema" @submit="submitComment">
    <div class="form-group mb-4">
      <label class="mb-2 form-label" for="text"
        >Leave your comment：(must be greater than 50 and less than 200 characters)</label
      >
      <vee-field as="textarea" v-model="text" class="form-control" rows="3" name="text" />
      <ErrorMessage class="text-red" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">Back</button>
      <button type="submit" class="btn btn-red mr-0" :disabled="isProcessing">
        Submit
      </button>
    </div>
  </vee-form>
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
      text: '',
      isProcessing: false,
      schema: {
        text: 'required|min:50|max:200'
      }
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

        this.isProcessing = true;

        const { data } = await commentsAPI.create({
          text: this.text,
          restaurantId: this.restaurantId
        });

        if (data.status !== 'success') {
          this.isProcessing = false;
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

        this.isProcessing = false;
        return null;
      } catch (err) {
        this.isProcessing = false;
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

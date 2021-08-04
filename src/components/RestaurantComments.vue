<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div>
      <blockquote v-for="comment in restaurantComments" :key="comment.id" class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-end"
          @click.prevent.stop="deleteComment(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user-profile', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ $filter.fromNow(comment.createdAt) }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commentsAPI from '../apis/comments';
import { Toast, ConfirmDelete } from '../utils/helpers';

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  emits: ['delete-comment'],
  methods: {
    async deleteComment(commentId) {
      try {
        // double check before deleting a category
        const result = await ConfirmDelete();
        if (result.isConfirmed) {
          const { data } = await commentsAPI.delete({ commentId });

          if (data.status !== 'success') {
            if (data.status === 'error') {
              return Toast.fire({
                icon: 'error',
                title: data.message
              });
            }
            throw new Error(data.message);
          }

          this.$emit('delete-comment', commentId);
        }
        return null;
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Unable to delete the comment, please try again later.'
        });
      }
    }
  }
};
</script>

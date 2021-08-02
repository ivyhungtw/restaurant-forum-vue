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
const dummyUser = {
  currentUser: {
    id: 44,
    name: 'user1',
    email: 'user1@example.com',
    isAdmin: true
  }
};

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentUser: dummyUser.currentUser
    };
  },
  emits: ['delete-comment'],
  methods: {
    deleteComment(commentId) {
      this.$emit('delete-comment', commentId);
    }
  }
};
</script>

<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div>
      <blockquote v-for="comment in restaurantComments" :key="comment.id" class="blockquote mb-0">
        <button v-if="currentUser.isAdmin" type="button" class="btn btn-danger float-end">
          Delete
        </button>
        <h3>
          <a href="#">
            {{ comment.User.name }}
          </a>
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
    isAdmin: false
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
  }
};
</script>

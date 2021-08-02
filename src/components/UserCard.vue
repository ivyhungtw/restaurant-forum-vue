<template>
  <div class="col-3">
    <a href="#">
      <img :src="$filter.emptyImageFilter(user.image)" />
    </a>
    <h2>{{ user.name }}</h2>
    <span class="badge bg-secondary">followers：{{ user.FollowerCount }}</span>
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
        @click.prevent.stop="unfollow"
      >
        Unfollow
      </button>
      <button v-else type="button" class="btn btn-primary" @click.prevent.stop="follow">
        Follow
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  methods: {
    follow() {
      this.user = {
        ...this.user,
        isFollowed: true
      };
    },
    unfollow() {
      this.user = {
        ...this.user,
        isFollowed: false
      };
    }
  }
};
</script>

<style scoped>
img {
  width: 140px;
  height: 140px;
}
</style>

<template>
  <div class="col-3">
    <router-link :to="{ name: 'user-profile', params: { id: user.id } }">
      <img :src="$filter.emptyImageFilter(user.image)" />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge bg-secondary">followers：{{ user.followerCount || 0 }}</span>
    <p v-if="currentUserId !== user.id" class="mt-3">
      <button
        v-if="user.isFollowed"
        type="button"
        class="btn btn-danger"
        @click.prevent.stop="unfollow(user.id)"
      >
        Unfollow
      </button>
      <button v-else type="button" class="btn btn-primary" @click.prevent.stop="follow(user.id)">
        Follow
      </button>
    </p>
  </div>
</template>

<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    currentUserId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  methods: {
    async follow(userId) {
      try {
        const { data } = await usersAPI.follow(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.user = {
          ...this.user,
          followerCount: this.followerCount ? this.followerCount + 1 : 1,
          isFollowed: true
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to follow the user, please try again later.'
        });
      }
    },
    async unfollow(userId) {
      try {
        const { data } = await usersAPI.unfollow(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
        this.user = {
          ...this.user,
          followerCount: Number(this.followerCount) - 1,
          isFollowed: false
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to unfollow the user, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  object-fit: cover;
  width: 140px;
  height: 140px;
}
</style>

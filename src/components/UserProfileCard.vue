<template>
  <div class="col-12 col-md-6 col-lg-4">
    <img
      :src="$filter.emptyImageFilter(userProfile.image)"
      style="width: 250px;margin-bottom: 25px;"
    />
  </div>
  <div class="col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-between pt-4 pb-5">
    <div class="mb-3">
      <h3>{{ userProfile.name }}</h3>
      <p>{{ userProfile.email }}</p>
      <div>
        <strong>{{ userProfile.commentRestaurantsLength }}</strong> commented restaurants
      </div>
      <div>
        <strong>{{ userProfile.favRestaurantsLength }}</strong> saved restaurants
      </div>
      <div>
        <strong>{{ userProfile.followingsLength }}</strong> followings
      </div>
      <div>
        <strong>{{ userProfile.followersLength }}</strong> followers
      </div>
    </div>
    <div v-if="currentUser.id === userProfile.id">
      <router-link
        :to="{ name: 'user-profile-edit', params: { id: currentUser.id } }"
        class="btn btn-primary"
        >Edit</router-link
      >
    </div>
    <div v-else>
      <button
        v-if="isFollowed"
        type="button"
        class="btn btn-danger"
        @click.stop.prevent="unfollow(userProfile.id)"
      >
        Unfollow
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click.stop.prevent="follow(userProfile.id)"
      >
        Follow
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    userProfile: {
      type: Object,
      required: true
    },
    initialFollowing: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isFollowed: this.initialFollowing
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialFollowing(newValue) {
      this.isFollowed = newValue;
    }
  },
  methods: {
    async follow(userId) {
      try {
        const { data } = await usersAPI.follow(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.isFollowed = true;
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
        this.isFollowed = false;
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

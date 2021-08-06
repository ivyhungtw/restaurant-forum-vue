<template>
  <div class="container mt-5 pt-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- User Profile Card -->
        <user-profile-card :user-profile="userProfile" :initial-following="isFollowed" />
      </div>
      <div class="row">
        <!-- User Followings Card  -->
        <user-followings-card :followings="followings" />

        <!-- User Followers Card -->
        <user-followers-card :followers="followers" />
      </div>
      <div class="row mb-3">
        <!-- User Comments Card  -->
        <user-comments-card :restaurants="commentRestaurants" />

        <!-- User Fav Restaurants Card -->
        <user-fav-restaurants-card :restaurants="favRestaurants" />
      </div>
    </template>
  </div>
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue';
import UserFollowingsCard from '../components/UserFollowingsCard.vue';
import UserFollowersCard from '../components/UserFollowersCard.vue';
import UserCommentsCard from '../components/UserCommentsCard.vue';
import UserFavRestaurantsCard from '../components/UserFavRestaurantsCard.vue';
import Spinner from '../components/Spinner.vue';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      userProfile: {},
      commentRestaurants: [],
      followers: [],
      followings: [],
      favRestaurants: [],
      isFollowed: false,
      isLoading: true
    };
  },
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavRestaurantsCard,
    Spinner
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.get(userId);

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        const {
          userProfile,
          commentRestaurants,
          followers,
          followings,
          favRestaurants,
          isFollowed
        } = data;

        this.userProfile = {
          ...userProfile,
          commentRestaurantsLength: commentRestaurants.length,
          followersLength: followers.length,
          followingsLength: followings.length,
          favRestaurantsLength: favRestaurants.length
        };
        this.commentRestaurants = commentRestaurants;
        this.followers = followers;
        this.followings = followings;
        this.favRestaurants = favRestaurants;
        this.isFollowed = isFollowed;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to get user data, please try again later.'
        });
      }
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  }
};
</script>

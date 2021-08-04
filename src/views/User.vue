<template>
  <div class="container mt-5 pt-5">
    <div class="row">
      <!-- User Profile Card -->
      <user-profile-card :user-profile="userProfile" />
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
  </div>
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue';
import UserFollowingsCard from '../components/UserFollowingsCard.vue';
import UserFollowersCard from '../components/UserFollowersCard.vue';
import UserCommentsCard from '../components/UserCommentsCard.vue';
import UserFavRestaurantsCard from '../components/UserFavRestaurantsCard.vue';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      userProfile: {},
      commentRestaurants: [],
      followers: [],
      followings: [],
      favRestaurants: []
    };
  },
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavRestaurantsCard
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get(userId);

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        const { userProfile, commentRestaurants, followers, followings, favRestaurants } = data;
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
      } catch (err) {
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

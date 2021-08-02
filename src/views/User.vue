<template>
  <div class="container mt-5 pt-5">
    <div class="row">
      <!-- User Profile Card -->
      <user-profile-card :user-profile="userProfile" :current-user-id="currentUserId" />
    </div>
    <div class="row"></div>
    <div class="row">
      <!-- User Followings Card  -->
      <user-followings-card :followings="followings" />

      <!-- User Comments Card  -->
      <user-comments-card :restaurants="commentRestaurants" />
    </div>
    <div class="row mb-3">
      <!-- User Followers Card -->
      <user-followers-card :followers="followers" />

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

const dummyData = {
  userProfile: {
    id: 44,
    name: 'user1',
    email: 'user1@example.com',
    image: 'https://i.imgur.com/zadqwVq.png'
  },
  userId: 44,
  commentRestaurants: [
    {
      id: 1104,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=215'
    },
    {
      id: 1224,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=377'
    },
    {
      id: 1094,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=85'
    },
    {
      id: 1254,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=128'
    }
  ],
  followers: [
    {
      id: 34,
      image: 'https://i.imgur.com/1jDf2Me.png',
      Followship: {
        followerId: 34,
        followingId: 44,
        createdAt: '2021-04-09T10:39:50.000Z',
        updatedAt: '2021-04-09T10:39:50.000Z'
      }
    }
  ],
  followings: [
    {
      id: 34,
      image: 'https://i.imgur.com/1jDf2Me.png',
      Followship: {
        followerId: 34,
        followingId: 44,
        createdAt: '2021-04-09T10:39:50.000Z',
        updatedAt: '2021-04-09T10:39:50.000Z'
      }
    }
  ],
  favRestaurants: [
    {
      id: 1114,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=963',
      Favorite: {
        UserId: 44,
        RestaurantId: 1114,
        createdAt: '2021-04-08T17:56:51.000Z',
        updatedAt: '2021-04-08T17:56:51.000Z'
      }
    },
    {
      id: 1084,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=930',
      Favorite: {
        UserId: 44,
        RestaurantId: 1084,
        createdAt: '2021-06-28T12:42:26.000Z',
        updatedAt: '2021-06-28T12:42:26.000Z'
      }
    }
  ]
};

export default {
  data() {
    return {
      currentUserId: -1,
      userProfile: {},
      commentRestaurants: [],
      followers: [],
      folloings: [],
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
    fetchUser(userId) {
      console.log(userId);
      // TODO: fetch users/:id API

      const { userProfile, commentRestaurants, followers, followings, favRestaurants } = dummyData;
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
      this.currentUserId = dummyData.userId;
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  }
};
</script>

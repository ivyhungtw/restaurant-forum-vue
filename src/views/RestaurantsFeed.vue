<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- Title -->
      <div class="title text-center col-12 p-5 mb-3">
        <h1 class="mb-3">News Feed</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus
          orci ac auctor augue mauris.
        </p>
      </div>
      <div class="row">
        <!-- Latest Restaurants -->
        <div class="col-md-6">
          <h3>Latest Restaurants</h3>
          <latest-restaurants :restaurants="restaurants" />
        </div>
        <!-- Latest Comments-->
        <div class="col-md-6">
          <h3>Latest Comments</h3>
          <latest-comments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LatestRestaurants from '../components/LatestRestaurants.vue';
import LatestComments from '../components/LatestComments.vue';
import Spinner from '../components/Spinner.vue';
import restauratnsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  name: 'RestaurantsFeed',
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    };
  },
  components: {
    LatestRestaurants,
    LatestComments,
    Spinner
  },
  methods: {
    async fetchFeed() {
      try {
        this.isLoading = true;
        const response = await restauratnsAPI.getRestaurantsFeed();
        const { restaurants, comments } = response.data;

        this.restaurants = restaurants;
        this.comments = comments;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Sorry, we can not get restaurants feed data rignt now, please try again later.'
        });
      }
    }
  },
  created() {
    this.fetchFeed();
  }
};
</script>

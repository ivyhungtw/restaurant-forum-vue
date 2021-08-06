<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- Title -->
      <div class="title text-center col-12 p-5 mb-3">
        <h1 class="mb-3">Top Restaurants</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus
          orci ac auctor augue mauris.
        </p>
      </div>

      <hr />
      <!-- Top Restaurant List -->
      <top-restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </template>
  </div>
</template>

<script>
import TopRestaurantCard from '../components/TopRestaurantCard.vue';
import Spinner from '../components/Spinner.vue';
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      restaurants: [],
      isLoading: true
    };
  },
  components: {
    TopRestaurantCard,
    Spinner
  },
  methods: {
    async fetchTopRestaurants() {
      this.isLoading = true;
      try {
        const { data } = await restaurantsAPI.getTopRestaurants();

        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to get top restaurants data, please try again later.'
        });
      }
    }
  },
  created() {
    this.fetchTopRestaurants();
  }
};
</script>

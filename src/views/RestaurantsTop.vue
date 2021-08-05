<template>
  <div class="container py-5">
    <h1 class="mt-5">
      Top Restaurants
    </h1>

    <hr />
    <!-- Top Restaurant List -->
    <top-restaurant-card
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import TopRestaurantCard from '../components/TopRestaurantCard.vue';
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      restaurants: []
    };
  },
  components: {
    TopRestaurantCard
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants();

        this.restaurants = data.restaurants;
      } catch (err) {
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

<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <div>
        <h1>{{ restaurant.name }}</h1>
        <span class="badge bg-secondary mt-1 mb-3">
          {{ restaurant.categoryName }}
        </span>
      </div>

      <hr />

      <ul>
        <li>Number of comments: {{ restaurant.commentsLength }}</li>
        <li>Number of views: {{ restaurant.viewCounts }}</li>
        <li>Number of saves: {{ restaurant.saveCounts }}</li>
      </ul>

      <button type="button" class="btn btn-link" @click="$router.back()">
        Back
      </button>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue';
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      restaurant: {},
      isLoading: true
    };
  },
  components: {
    Spinner
  },
  methods: {
    async fetchDashBoard(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await restaurantsAPI.getDashboard({ restaurantId });
        console.log('data', data);

        if (data.status !== 'success') {
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        const { restaurant, Comments } = data;
        this.restaurant = {
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          commentsLength: Comments ? Comments.length : 0,
          viewCounts: restaurant.viewCounts,
          saveCounts: restaurant.FavoritedUsers.length
        };

        this.isLoading = false;
        return null;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Sorry, we can not get restaurant data rignt now, please try again later.'
        });
      }
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchDashBoard(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = this.$route.params;
    this.fetchDashBoard(id);
    next();
  }
};
</script>

<template>
  <div class="py-5 row g-0 mx-auto">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- Title -->
      <div class="title text-center col-12 p-5 mb-3">
        <h1 class="mb-3">Explore Local Restaurants</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus
          orci ac auctor augue mauris.
        </p>
      </div>

      <!-- Nav Pills -->
      <div class="col-md-2">
        <restaurant-nav-pills :categories="categories" />
      </div>

      <!-- Restaurant List -->
      <div class="px-4 col-md-10 mb-4">
        <div class="rest-card-wrapper">
          <div class="text-center" v-if="totalPage.length < 1">
            There is no restaruant for this category.
          </div>
          <!-- Restaurant Card -->
          <restaurant-card
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :initialRestuarant="restaurant"
          />
        </div>
      </div>

      <!-- Pagination -->
      <restaurant-pagination
        v-if="totalPage.length > 1"
        :current-page="currentPage"
        :total-page="totalPage"
        :next="next"
        :prev="prev"
        :category-id="categoryId"
      />
    </template>
  </div>
</template>

<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantNavPills from '../components/RestaurantNavPills.vue';
import RestaurantPagination from '../components/RestaurantPagination.vue';
import Spinner from '../components/Spinner.vue';
import restauratnsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  name: 'Restaurants',
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      page: 1,
      totalPage: [],
      prev: 1,
      next: 2,
      isLoading: true
    };
  },
  components: {
    RestaurantCard,
    RestaurantNavPills,
    RestaurantPagination,
    Spinner
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true;
        const response = await restauratnsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        });

        const { restaurants, categories, categoryId, page, totalPage, prev, next } = response.data;
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.prev = prev;
        this.next = next;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Sorry, we can not get restaurants data rignt now, please try again later.'
        });
      }
    }
  },
  created() {
    this.fetchRestaurants({ queryPage: '', queryCategoryId: '' });
  },
  beforeRouteUpdate(to) {
    const { page = '', categoryId = '' } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
  }
};
</script>

<style scoped>
.rest-card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  grid-gap: 1.5rem;
  width: 100%;
}

.title {
  color: #f3f3cd;
}
</style>

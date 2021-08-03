<template>
  <div class="container py-5">
    <!-- Nav Tab -->
    <nav-tabs />

    <restaurant-nav-pills :categories="categories" />

    <!-- Nav Pills -->
    <div class="row">
      <!-- Restaurant Card -->
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initialRestuarant="restaurant"
      />
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
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantNavPills from '../components/RestaurantNavPills.vue';
import RestaurantPagination from '../components/RestaurantPagination.vue';
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
      next: 2
    };
  },
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantNavPills,
    RestaurantPagination
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
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
      } catch (err) {
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

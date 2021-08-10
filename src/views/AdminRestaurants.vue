<template>
  <div class="container py-5">
    <!-- AdminNav -->
    <admin-nav />

    <router-link :to="{ name: 'admin-restaurant-new' }" class="btn btn-red mb-4">
      New Restaurant
    </router-link>

    <!-- AdminRestaurantsTable -->
    <admin-restaurants-table />
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue';
import AdminRestaurantsTable from '../components/AdminRestaurantsTable.vue';

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
};
</script>

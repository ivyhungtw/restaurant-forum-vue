<template>
  <!-- Spinner -->
  <spinner v-if="isLoading" />
  <table v-else class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col" width="300">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : 'uncategorized' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Detail</router-link
          >

          <router-link
            :to="{ name: 'admin-restaurant-edit', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Edit</router-link
          >

          <button
            type="button"
            class="btn btn-link"
            @click.prevent.stop="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Spinner from './Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast, ConfirmDelete } from '../utils/helpers';

export default {
  data() {
    return {
      restaurants: [],
      isLoading: true
    };
  },
  components: {
    Spinner
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.restaurants.get();
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: 'Unable to get restaurants data, please try again later.'
        });
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        // double check before deleting a restaurant
        const result = await ConfirmDelete();
        if (result.isConfirmed) {
          const { data } = await adminAPI.restaurants.delete({ restaurantId });

          if (data.status !== 'success') {
            throw new Error(data.message);
          }

          this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);

          this.$router.push({ name: 'admin-restaurants' });
        }
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: 'Unable to delete the restaurant, please try again later.'
        });
      }
    }
  }
};
</script>

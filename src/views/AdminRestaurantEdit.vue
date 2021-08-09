<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- Admin Restaurant Form -->
      <admin-restaurant-form
        :initial-restaurant="restaurant"
        @submit-form="submitForm"
        :is-processing="isProcessing"
      />
    </template>
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue';
import Spinner from '../components/Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  name: 'AdminRestaurantEdit',
  components: {
    AdminRestaurantForm,
    Spinner
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        opening_hours: '',
        description: '',
        image: '',
        CategoryId: -1
      },
      isProcessing: false,
      isLoading: true
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId
        } = data.restaurant;

        this.restaurant = {
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        };
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to get restaurant data, please try again later.'
        });
      }
    },
    async submitForm(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData
        });

        // handle errors
        if (data.status !== 'success') {
          if (data.errors) {
            this.isProcessing = false;
            await Toast.fire({
              icon: 'error',
              title: data.errors[0].message
            });
            if (data.errors[1]) {
              await Toast.fire({
                icon: 'error',
                title: data.errors[1].message
              });
            }
          } else {
            throw new Error(data.errors);
          }
        } else {
          this.$router.push({ name: 'admin-restaurants' });
          Toast.fire({
            icon: 'success',
            title: 'Update the restaurant successfully!'
          });
        }
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to update restaurant data, please try again later.'
        });
      }
    }
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Admin Restaurant Form -->
    <admin-restaurant-form
      :initial-restaurant="restaurant"
      @submit-form="submitForm"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  name: 'AdminRestaurantEdit',
  components: {
    AdminRestaurantForm
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
      isProcessing: false
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
      } catch (err) {
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
        }
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to update restaurant data, please try again later.'
        });
      }
      // TODO: post /restaurants
      console.log(formData);
    }
  }
};
</script>

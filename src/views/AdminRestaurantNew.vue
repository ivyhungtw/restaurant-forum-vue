<template>
  <div class="container py-5">
    <!-- Admin Restaurant Form -->
    <admin-restaurant-form @submit-form="submitForm" :is-processing="isProcessing" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  name: 'AdminRestaurantNew',
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async submitForm(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({ formData });

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
          Toast.fire({
            icon: 'success',
            title: 'Create a restaurant successfully!'
          });
          this.$router.push({ name: 'admin-restaurants' });
        }
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to create a restaurant, please try again later.'
        });
      }
    }
  }
};
</script>

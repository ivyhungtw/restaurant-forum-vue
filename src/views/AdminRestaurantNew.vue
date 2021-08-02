<template>
  <div class="container py-5">
    <!-- Admin Restaurant Form -->
    <admin-restaurant-form @submit-form="submitForm" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue';

export default {
  name: 'AdminRestaurantNew',
  components: {
    AdminRestaurantForm
  },
  methods: {
    submitForm(formData) {
      // TODO: post /restaurants
      console.log(formData);
    }
  }
};
</script>

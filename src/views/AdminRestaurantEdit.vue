<template>
  <div class="container py-5">
    <!-- Admin Restaurant Form -->
    <admin-restaurant-form :initial-restaurant="restaurant" @submit-form="submitForm" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue';

const dummyData = {
  restaurant: {
    id: 1534,
    name: 'Jeannette Wyman',
    tel: '(888) 800-7305 x9493',
    address: '32621 Arlo Oval',
    opening_hours: '08:00',
    description: 'Qui enim ipsa ut nihil et ut nemo.',
    image: 'https://loremflickr.com/320/240/restaurant,food?lock=647',
    CategoryId: 51,
    Category: {
      id: 51,
      name: '美式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    }
  }
};

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
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log(restaurantId);
      const { restaurant } = dummyData;
      const {
        id,
        name,
        tel,
        address,
        opening_hours: openingHours,
        description,
        image,
        CategoryId: categoryId
      } = restaurant;
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
    },
    submitForm(formData) {
      // TODO: post /restaurants
      console.log(formData);
    }
  }
};
</script>

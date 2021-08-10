<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <div class="col-md-12">
          <h1>{{ restaurant.name }}</h1>
          <span class="badge bg-secondary mt-1 mb-3">
            {{ restaurant.categoryName }}
          </span>
        </div>
        <div class="col-md-4">
          <img
            class="img-responsive center-block"
            :src="$filter.emptyImageFilter(restaurant.image)"
            style="width: 250px;margin-bottom: 25px;"
          />
          <div class="well">
            <ul class="list-unstyled">
              <li>
                <strong>Opening Hour:</strong>
                {{ restaurant.openingHours }}
              </li>
              <li>
                <strong>Tel:</strong>
                {{ restaurant.tel }}
              </li>
              <li>
                <strong>Address:</strong>
                {{ restaurant.address }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-8">
          <p>{{ restaurant.description }}</p>
        </div>
      </div>
      <hr />
      <button type="button" class="btn btn-link" @click="$router.back()">Back</button>
    </template>
  </div>
</template>
<script>
import Spinner from '../components/Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  name: 'AdminRestaurant',
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      },
      isLoading: true
    };
  },
  components: {
    Spinner
  },
  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
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
          image,
          Category,
          opening_hours: openingHours,
          tel,
          address,
          description
        } = data.restaurant;

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: Category ? Category.name : 'uncategorized',
          image,
          openingHours,
          tel,
          address,
          description
        };
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to get restaurant data, please try again later.'
        });
      }
    }
  }
};
</script>

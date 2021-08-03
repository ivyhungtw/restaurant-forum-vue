<template>
  <div class="card mb-3" style="max-width: 540px;margin: auto;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <a href="#">
          <img
            class="card-img"
            :src="$filter.emptyImageFilter(restaurant.image)"
            style="height: 100%; object-fit: cover;"
          />
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            Mrs. Mckenzie Johnston
          </h5>
          <span class="badge bg-secondary">Saved：{{ restaurant.favCount || 0 }}</span>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            class="btn btn-primary me-2"
            >Detail</router-link
          >

          <button
            v-if="restaurant.isFavorited"
            type="button"
            class="btn btn-danger me-2"
            @click.prevent.stop="removeFavorite(restaurant.id)"
          >
            Remove from Fav
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.prevent.stop="addFavorite(restaurant.id)"
          >
            Add to Fav
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await restaurantsAPI.addFavorite({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
          favCount: this.favCount ? this.favCount + 1 : 1
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to add the restaurant to your favorite list, please try again later.'
        });
      }
    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await restaurantsAPI.removeFavorite({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          favCount: Number(this.favCount) - 1,
          isFavorited: false
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to remove the restaurant from your favorite list, please try again later.'
        });
      }
    }
  }
};
</script>

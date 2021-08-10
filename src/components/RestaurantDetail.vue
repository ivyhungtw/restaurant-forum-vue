<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-md-8 col-lg-6 col-xl-4 mb-3">
      <img class="img-responsive center-block" :src="$filter.emptyImageFilter(restaurant.image)" />
    </div>
    <div class="col-lg-6">
      <div class="contact-info-wrap">
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
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-red btn-border me-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >Dashboard</router-link
      >

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border me-2"
        @click.prevent.stop="removeFavorite(restaurant.id)"
      >
        Remove from Fav
      </button>
      <button
        v-else
        type="button"
        class="btn btn-red btn-border me-2"
        @click.prevent.stop="addFavorite(restaurant.id)"
      >
        Add to Fav
      </button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like me-2"
        @click.prevent.stop="unlike(restaurant.id)"
      >
        Unlike
      </button>
      <button
        v-else
        type="button"
        class="btn btn-red like me-2"
        @click.prevent.stop="like(restaurant.id)"
      >
        Like
      </button>
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
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      };
    }
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
          isFavorited: true
        };
      } catch (err) {
        console.log(err);
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
          isFavorited: false
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to remove the restaurant from your favorite list, please try again later.'
        });
      }
    },
    async like(restaurantId) {
      try {
        const { data } = await restaurantsAPI.like({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to like the restaurant, please try again later.'
        });
      }
    },
    async unlike(restaurantId) {
      try {
        const { data } = await restaurantsAPI.unlike({ restaurantId });

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to unlike the restaurant, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}

img {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
  opacity: 1;
  /* transition: opacity 0.3s ease-out; */
}
</style>

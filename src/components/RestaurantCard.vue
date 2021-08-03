<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="$filter.emptyImageFilter(restaurant.image)"
        alt="Card image cap"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category ? restaurant.Category.name : 'uncategorized'
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite me-2"
          @click.prevent.stop="removeFavorite(restaurant.id)"
        >
          Remove from Fav
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite me-2"
          @click.prevent.stop="addFavorite(restaurant.id)"
        >
          Add to Fav
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like me-2"
          @click.prevent.stop="unlike"
        >
          Unlike
        </button>
        <button v-else type="button" class="btn btn-primary like me-2" @click.prevent.stop="like">
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialRestuarant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestuarant
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: 'success',
          title: `Add restaurant ${data.restaurantName} to your favorite list successfully!`
        });

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
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
        const { data } = await usersAPI.removeFavorite({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: 'success',
          title: `Remove restaurant ${data.restaurantName} from your favorite list successfully!`
        });

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
    like() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: true
      };
    },
    unlike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: false
      };
    }
  }
};
</script>

<style scoped>
img {
  width: 286px;
  height: 180px;
}
</style>

<template>
  <div class="card">
    <div class="rest-img-container">
      <img
        class="rest-img-top"
        :src="$filter.emptyImageFilter(restaurant.image)"
        alt="Card image cap"
      />
      <!-- Detail button -->
      <div class="rest-card-button">
        <router-link
          :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          class="btn info-btn"
          >Detail</router-link
        >
      </div>
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-between py-2">
        <span
          v-if="restaurant.isLiked"
          class=" like me-2"
          @click.prevent.stop="unlike(restaurant.id)"
        >
          <i class="fas fa-heart fa-lg"></i>
        </span>
        <span v-else class=" like me-2" @click.prevent.stop="like(restaurant.id)">
          <i class="far fa-heart fa-lg"></i>
        </span>

        <span
          v-if="restaurant.isFavorited"
          class="favorite me-2"
          @click.prevent.stop="removeFavorite(restaurant.id)"
        >
          <i class="fas fa-bookmark fa-lg"></i>
        </span>
        <span v-else class="favorite me-2" @click.prevent.stop="addFavorite(restaurant.id)">
          <i class="far fa-bookmark fa-lg"></i>
        </span>
      </div>
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
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants';
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
        const { data } = await restaurantsAPI.addFavorite({ restaurantId });
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

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
img {
  width: 286px;
  height: 180px;
}

.rest-img-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #a9a9a9;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.18);
}

.rest-img-top {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.rest-img-container::before,
.rest-img-container::after {
  content: '';
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  transition: transform 0.4s ease-out;
}

.rest-img-container::before {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  transform: scale(0, 1);
}

.rest-img-container::after {
  border-left: 1px solid white;
  border-right: 1px solid white;
  transform: scale(1, 0);
}

.rest-img-container:hover::before {
  transform: scale(1.05, 1);
}

.rest-img-container:hover::after {
  transform: scale(1, 1.05);
}

.rest-img-container:hover .rest-img-top {
  opacity: 0.4;
}

/* Detail Button */
.rest-card-button {
  margin-top: 1rem;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease-out;
  z-index: 1;
}

.rest-img-container:hover .rest-card-button {
  opacity: 1;
}

.info-btn {
  background: transparent;
  border: 1px solid beige;
  border-radius: 8px;
  padding: 3px 10px;
  color: white;
}

/* Like Button */
.fa-heart {
  color: #bd2333;
  cursor: pointer;
  transition: transform 0.5s ease;
  filter: opacity(0.8);
}

.fa-heart:hover {
  transform: scale(1.2);
  filter: opacity(1);
}

/* Favorite Button */
.fa-bookmark {
  color: #bd2333;
  cursor: pointer;
  transition: filter 0.5s ease;
  filter: opacity(0.8);
}

.fa-bookmark:hover {
  filter: opacity(1);
}

/* Card Body */

.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.card-body {
  padding: 17.5px;
}
</style>

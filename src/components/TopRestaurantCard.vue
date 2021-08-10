<template>
  <div class="card mb-3" style="max-width: 580px;margin: auto;">
    <div class="row g-0">
      <div class="col-md-5">
        <div class="rest-img-container">
          <img
            class="card-img rest-img-top"
            :src="$filter.emptyImageFilter(restaurant.image)"
            style="height: 100%; object-fit: cover;"
          />
          <!-- Detail button -->
          <div class="rest-card-button">
            <router-link
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              class="btn info-btn me-2"
              >Detail</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <div class="mb-2">
            <router-link
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              class="card-title"
            >
              {{ restaurant.name }}
            </router-link>
            <span class="btn-container border rounded-3 float-end py-1 px-3">
              <span
                v-if="restaurant.isFavorited"
                class="favorite"
                @click.prevent.stop="removeFavorite(restaurant.id)"
              >
                <i class="fas fa-bookmark fa-lg me-2"></i>Unsave
              </span>
              <span v-else class="favorite" @click.prevent.stop="addFavorite(restaurant.id)">
                <i class="far fa-bookmark fa-lg me-2"></i>Save
              </span>
            </span>
          </div>
          <span class="badge bg-secondary mb-3">Saved：{{ restaurant.favCount || 0 }}</span>
          <p class="card-text mb-3">
            {{ restaurant.description }}
          </p>
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
          isFavorited: true,
          favCount: this.restaurant.favCount ? this.restaurant.favCount + 1 : 1
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
          favCount: this.restaurant.favCount - 1,
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

<style scoped>
.card-title {
  font-weight: 500;
  line-height: 1.2;
  font-size: 1.25rem;
  color: #4d4d4d;
}

.btn-container {
  cursor: pointer;
}

.btn-container span {
  font-size: 0.8rem;
}

.btn-container:hover {
  background-color: #ebecf0;
}

i {
  color: #bd2333;
}

/* img */

.rest-img-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 230px;
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
  left: 50%;
  transform: translate(-45%, -75%);
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

.info-btn:hover {
  background: rgb(250, 250, 237);
  border: 1px solid rgb(250, 250, 237);
  color: #bd2333;
}

.card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>

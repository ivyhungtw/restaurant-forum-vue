<template>
  <div class="card mb-3" style="max-width: 540px;margin: auto;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <a href="#">
          <img class="card-img" :src="restaurant.image" />
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            Mrs. Mckenzie Johnston
          </h5>
          <span class="badge bg-secondary">Saved：{{ restaurant.favCount }}</span>
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
            @click.prevent.stop="removeFavorite"
          >
            Remove from Fav
          </button>
          <button v-else type="button" class="btn btn-primary" @click.prevent.stop="addFavorite">
            Add to Fav
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      };
    },
    removeFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      };
    }
  }
};
</script>

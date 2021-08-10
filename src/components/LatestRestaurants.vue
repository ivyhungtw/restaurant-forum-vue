<template>
  <div class="card">
    <div class="card-header">
      Latest Restaurants
    </div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="row">
        <div class="col-12 col-sm-5 col-md-12 col-xl-5 mb-2">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            <img
              class="card-img"
              :src="$filter.emptyImageFilter(restaurant.image)"
              style="height: 100%; object-fit: cover;"
            />
          </router-link>
        </div>
        <div class="col-12 col-sm-7 col-md-12 col-xl-7 mb-2">
          <div class="card-body">
            <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
              <h5 class="card-title">
                {{ restaurant.name }}
              </h5>
            </router-link>
            <span class="badge bg-secondary mb-2">{{
              restaurant.Category ? restaurant.Category.name : 'uncategorized'
            }}</span>
            <p class="card-text mb-2">
              {{ restaurant.description }}
            </p>
            - {{ $filter.fromNow(restaurant.createdAt) }}
          </div>
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
small {
  font-size: 10px;
}

.card-title {
  color: #bd2333;
}

img {
  max-height: 300px;
}

.card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>

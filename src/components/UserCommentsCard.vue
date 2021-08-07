<template>
  <div class="col-12 col-lg-6 px-2 mb-3">
    <div class="info-container border">
      <div class="title-container px-4 py-3">
        <div>
          <strong>{{ restaurants.length }}</strong> 已評論餐廳
        </div>
      </div>
      <div class="image-container col-12 p-4 d-flex flex-wrap">
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="mb-2 me-2">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            <img :src="$filter.emptyImageFilter(restaurant.image)" />
          </router-link>
        </div>
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

<template>
  <div
    class="col-12 col-md-6 p-0 mb-3"
    style="background-color:
    white; border: #cfcfcf9e solid 1px; border-radius: 2px;"
  >
    <div
      class=" px-4 py-3"
      style="border-bottom: #cfcfcf9e
      solid 1px; background-color: #f8f9fa;"
    >
      <div>
        <strong>{{ restaurants.length }}</strong> 收藏的餐廳
      </div>
    </div>
    <div class="col-12 p-4 d-flex flex-wrap" style="background-color: white;">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="mb-2 me-2">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
          <img :src="restaurant.image" style="width: 60px; height: 60px;" />
        </router-link>
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

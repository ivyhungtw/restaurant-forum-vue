<template>
  <div class="card">
    <div class="card-header">
      Latest Restaurants
    </div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <a href="#">{{ restaurant.name }}</a>
          <small>{{ restaurant.Category ? restaurant.Category.name : 'uncategorized' }}</small>
        </h4>
        <p>
          {{ restaurant.description }}
        </p>
        {{ restaurant.createdAt }}
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
</style>

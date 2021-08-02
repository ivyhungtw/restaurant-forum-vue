<template>
  <div class="mb-3">
    <h1>Admin Backend</h1>
    <router-link :to="{ name: 'admin-restaurants' }">Restaurants</router-link> |
    <a href="#">Categories</a> |
    <a href="#">Users</a>
  </div>
</template>

<script>
export default {
  name: 'AdminNav'
};
</script>

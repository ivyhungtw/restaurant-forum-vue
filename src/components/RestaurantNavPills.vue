<template>
  <div class="px-3 px-md-2 px-lg-3 sticky-top my-2">
    <div class="px-3 py-4 border-top h6 mb-0">
      Category
    </div>
    <ul class="nav nav-pills flex-column mb-4 border-bottom">
      <li class="nav-item border-top py-2 me-2">
        <router-link
          class="nav-link "
          :to="{ name: 'restaurants' }"
          :class="$route.fullPath === `/${$route.name}` ? 'active' : ''"
          exact-active-class=""
        >
          All
        </router-link>
      </li>

      <li v-for="category in categories" :key="category.id" class="nav-item border-top py-2 me-2">
        <router-link
          class="nav-link"
          :to="{ name: 'restaurants', query: { categoryId: category.id } }"
          :class="
            $route.fullPath.startsWith(`/${$route.name}`) && $route.query.categoryId == category.id
              ? 'active'
              : ''
          "
          exact-active-class=""
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.sticky-top {
  top: 100px;
}

.nav-link {
  color: #f94d4d;
}

.nav-pills .nav-link {
  margin-right: 7px;
  margin-bottom: 7px;
  padding: 5px 10px 3px;
  color: #4d4d4d;
  transition: none;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-width: 2px;
  border-bottom: 1px solid #bd2333;
  border-radius: 0;
  background-color: transparent;
}
</style>

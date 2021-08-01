<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <router-link
          :to="{ nema: 'restaurants', query: { page: prev, categoryId } }"
          class="page-link"
          aria-label="Previous"
          href="#"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <li
        class="page-item"
        v-for="page in totalPage"
        :key="page"
        :class="{ active: page === currentPage }"
      >
        <router-link
          :to="{ nema: 'restaurants', query: { page, categoryId } }"
          class="page-link"
          href="#"
        >
          {{ page }}
        </router-link>
      </li>

      <!-- 後一頁 nextPage -->
      <li :class="['page-item', { disabled: currentPage === totalPage.length }]">
        <router-link
          :to="{ nema: 'restaurants', query: { page: next, categoryId } }"
          class="page-link"
          aria-label="Next"
          href="#"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RestaurantPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Array,
      required: true
    },
    prev: {
      type: Number,
      required: true
    },
    next: {
      type: Number,
      require: true
    },
    categoryId: {
      type: [Number, String],
      default: ''
    }
  }
};
</script>

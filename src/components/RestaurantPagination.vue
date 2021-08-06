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

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-link {
  height: 37px;
  padding: 7px 20px;
  color: #bd2333;
}

.page-item.active .page-link,
.page-item.active span {
  color: white;
  background-color: #bd2333;
  border-color: #bd2333;
  z-index: 1;
}

.page-item span {
  color: #bd2333;
}

a.page-link:hover,
a.page-link:hover span {
  color: white;
  background-color: #bd2333;
  border-color: #bd2333;
}
</style>

<template>
  <div class="container py-5">
    <!-- Admin Nav -->
    <AdminNav />

    <form class="my-4">
      <div class="row">
        <div class="col-auto">
          <input
            type="text"
            v-model="newCategoryName"
            class="form-control"
            placeholder="Create category..."
          />
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" @click.prevent.stop="createCategory">
            Create
          </button>
        </div>
      </div>
    </form>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th scope="col" width="60">
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th scope="col" width="210">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div class="category-name">
              {{ category.name }}
            </div>
          </td>
          <td class="d-flex justify-content-between">
            <button type="button" class="btn btn-link me-2">
              Edit
            </button>
            <button
              type="button"
              class="btn btn-link me-2"
              @click.prevent.stop="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
//  2. 定義暫時使用的資料
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
};

export default {
  name: 'AdminCategory',
  components: {
    AdminNav
  },
  data() {
    return {
      categories: [],
      newCategoryName: ''
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories;
    },
    createCategory() {
      // TODO: post /categories

      this.categories.push({
        id: 5, // TODO: change
        name: this.newCategoryName
      });
      this.newCategoryName = '';
    },
    deleteCategory(categoryId) {
      // TODO: delete /categories/:id

      this.categories = this.categories.filter(category => category.id !== categoryId);
    }
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
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
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent.stop="createCategory"
              :disabled="isCreating"
            >
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
              <div v-show="!category.isEditing" class="category-name">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              />
              <span
                v-show="category.isEditing"
                class="cancel"
                @click.prevent.stop="cancel(category.id)"
              >
                ✕
              </span>
            </td>
            <td class="d-flex justify-content-between">
              <button
                v-show="!category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click="toggleIsEditing(category.id)"
              >
                Edit
              </button>
              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="
                  updateCategory({ categoryId: category.id, name: category.name })
                "
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
import Spinner from '../components/Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast, ConfirmDelete } from '../utils/helpers';

export default {
  name: 'AdminCategory',
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      categories: [],
      newCategoryName: '',
      isCreating: false,
      isLoading: true
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.categories.get();

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false,
          nameCached: ''
        }));
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
        Toast.fire({
          icon: 'warning',
          title: 'Unable to get category data, please try again later.'
        });
      }
    },
    async createCategory() {
      try {
        if (!this.newCategoryName.trim()) {
          return Toast.fire({
            icon: 'error',
            title: 'Category name can not be empty'
          });
        }

        this.isCreating = true;
        const { data } = await adminAPI.categories.create({ name: this.newCategoryName });

        if (data.status !== 'success') {
          this.isCreating = false;
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        this.categories.unshift({
          id: data.category.id,
          name: data.category.name
        });
        this.newCategoryName = '';
        Toast.fire({
          icon: 'success',
          title: `Create a category ${data.category.name} successfully!`
        });
        this.isCreating = false;
        return null;
      } catch (err) {
        this.isCreating = false;
        console.log(err);
        return Toast.fire({
          icon: 'warning',
          title: 'Unable to create a category, please try again later.'
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        // double check before deleting a category
        const result = await ConfirmDelete();
        if (result.isConfirmed) {
          const { data } = await adminAPI.categories.delete({ categoryId });

          if (data.status !== 'success') {
            if (data.status === 'error') {
              return Toast.fire({
                icon: 'error',
                title: data.message
              });
            }
            throw new Error(data.message);
          }

          Toast.fire({
            icon: 'success',
            title: 'Delete the category successfully!'
          });
          this.categories = this.categories.filter(category => category.id !== categoryId);
        }
        return null;
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: 'warning',
          title: 'Unable to delete the category, please try again later.'
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          };
        }
        return category;
      });
    },
    async updateCategory({ categoryId, name }) {
      try {
        if (!name.trim()) {
          return Toast.fire({
            icon: 'error',
            title: 'Category name can not be empty'
          });
        }

        const { data } = await adminAPI.categories.update({ categoryId, name });

        if (data.status !== 'success') {
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        this.toggleIsEditing(categoryId);
        Toast.fire({
          icon: 'success',
          title: `Update the category to ${name} successfully!`
        });
        return null;
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: 'warning',
          title: 'Unable to update the category, please try again later.'
        });
      }
    },
    cancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached
          };
        }
        return category;
      });
      this.toggleIsEditing(categoryId);
    }
  }
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>

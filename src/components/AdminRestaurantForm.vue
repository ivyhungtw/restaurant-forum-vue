<template>
  <!-- Spinner -->
  <spinner v-if="isLoading" />
  <vee-form :validation-schema="schema" v-else @submit="submitForm" v-show="!isLoading">
    <!-- Name -->
    <div class="mb-3">
      <label class="form-label" for="name">Name <span>*</span></label>
      <vee-field
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
      <ErrorMessage class="text-red" name="name" />
    </div>

    <!-- Category -->
    <div class="mb-3">
      <label class="form-label" for="categoryId">Category <span>*</span></label>
      <vee-field
        as="select"
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value="" disabled>
          Choose category
        </option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </vee-field>
      <ErrorMessage class="text-red" name="categoryId" />
    </div>

    <!-- Tel -->
    <div class="mb-3">
      <label class="form-label" for="tel">Tel</label>
      <vee-field
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
      <ErrorMessage class="text-red" name="tel" />
    </div>

    <!-- Address -->
    <div class="mb-3">
      <label class="form-label" for="address">Address <span>*</span></label>
      <vee-field
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
        required
      />
      <ErrorMessage class="text-red" name="address" />
    </div>

    <!-- Opening Hours -->
    <div class="mb-3">
      <label class="form-label" for="opening-hours">Opening Hours</label>
      <vee-field
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
      <ErrorMessage class="text-red" name="opening_hours" />
    </div>

    <!-- Description -->
    <div class="mb-3">
      <label class="form-label" for="description">Description <span>*</span></label>
      <vee-field
        as="textarea"
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
        required
      />
      <ErrorMessage class="text-red" name="description" />
    </div>

    <!-- Image -->
    <div class="mb-3">
      <label class="form-label" for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumnnail mb-3"
        width="200"
        height="200"
      />
      <vee-field
        id="image"
        class="form-control"
        type="file"
        name="image"
        accept="image/*"
        @change="changeFile"
      />
      <ErrorMessage class="text-red" name="image" />
    </div>

    <button type="submit" class="btn btn-primary" :disabled="isProcessing">
      {{ isProcessing ? 'Processing' : 'Submit' }}
    </button>
  </vee-form>
</template>

<script>
import Spinner from './Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        id: -1,
        name: '',
        tel: '',
        address: '',
        opening_hours: '',
        description: '',
        image: '',
        CategoryId: -1
      })
    },
    isProcessing: {
      type: Boolean,
      requried: true
    }
  },
  data() {
    return {
      categories: [],
      restaurant: {
        ...this.initialRestaurant
      },
      isLoading: true,
      schema: {
        name: 'required|min:3|max:50',
        categoryId: 'category',
        tel: 'min:9|max:13',
        address: 'required',
        description: 'required|min:3|max:500',
        image: 'image'
      }
    };
  },
  components: {
    Spinner
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      };
    }
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.categories.get();
        this.categories = data.categories;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to get catogry data, please try again later.'
        });
      }
    },
    changeFile(e) {
      const { files } = e.target;

      if (files.length === 0) {
        this.restaurant.image = '';
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.restaurant.image = imageURL;
      }
    },
    submitForm(values) {
      const { name, categoryId, address, description } = this.restaurant;

      if (!name || !categoryId || !address || !description) {
        return Toast.fire({
          icon: 'warning',
          title: 'Please fill out all required fields.'
        });
      }

      const image = values.image ? [...values.image][0] : null;
      const restaurant = { ...this.restaurant };
      const formData = new FormData();

      formData.append('image', image);
      for (const property in restaurant) {
        if (property !== 'image') {
          formData.append(property, restaurant[property]);
        }
      }
      return this.$emit('submit-form', formData);
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style>
label span {
  color: rgb(216, 3, 3);
}
</style>

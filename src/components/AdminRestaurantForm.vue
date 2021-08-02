<template>
  <form @submit.prevent.stop="submitForm">
    <!-- Name -->
    <div class="mb-3">
      <label class="form-label" for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <!-- Category -->
    <div class="mb-3">
      <label class="form-label" for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value="" selected disabled>
          Choose category
        </option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Tel -->
    <div class="mb-3">
      <label class="form-label" for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <!-- Address -->
    <div class="mb-3">
      <label class="form-label" for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <!-- Opening Hours -->
    <div class="mb-3">
      <label class="form-label" for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <!-- Description -->
    <div class="mb-3">
      <label class="form-label" for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
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
      <input
        id="image"
        class="form-control"
        type="file"
        name="image"
        accept="image/*"
        @change="changeFile"
      />
    </div>

    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
</template>

<script>
const dummyData = {
  categories: [
    {
      id: 61,
      name: '複合式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 51,
      name: '美式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 41,
      name: '素食料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 31,
      name: '墨西哥料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 21,
      name: '義大利料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 11,
      name: '日本料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 1,
      name: '中式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    }
  ]
};

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
    }
  },
  data() {
    return {
      categories: [],
      restaurant: {
        ...this.initialRestaurant
      }
    };
  },
  methods: {
    fetchCategories() {
      this.categories = dummyData.categories;
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
    submitForm(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit('submit-form', formData);
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

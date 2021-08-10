<template>
  <div class="container py-5">
    <vee-form :validation-schema="schema" @submit="submitForm">
      <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <vee-field
          id="name"
          v-model="user.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
        <ErrorMessage class="text-red" name="name" />
      </div>

      <div class="mb-3">
        <label class="form-label" for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumnnail mb-3"
          width="200"
          height="200"
        />
        <vee-field
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control"
          @change="changeFile"
        />
        <ErrorMessage class="text-red" name="image" />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      user: {},
      isProcessing: false,
      schema: {
        name: 'required|min:3|max:50',
        image: 'image'
      }
    };
  },
  created() {
    this.setUser(this.currentUser);
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser(newValue) {
      this.setUser(newValue);
    }
  },
  methods: {
    setUser(user) {
      const { id } = this.$route.params;
      if (Number(id) !== user.id) {
        this.$router.push({ name: 'not-found' });
      }
      this.user = { ...this.currentUser };
    },
    changeFile(e) {
      const { files } = e.target;

      if (!files.length) {
        this.user.image = '';
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.image = imageURL;
      }
    },
    async submitForm(values) {
      try {
        if (!this.user.name || this.user.name.length > 25) {
          return Toast.fire({
            icon: 'error',
            title: 'Name can not be empty or longer than 25 characters.'
          });
        }
        this.isProcessing = true;

        const formData = new FormData();
        const image = values.image ? [...values.image][0] : null;
        formData.append('image', image);
        formData.append('name', this.user.name);

        const { data } = await usersAPI.update({ userId: this.user.id, formData });

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.$store.commit('changeImage', data.image);
        this.$router.push({ name: 'user-profile', params: { id: this.currentUser.id } });

        return Toast.fire({
          icon: 'success',
          title: 'Update successfully!'
        });
      } catch (err) {
        this.isProcessing = false;
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Unable to update user data, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>

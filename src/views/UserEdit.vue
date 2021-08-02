<template>
  <div class="container py-5">
    <form>
      <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
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
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control"
          @change="changeFile"
        />
      </div>

      <button type="submit" class="btn btn-primary" @submit="submitForm">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
const dummyData = {
  userProfile: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    image: null
  },
  userId: 2,
  commentRestaurants: [
    {
      id: 4,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=233'
    },
    {
      id: 8,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=513'
    },
    {
      id: 44,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=335'
    },
    {
      id: 19,
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=265'
    }
  ],
  followers: [
    {
      id: 2,
      image: null,
      Followship: {
        followerId: 2,
        followingId: 1,
        createdAt: '2021-06-19T22:39:45.000Z',
        updatedAt: '2021-06-19T22:39:45.000Z'
      }
    }
  ],
  followings: [],
  favRestaurants: []
};

export default {
  data() {
    return {
      user: {
        id: -1,
        image: '',
        name: ''
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(userId) {
      console.log(userId);
      // TODO: fetch /users/:id
      const { userProfile } = dummyData;
      const { id, name, image } = userProfile;
      this.user = {
        id,
        name,
        image
      };
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
    submitForm(e) {
      const form = e.target;
      const formData = new FormData(form);
      console.log(formData);
    }
  }
};
</script>

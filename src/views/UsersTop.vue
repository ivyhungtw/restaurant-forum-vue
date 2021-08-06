<template>
  <div class="container py-5">
    <!-- Title -->
    <div class="title text-center col-12 p-5 mb-3">
      <h1 class="mb-3">Top Users</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus orci ac
        auctor augue mauris.
      </p>
    </div>
    <hr />
    <div class="row text-center justify-content-center">
      <!-- User Card -->
      <user-card
        v-for="initialUser in topUsers"
        :key="initialUser.id"
        :initial-user="initialUser"
        :current-user-id="currentUserId"
      />
    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      topUsers: [],
      currentUserId: -1
    };
  },
  components: {
    UserCard
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        this.topUsers = data.users;
        this.currentUserId = data.id;
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Unable to get top users data, please try again later.'
        });
      }
    }
  },
  created() {
    this.fetchTopUsers();
  }
};
</script>

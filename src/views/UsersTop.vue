<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- Title -->
      <div class="title text-center col-12 p-5 mb-3">
        <h1 class="mb-3">Top Users</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus
          orci ac auctor augue mauris.
        </p>
      </div>
      <hr />
      <div class="user-container row text-center mt-5">
        <!-- User Card -->
        <user-card
          v-for="initialUser in topUsers"
          :key="initialUser.id"
          :initial-user="initialUser"
          :current-user-id="currentUserId"
        />
      </div>
    </template>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';
import Spinner from '../components/Spinner.vue';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      topUsers: [],
      currentUserId: -1,
      isLoading: true
    };
  },
  components: {
    UserCard,
    Spinner
  },
  methods: {
    async fetchTopUsers() {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.getTopUsers();

        this.topUsers = data.users;
        this.currentUserId = data.id;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
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

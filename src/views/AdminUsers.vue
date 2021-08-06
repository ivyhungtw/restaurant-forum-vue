<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
      <!-- AdminNav Component -->
      <admin-nav />

      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              Email
            </th>
            <th scope="col">
              Role
            </th>
            <th scope="col" width="140">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">
              {{ user.id }}
            </th>
            <td>{{ user.email }}</td>
            <td v-if="user.isAdmin">admin</td>
            <td v-else>user</td>
            <td>
              <button
                v-if="user.isAdmin && user.id !== currentUser.id"
                type="button"
                class="btn btn-link"
                @click.prevent.stop="toggleRole(user.id)"
                :disabled="isProcessing"
              >
                set as user
              </button>
              <button
                v-else-if="!user.isAdmin"
                type="button"
                class="btn btn-link"
                @click.prevent.stop="toggleRole(user.id)"
                :disabled="isProcessing"
              >
                set as admin
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AdminNav from '@/components/AdminNav.vue';
import Spinner from '../components/Spinner.vue';
import adminAPI from '../apis/admin';
import { Toast } from '../utils/helpers';

export default {
  name: 'AdminUsers',
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      users: [],
      isProcessing: false,
      isLoading: true
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.users.get();

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.users = data.users;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: 'Unable to get users data, please try again later.'
        });
      }
    },
    async toggleRole(userId) {
      try {
        const { data } = await adminAPI.users.update({ userId });

        if (data.status !== 'success') {
          this.isProcessing = false;
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !user.isAdmin
            };
          }
          return user;
        });

        return null;
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

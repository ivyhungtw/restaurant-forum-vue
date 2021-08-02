<template>
  <div class="container py-5">
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
              v-if="user.isAdmin && user.id !== currentUserId"
              type="button"
              class="btn btn-link"
              @click="toggleRole(user.id)"
            >
              set as user
            </button>
            <button
              v-else-if="!user.isAdmin"
              type="button"
              class="btn btn-link"
              @click="toggleRole(user.id)"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';

const dummyData = {
  users: [
    {
      id: 34,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
      isAdmin: 1,
      image: 'https://i.imgur.com/1jDf2Me.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-17T19:31:04.000Z'
    },
    {
      id: 44,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
      isAdmin: 0,
      image: 'https://i.imgur.com/zadqwVq.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-06T00:26:32.000Z'
    },
    {
      id: 54,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$E1xGl3bqIVT.OFSdwk8.SuGiuU4j5o2Q3fI4o2InjCuuita4plKiG',
      isAdmin: 0,
      image: 'https://i.imgur.com/mxyxsfQ.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-06T00:27:29.000Z'
    }
  ],
  id: 34
};

export default {
  name: 'AdminUsers',
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      currentUserId: -1
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
      this.currentUserId = dummyData.id;
    },
    toggleRole(userId) {
      // TODO: put /users/:id
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin
          };
        }
        return user;
      });
    }
  }
};
</script>

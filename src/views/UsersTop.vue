<template>
  <div class="container py-5">
    <!-- Nav Tab -->
    <nav-tabs />
    <h1 class="mt-5">
      Top Users
    </h1>
    <hr />
    <div class="row text-center justify-content-center">
      <!-- User Card -->
      <user-card
        v-for="initialUser in topUsers"
        :key="initialUser.id"
        :initial-user="initialUser"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import UserCard from '../components/UserCard.vue';

const dummyData = {
  users: [
    {
      id: 44,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
      isAdmin: false,
      image: 'https://i.imgur.com/zadqwVq.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-06T00:26:32.000Z',
      Followers: [
        {
          id: 34,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
          isAdmin: true,
          image: 'https://i.imgur.com/1jDf2Me.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-17T19:31:04.000Z',
          Followship: {
            followerId: 34,
            followingId: 44,
            createdAt: '2021-04-09T10:39:50.000Z',
            updatedAt: '2021-04-09T10:39:50.000Z'
          }
        }
      ],
      FollowerCount: 1,
      isFollowed: false
    },
    {
      id: 54,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$E1xGl3bqIVT.OFSdwk8.SuGiuU4j5o2Q3fI4o2InjCuuita4plKiG',
      isAdmin: false,
      image: 'https://i.imgur.com/mxyxsfQ.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-06T00:27:29.000Z',
      Followers: [
        {
          id: 34,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
          isAdmin: true,
          image: 'https://i.imgur.com/1jDf2Me.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-17T19:31:04.000Z',
          Followship: {
            followerId: 34,
            followingId: 54,
            createdAt: '2021-04-09T10:39:51.000Z',
            updatedAt: '2021-04-09T10:39:51.000Z'
          }
        }
      ],
      FollowerCount: 1,
      isFollowed: false
    },
    {
      id: 34,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
      isAdmin: true,
      image: 'https://i.imgur.com/1jDf2Me.png',
      createdAt: '2021-04-06T00:19:36.000Z',
      updatedAt: '2021-04-17T19:31:04.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    }
  ],
  id: 44
};

export default {
  data() {
    return {
      topUsers: []
    };
  },
  components: {
    NavTabs,
    UserCard
  },
  methods: {
    fetchTopUsers() {
      this.topUsers = dummyData.users;
    }
  },
  created() {
    this.fetchTopUsers();
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Nav Tab -->
    <nav-tabs />
    <h1 class="mt-5">
      Top Restaurants
    </h1>

    <hr />
    <!-- Top Restaurant List -->
    <top-restaurant-card
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import TopRestaurantCard from '../components/TopRestaurantCard.vue';

const dummyData = {
  restaurants: [
    {
      id: 1114,
      description: 'Autem quia esse et similique expedita.\nEa pariatur',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=963',
      name: 'Estelle Muller',
      favCount: 2,
      FavoritedUsers: [
        {
          id: 44,
          name: 'user1',
          email: 'user1@example.com',
          password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
          isAdmin: false,
          image: 'https://i.imgur.com/zadqwVq.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-06T00:26:32.000Z',
          Favorite: {
            UserId: 44,
            RestaurantId: 1114,
            createdAt: '2021-04-08T17:56:51.000Z',
            updatedAt: '2021-04-08T17:56:51.000Z'
          }
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
          Favorite: {
            UserId: 34,
            RestaurantId: 1114,
            createdAt: '2021-04-10T19:00:55.000Z',
            updatedAt: '2021-04-10T19:00:55.000Z'
          }
        }
      ],
      isFavorited: true
    },
    {
      id: 1044,
      description: 'A perferendis voluptas error accusantium veritatis',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=8',
      name: 'Julie Shields',
      favCount: 1,
      FavoritedUsers: [
        {
          id: 34,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
          isAdmin: true,
          image: 'https://i.imgur.com/1jDf2Me.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-17T19:31:04.000Z',
          Favorite: {
            UserId: 34,
            RestaurantId: 1044,
            createdAt: '2021-04-11T14:06:34.000Z',
            updatedAt: '2021-04-11T14:06:34.000Z'
          }
        }
      ],
      isFavorited: false
    },
    {
      id: 1084,
      description: 'Debitis aut itaque mollitia eos omnis fugit omnis ',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=930',
      name: 'Henry Strosin',
      favCount: 1,
      FavoritedUsers: [
        {
          id: 44,
          name: 'user1',
          email: 'user1@example.com',
          password: '$2a$10$QeeBEuHzbDV/nUagZk0KHe2.Kr4uAjxWhxJfDCQOgX2ZqDXID35W.',
          isAdmin: false,
          image: 'https://i.imgur.com/zadqwVq.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-06T00:26:32.000Z',
          Favorite: {
            UserId: 44,
            RestaurantId: 1084,
            createdAt: '2021-06-28T12:42:26.000Z',
            updatedAt: '2021-06-28T12:42:26.000Z'
          }
        }
      ],
      isFavorited: true
    },
    {
      id: 1094,
      description: 'accusantium odit vel',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=85',
      name: 'Marshall Shields',
      favCount: 1,
      FavoritedUsers: [
        {
          id: 34,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$n8fVa5HYfOCLOiTpnZa8nuoNA1U.haz6W9jVk2W.D6D48obCHfiJu',
          isAdmin: true,
          image: 'https://i.imgur.com/1jDf2Me.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-17T19:31:04.000Z',
          Favorite: {
            UserId: 34,
            RestaurantId: 1094,
            createdAt: '2021-04-10T19:00:20.000Z',
            updatedAt: '2021-04-10T19:00:20.000Z'
          }
        }
      ],
      isFavorited: false
    },
    {
      id: 1054,
      description: 'Voluptatem enim adipisci facilis non ullam. Fugiat',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=114',
      name: 'Eileen Casper',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    },
    {
      id: 1064,
      description: 'Voluptates rem officia non. Qui ipsum minus sint i',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=504',
      name: 'Maureen Gleason',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    },
    {
      id: 1074,
      description: 'ducimus ut maiores',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=342',
      name: 'Randolph Leffler',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    },
    {
      id: 1104,
      description: 'Rerum expedita ad nostrum distinctio a tempora exp',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=215',
      name: 'Katherine Prosacco',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    },
    {
      id: 1124,
      description: 'ipsum occaecati laborum',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=257',
      name: 'Salvador Ebert',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    },
    {
      id: 1134,
      description: 'Deserunt nesciunt voluptate velit amet quaerat qui',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=453',
      name: 'Lowell Satterfield',
      favCount: 0,
      FavoritedUsers: [],
      isFavorited: false
    }
  ]
};

export default {
  data() {
    return {
      restaurants: []
    };
  },
  components: {
    NavTabs,
    TopRestaurantCard
  },
  methods: {
    fetchTopRestaurants() {
      this.restaurants = dummyData.restaurants;
    }
  },
  created() {
    this.fetchTopRestaurants();
  }
};
</script>

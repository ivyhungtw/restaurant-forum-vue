<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- RestaurantDetail -->
    <hr />
    <!-- RestaurantComments -->
    <!-- CreateComment -->
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1044,
    name: 'Julie Shields',
    tel: '(512) 826-6762 x6317',
    address: '2913 Otho Drive',
    opening_hours: '08:00',
    description: 'A perferendis voluptas error accusantium veritatis.',
    image: 'https://loremflickr.com/320/240/restaurant,food?lock=8',
    CategoryId: 41,
    viewCounts: 12,
    createdAt: '2021-04-06T18:12:12.000Z',
    updatedAt: '2021-08-01T21:40:26.000Z',
    Category: {
      id: 41,
      name: '素食料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    Comments: [],
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
    LikedUsers: []
  },
  isFavorited: false,
  isLiked: false
};

export default {
  name: 'restaurant',
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: []
    };
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log(restaurantId);
      const { restaurant, isFavorited, isLiked } = dummyData;
      const { id, name, Category, image, tel, address, description } = restaurant;
      this.restaurant = {
        id,
        name,
        categoryName: Category ? Category.name : 'uncategorized',
        image,
        openingHours: restaurant.opening_hours,
        tel,
        address,
        description,
        isFavorited,
        isLiked
      };
      this.restaurantComments = restaurant.Comments;
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  }
};
</script>

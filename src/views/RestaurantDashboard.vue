<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge bg-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1114,
    name: 'Estelle Muller',
    tel: '1-249-412-1705',
    address: '69435 Giuseppe Lodge',
    opening_hours: '08:00',
    description:
      'Autem quia esse et similique expedita.\nEa pariatur similique dolore atque cumque.',
    image: 'https://loremflickr.com/320/240/restaurant,food?lock=963',
    CategoryId: 41,
    viewCounts: 3,
    createdAt: '2021-04-06T18:12:12.000Z',
    updatedAt: '2021-04-10T19:00:59.000Z',
    Category: {
      id: 41,
      name: '素食料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    Comments: [],
    FavoritedUsers: [
      {
        id: 44,
        Favorite: {
          UserId: 44,
          RestaurantId: 1114,
          createdAt: '2021-04-08T17:56:51.000Z',
          updatedAt: '2021-04-08T17:56:51.000Z'
        }
      },
      {
        id: 34,
        Favorite: {
          UserId: 34,
          RestaurantId: 1114,
          createdAt: '2021-04-10T19:00:55.000Z',
          updatedAt: '2021-04-10T19:00:55.000Z'
        }
      }
    ]
  }
};

export default {
  data() {
    return {
      restaurant: {}
    };
  },
  methods: {
    fetchDashBoard() {
      const { restaurant, Comments } = dummyData;
      this.restaurant = {
        name: restaurant.name,
        categoryName: restaurant.Category.name,
        commentsLength: Comments ? Comments.length : 0,
        viewCounts: restaurant.viewCounts
      };
    }
  },
  created() {
    this.fetchDashBoard();
  }
};
</script>

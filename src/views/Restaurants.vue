<template>
  <div class="container py-5">
    <!-- Nav Tab -->
    <nav-tabs />

    <restaurant-nav-pills :categories="categories" />

    <!-- Nav Pills -->
    <div class="row">
      <!-- Restaurant Card -->
      <restaurant-card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initialRestuarant="restaurant"
      />
    </div>

    <!-- Pagination -->
    <restaurant-pagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :next="next"
      :prev="prev"
      :category-id="categoryId"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantNavPills from '../components/RestaurantNavPills.vue';
import RestaurantPagination from '../components/RestaurantPagination.vue';

const dummyData = {
  restaurants: [
    {
      id: 1044,
      name: 'Julie Shields',
      tel: '(512) 826-6762 x6317',
      address: '2913 Otho Drive',
      opening_hours: '08:00',
      description: 'A perferendis voluptas error accusantium veritatis',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=8',
      CategoryId: 41,
      viewCounts: 11,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-10T22:00:50.000Z',
      Category: {
        id: 41,
        name: '素食料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '素食料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1054,
      name: 'Eileen Casper',
      tel: '1-403-752-4481 x599',
      address: '602 Bradtke Tunnel',
      opening_hours: '08:00',
      description: 'Voluptatem enim adipisci facilis non ullam. Fugiat',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=114',
      CategoryId: 41,
      viewCounts: 3,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-10T22:00:54.000Z',
      Category: {
        id: 41,
        name: '素食料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '素食料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1064,
      name: 'Maureen Gleason',
      tel: '461.213.9121 x28975',
      address: '57170 Gaylord Dale',
      opening_hours: '08:00',
      description: 'Voluptates rem officia non. Qui ipsum minus sint i',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=504',
      CategoryId: 41,
      viewCounts: 4,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-10T19:00:44.000Z',
      Category: {
        id: 41,
        name: '素食料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '素食料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1074,
      name: 'Randolph Leffler',
      tel: '(964) 999-0037',
      address: '4491 Bechtelar Street',
      opening_hours: '08:00',
      description: 'ducimus ut maiores',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=342',
      CategoryId: 51,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-06T18:12:12.000Z',
      Category: {
        id: 51,
        name: '美式料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '美式料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1084,
      name: 'Henry Strosin',
      tel: '561-868-2752',
      address: '3375 Louvenia Village',
      opening_hours: '08:00',
      description: 'Debitis aut itaque mollitia eos omnis fugit omnis ',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=930',
      CategoryId: 11,
      viewCounts: 1,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-10T22:01:01.000Z',
      Category: {
        id: 11,
        name: '日本料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '日本料理',
      isFavorited: true,
      isLiked: false
    },
    {
      id: 1094,
      name: 'Marshall Shields',
      tel: '872.298.6724 x661',
      address: '04399 Hauck Haven',
      opening_hours: '08:00',
      description: 'accusantium odit vel',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=85',
      CategoryId: 21,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-06T18:12:12.000Z',
      Category: {
        id: 21,
        name: '義大利料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '義大利料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1104,
      name: 'Katherine Prosacco',
      tel: '251-313-1899',
      address: '7440 Jaren Plains',
      opening_hours: '08:00',
      description: 'Rerum expedita ad nostrum distinctio a tempora exp',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=215',
      CategoryId: 1,
      viewCounts: 1,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-09T10:41:32.000Z',
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '中式料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1114,
      name: 'Estelle Muller',
      tel: '1-249-412-1705',
      address: '69435 Giuseppe Lodge',
      opening_hours: '08:00',
      description: 'Autem quia esse et similique expedita.\nEa pariatur',
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
      categoryName: '素食料理',
      isFavorited: true,
      isLiked: false
    },
    {
      id: 1124,
      name: 'Salvador Ebert',
      tel: '1-912-622-4658 x2781',
      address: '702 Trycia Run',
      opening_hours: '08:00',
      description: 'ipsum occaecati laborum',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=257',
      CategoryId: 21,
      viewCounts: null,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-06T18:12:12.000Z',
      Category: {
        id: 21,
        name: '義大利料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '義大利料理',
      isFavorited: false,
      isLiked: false
    },
    {
      id: 1134,
      name: 'Lowell Satterfield',
      tel: '735.258.4219 x5854',
      address: '370 Hudson Turnpike',
      opening_hours: '08:00',
      description: 'Deserunt nesciunt voluptate velit amet quaerat qui',
      image: 'https://loremflickr.com/320/240/restaurant,food?lock=453',
      CategoryId: 31,
      viewCounts: 1,
      createdAt: '2021-04-06T18:12:12.000Z',
      updatedAt: '2021-04-09T22:30:59.000Z',
      Category: {
        id: 31,
        name: '墨西哥料理',
        createdAt: '2021-04-06T00:18:27.000Z',
        updatedAt: '2021-04-06T00:18:27.000Z'
      },
      categoryName: '墨西哥料理',
      isFavorited: false,
      isLiked: false
    }
  ],
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 11,
      name: '日本料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 21,
      name: '義大利料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 31,
      name: '墨西哥料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 41,
      name: '素食料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 51,
      name: '美式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    {
      id: 61,
      name: '複合式料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    }
  ],
  categoryId: '',
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2
};

export default {
  name: 'Restaurants',
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      page: 1,
      totalPage: [],
      prev: 1,
      next: 2
    };
  },
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantNavPills,
    RestaurantPagination
  },
  methods: {
    fetchRestaurants() {
      const { restaurants, categories, categoryId, page, totalPage, prev, next } = dummyData;
      this.restaurants = restaurants;
      this.categories = categories;
      this.categoryId = categoryId;
      this.currentPage = page;
      this.totalPage = totalPage;
      this.prev = prev;
      this.next = next;
    }
  },
  created() {
    this.fetchRestaurants();
  }
};
</script>

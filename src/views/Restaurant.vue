<template>
  <div class="container py-5">
    <!-- RestaurantDetail -->
    <restaurant-detail :initial-restaurant="restaurant" />
    <hr />
    <!-- RestaurantComments -->
    <restaurant-comments
      :restaurant-comments="restaurantComments"
      @delete-comment="deleteComment"
    />
    <!-- CreateComment -->
    <create-comment :restaurant-id="restaurant.id" @add-comment="addComment" />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue';
import RestaurantComments from '../components/RestaurantComments.vue';
import CreateComment from '../components/CreateComment.vue';

const dummyData = {
  restaurant: {
    id: 1064,
    name: 'Maureen Gleason',
    tel: '461.213.9121 x28975',
    address: '57170 Gaylord Dale',
    opening_hours: '08:00',
    description:
      'Voluptates rem officia non. Qui ipsum minus sint iusto. Quaerat id quo rem harum nulla fuga vel ea et.',
    image: 'https://loremflickr.com/320/240/restaurant,food?lock=504',
    CategoryId: 41,
    viewCounts: 5,
    createdAt: '2021-04-06T18:12:12.000Z',
    updatedAt: '2021-08-02T01:19:52.520Z',
    Category: {
      id: 41,
      name: '素食料理',
      createdAt: '2021-04-06T00:18:27.000Z',
      updatedAt: '2021-04-06T00:18:27.000Z'
    },
    Comments: [
      {
        id: 11,
        text: 'Quos quia qui libero',
        UserId: 54,
        RestaurantId: 1064,
        createdAt: '2021-04-06T18:14:41.000Z',
        updatedAt: '2021-04-06T18:14:41.000Z',
        User: {
          id: 54,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$E1xGl3bqIVT.OFSdwk8.SuGiuU4j5o2Q3fI4o2InjCuuita4plKiG',
          isAdmin: false,
          image: 'https://i.imgur.com/mxyxsfQ.png',
          createdAt: '2021-04-06T00:19:36.000Z',
          updatedAt: '2021-04-06T00:27:29.000Z'
        }
      }
    ],
    FavoritedUsers: [],
    LikedUsers: []
  },
  isFavorited: false,
  isLiked: false
};

const dummyUser = {
  currentUser: {
    id: 44,
    name: 'user1',
    email: 'user1@example.com',
    isAdmin: true
  },
  isAuthenticated: true
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
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
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
    },
    deleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId);
    },
    addComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: dummyUser.currentUser.id,
          name: dummyUser.currentUser.name
        },
        text,
        createdAt: new Date()
      });
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  }
};
</script>

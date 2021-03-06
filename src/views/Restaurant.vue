<template>
  <div class="container py-5">
    <!-- Spinner -->
    <spinner v-if="isLoading" />
    <template v-else>
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
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RestaurantDetail from '../components/RestaurantDetail.vue';
import RestaurantComments from '../components/RestaurantComments.vue';
import CreateComment from '../components/CreateComment.vue';
import Spinner from '../components/Spinner.vue';
import restaurantAPI from '../apis/restaurants';
import { Toast } from '../utils/helpers';

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
      restaurantComments: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await restaurantAPI.getRestaurant({ restaurantId });

        if (data.status !== 'success') {
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        const { restaurant, isFavorited, isLiked } = data;
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
        this.isLoading = false;
        return null;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Sorry, we can not get restaurant data rignt now, please try again later.'
        });
      }
    },
    deleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId);
    },
    addComment({ commentId, restaurantId, text }) {
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          image: this.currentUser.image
        },
        text,
        createdAt: new Date()
      });
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  }
};
</script>

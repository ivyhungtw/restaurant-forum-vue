<template>
  <div>
    <h2 class="my-4">
      All comments：
    </h2>

    <div>
      <transition-group name="fade">
        <div v-for="comment in restaurantComments" :key="comment.id">
          <div class="people-comment-wrapper">
            <div class="people-avatar pt-1">
              <img :src="$filter.emptyImageFilter(comment.User.image)" alt="" />
            </div>
            <div class="people-comment">
              <div class="people-comment-container">
                <div class="people-name">
                  <router-link :to="{ name: 'user-profile', params: { id: comment.User.id } }">
                    {{ comment.User.name }}
                  </router-link>
                </div>
                <div class="people-saying">{{ comment.text }}</div>
                <span
                  v-if="currentUser.isAdmin"
                  class="delete-btn"
                  @click.prevent.stop="deleteComment(comment.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="date-wrapper">
            <div class="days-comment">- {{ $filter.fromNow(comment.createdAt) }}</div>
          </div>
        </div>
      </transition-group>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commentsAPI from '../apis/comments';
import { Toast, ConfirmDelete } from '../utils/helpers';

export default {
  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  emits: ['delete-comment'],
  methods: {
    async deleteComment(commentId) {
      try {
        // double check before deleting a category
        const result = await ConfirmDelete();
        if (result.isConfirmed) {
          const { data } = await commentsAPI.delete({ commentId });

          if (data.status !== 'success') {
            if (data.status === 'error') {
              return Toast.fire({
                icon: 'error',
                title: data.message
              });
            }
            throw new Error(data.message);
          }

          this.$emit('delete-comment', commentId);
        }
        return null;
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: 'error',
          title: 'Unable to delete the comment, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.comment-container {
  border-radius: 10px;
  position: relative;
}

.delete-btn {
  position: absolute;
  top: -10px;
  right: -3px;
  cursor: pointer;
}

.delete-btn:hover i {
  color: #bd2333;
}

/* Comments */
.people-comment-wrapper {
  display: flex;
  align-items: flex-start;
  margin-top: 12px;
}

.people-avatar img {
  object-fit: cover;
  width: 32px;
  height: 32px;
  display: block;
  border-radius: 50%;
  margin-right: 6px;
}

.people-comment {
  background-color: #f2f3f5;
  border-radius: 16px;
  padding: 8px 12px;
  color: #1c1e21;
  position: relative;
}

.people-comment-container {
  display: flex;
  font-size: 14px;
}

.people-name {
  font-weight: bolder;
  color: #365899;
  cursor: pointer;
  margin-right: 4px;
}

.people-name a:hover {
  text-decoration: underline;
}

.date-wrapper {
  display: flex;
  align-items: center;
  color: #90949c;
  font-size: 13px;
  margin-left: 50px;
  margin-top: 4px;
}

/* Animation */
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

.fade-move {
  transition: all 0.5s linear;
}

/* .fade-leave-active {
  position: absolute;
} */
</style>

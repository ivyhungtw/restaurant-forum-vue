<template>
  <div class="card">
    <div class="card-header">
      Latest Comments
    </div>
    <div class="card-body">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="d-flex align-items-baseline border-bottom py-3"
      >
        <!-- image -->
        <span class="me-2">
          <router-link :to="{ name: 'user-profile', params: { id: comment.User.id } }">
            <img :src="comment.User.image" class="avatar" alt="" width="32" height="32" />
          </router-link>
        </span>
        <!-- comment -->
        <div class="d-flex flex-column ">
          <!-- title -->
          <div class="d-flex">
            <div>
              <router-link :to="{ name: 'user-profile', params: { id: comment.User.id } }">
                {{ comment.User.name }}
              </router-link>
              created a comment on
              <router-link :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }">
                {{ comment.Restaurant.name }}
              </router-link>
            </div>
          </div>
          <!-- box -->
          <div class="rounded-2 p-2 mt-2 bg-light mb-1">
            <p class="card-text">{{ comment.text }}</p>
          </div>
          - {{ $filter.fromNow(comment.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.card-body {
  padding-top: 0;
}

.avatar {
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
  overflow: hidden;
  vertical-align: middle;
  object-fit: cover;
}

.card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>

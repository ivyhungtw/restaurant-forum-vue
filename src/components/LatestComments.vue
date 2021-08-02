<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <template v-if="comment.Restaurant && comment.text">
          <h4>
            <router-link :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }">
              {{ comment.Restaurant.name }}
            </router-link>
          </h4>
          <p>{{ comment.text }}</p>
          by
          <router-link :to="{ name: 'user-profile', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
          {{ $filter.fromNow(comment.createdAt) }}
          <hr />
        </template>
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

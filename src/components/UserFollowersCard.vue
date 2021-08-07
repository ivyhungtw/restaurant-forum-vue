<template>
  <div class="col-12 col-lg-6 px-2 mb-3">
    <div class="info-container border">
      <div class="title-container px-4 py-3">
        <div>
          <strong>{{ followers.length }}</strong> followers
        </div>
      </div>
      <div class="image-container col-12 p-4 d-flex flex-wrap">
        <div v-for="follower in followers" :key="follower.id" class="mb-2 me-2">
          <router-link :to="{ name: 'user-profile', params: { id: follower.id } }">
            <img :src="$filter.emptyImageFilter(follower.image)" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div class="col-12 col-lg-6 px-2 mb-3">
    <div class="info-container border">
      <div class="title-container px-4 py-3">
        <div>
          <strong>{{ followings.length }}</strong> followings
        </div>
      </div>
      <div class="image-container col-12 p-4 d-flex flex-wrap">
        <div v-for="following in followings" :key="following.id" class="mb-2 me-2">
          <router-link :to="{ name: 'user-profile', params: { id: following.id } }">
            <img :src="$filter.emptyImageFilter(following.image)" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    followings: {
      type: Array,
      required: true
    }
  }
};
</script>

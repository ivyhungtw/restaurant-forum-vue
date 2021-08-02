<template>
  <div class="col-12 col-lg-6 px-2 mb-3" style="background-color: white;">
    <div class="border">
      <div
        class=" px-4 py-3"
        style="border-bottom: #cfcfcf9e solid 1px;
      background-color: #f8f9fa;"
      >
        <div>
          <strong>{{ followings.length }}</strong> followings
        </div>
      </div>
      <div class="col-12 p-4 d-flex flex-wrap" style="background-color: white;">
        <div v-for="following in followings" :key="following.id" class="mb-2 me-2">
          <router-link :to="{ name: 'user-profile', params: { id: following.id } }">
            <img
              :src="$filter.emptyImageFilter(following.image)"
              style="width: 60px; height: 60px;"
            />
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

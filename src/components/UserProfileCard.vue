<template>
  <div class="col-12 col-md-6 col-lg-4">
    <img
      :src="$filter.emptyImageFilter(userProfile.image)"
      style="width: 250px;margin-bottom: 25px;"
    />
  </div>
  <div class="col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-between pt-4 pb-5">
    <div class="mb-3">
      <h3>{{ userProfile.name }}</h3>
      <p>{{ userProfile.email }}</p>
      <div>
        <strong>{{ userProfile.commentRestaurantsLength }}</strong> 已評論餐廳
      </div>
      <div>
        <strong>{{ userProfile.favRestaurantsLength }}</strong> 收藏的餐廳
      </div>
      <div>
        <strong>{{ userProfile.followingsLength }}</strong> followings
      </div>
      <div>
        <strong>{{ userProfile.followersLength }}</strong> followers
      </div>
    </div>
    <div v-if="currentUser.id === userProfile.id">
      <router-link
        :to="{ name: 'user-profile-edit', params: { id: currentUser.id } }"
        class="btn btn-primary"
        >edit</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
};
</script>

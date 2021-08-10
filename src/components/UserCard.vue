<template>
  <div
    class="col-12 col-md-6 col-lg-4 col-xl-3
           mb-4
           d-flex
           align-items-stretch
           justify-content-center"
  >
    <!-- Card -->
    <div class="user-card card pb-2" style="width: 25rem; ">
      <div
        v-if="currentUserId !== user.id"
        class="btn-container add mx-4 mt-2 d-flex justify-content-end"
      >
        <button
          v-if="user.isFollowed"
          type="button"
          class="btn btn-danger"
          @click.prevent.stop="unfollow(user.id)"
          :disabled="isProcessing"
        >
          Unfollow
        </button>
        <button
          v-else
          type="button"
          class="btn btn-red"
          @click.prevent.stop="follow(user.id)"
          :disabled="isProcessing"
        >
          + Follow
        </button>
      </div>
      <router-link
        :to="{ name: 'user-profile', params: { id: user.id } }"
        class="user-img d-flex justify-content-center px-5 py-3 mt-5"
        @click="getUserData(user)"
      >
        <img
          :src="$filter.emptyImageFilter(user.image)"
          class="
                    img-show-user
                    btn-show-user
                    rounded-circle
                    card-img-top
                    mx-auto
                    img-fluid
                  "
          alt="..."
          data-bs-toggle="modal"
          data-bs-target="#user-modal"
          :data-id="user.id"
        />
      </router-link>
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="user-info mb-2">
          <h5 class="card-title text-center">
            {{ user.name }}
          </h5>
          <span class="badge bg-secondary">followers：{{ user.followerCount || 0 }}</span>
        </div>
        <div class=" d-flex justify-content-center mt-2">
          <router-link :to="{ name: 'user-profile', params: { id: user.id } }" class="btn btn-red">
            Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    currentUserId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser,
      isProcessing: false
    };
  },
  methods: {
    async follow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.follow(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        this.user = {
          ...this.user,
          followerCount: this.user.followerCount + 1,
          isFollowed: true
        };
        this.isProcessing = false;
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to follow the user, please try again later.'
        });
      }
    },
    async unfollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.unfollow(userId);
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount - 1,
          isFollowed: false
        };
        this.isProcessing = false;
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: 'error',
          title: 'Unable to unfollow the user, please try again later.'
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  object-fit: cover;
  width: 140px;
  height: 140px;
}

/* Card */
.card {
  box-shadow: 4px 4px 5px rgb(58 58 58 / 7%);
  border: none;
}

.card:hover {
  box-shadow: 4px 4px 5px rgb(51 31 31 / 14%);
}

.user-card {
  position: relative;
}

.btn-container {
  position: absolute;
  top: 5px;
  right: -10px;
}

.btn-container .btn {
  padding: 1px 10px;
  font-size: 12px;
  border-radius: 0.5rem;
  min-width: 0;
}

.btn-container .btn-danger {
  background-color: #bd2333;
  color: white;
}

.btn-container:hover .btn-danger {
  background-color: transparent;
  color: #bd2333;
}
</style>

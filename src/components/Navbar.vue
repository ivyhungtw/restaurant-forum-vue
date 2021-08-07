<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/">
        <img src="https://imgur.com/eGg5sYc.png" id="logo" class="me-1" alt="logo" />
        FOODMATE
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- right -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Tabs -->
          <li v-for="tab in tabs" :key="tab.title" class="nav-item me-3">
            <router-link class="nav-link" aria-current="page" :to="{ name: tab.pathName }">
              {{ tab.title }}
            </router-link>
          </li>
          <!-- is user is login -->
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <template v-if="isAuthenticated">
            <!-- is user is admin -->
            <li class="nav-item me-3" v-if="currentUser.isAdmin">
              <router-link class="nav-link" aria-current="page" :to="{ name: 'admin-restaurants' }">
                ADMIN
              </router-link>
            </li>
            <!-- is user is not admin -->
            <li class="nav-item me-3">
              <router-link
                :to="{ name: 'user-profile', params: { id: currentUser.id } }"
                class="nav-link"
              >
                PROFILE
              </router-link>
            </li>
            <!-- Logout button -->
            <button
              type="button"
              class="btn btn-sm btn-outline-primary my-2 my-sm-0"
              @click="logout"
            >
              LOGOUT
            </button>
          </template>

          <!-- Login button -->
          <button type="button" class="btn btn-sm btn-outline-primary my-2 my-sm-0" v-else>
            LOGIN
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tabs: [
        {
          title: 'Home',
          pathName: 'restaurants'
        },
        {
          title: 'News Feed',
          pathName: 'restaurants-feed'
        },
        {
          title: 'Top Restaurants',
          pathName: 'restaurants-top'
        },
        {
          title: 'Top Users',
          pathName: 'users-top'
        }
      ]
    };
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication');
      this.$router.push('/signin');
    }
  }
};
</script>

<style scoped>
nav {
  padding: 14px 16px;
}

#logo {
  width: 50px;
}

.navbar-brand {
  font-size: 1.5rem;
  padding: 0;
}

.navbar-brand:hover {
  color: #4d4d4d;
}

.navbar-brand,
.nav-item .nav-link {
  color: #4d4d4d;
}

.nav-item:hover .nav-link {
  color: #bd2333;
}

.nav-item .nav-link.active,
.nav-item .show > .nav-link {
  color: #4d4d4d;
  border-width: 2px;
  border-bottom: 1px solid #bd2333;
  border-radius: 0;
  background-color: transparent;
}
</style>

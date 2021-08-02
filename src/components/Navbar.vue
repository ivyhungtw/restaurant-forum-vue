<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-tshirt fa-lg me-1"></i>
        Restaurant Forum
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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <!-- is user is login -->
          <template v-if="isAuthenticated">
            <!-- is user is admin -->
            <li class="nav-item me-3" v-if="currentUser.isAdmin">
              <router-link
                class="nav-link active"
                aria-current="page"
                :to="{ name: 'admin-restaurants' }"
              >
                ADMIN
              </router-link>
            </li>
            <!-- is user is not admin -->
            <li class="nav-item me-3" v-if="!currentUser.isAdmin">
              <router-link
                :to="{ name: 'user-profile', params: { id: currentUser.id } }"
                class="text-white nav-link"
              >
                Hi, {{ currentUser.name || 'User' }}
              </router-link>
            </li>
            <!-- Logout button -->
            <button type="button" class="btn btn-sm btn-outline-primary my-2 my-sm-0">
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
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
};

export default {
  data() {
    return {
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>

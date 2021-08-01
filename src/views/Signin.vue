<template>
  <div class="container mt-5">
    <div class="card card-body">
      <h1 class="text-center mt-3">Login</h1>
      <form
        action="/users/login"
        method="POST"
        class="row d-flex flex-column align-items-center"
        @submit.prevent.stop="handlesubmit"
      >
        <!-- Email -->
        <div class="form-group col-8 mt-3">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="form-control"
            autocomplete="username"
            placeholder="Enter Email"
            required
            autofocus
          />
        </div>
        <!-- Password -->
        <div class="form-group mt-3 col-8">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            class="form-control"
            autocomplete="current-password"
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block col-6 mt-4">
          Login
        </button>
        <p class="lead mt-4" style="width: 300px; margin-left: 100px;">
          No Account? <router-link :to="{ name: 'signup' }">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handlesubmit() {
      const data = {
        email: this.email,
        password: this.password
      };
      console.log(JSON.stringify(data));
    }
  }
};
</script>

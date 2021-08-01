<template>
  <div class="container mt-5">
    <div class="card card-body">
      <h1 class="text-center mt-3">Register</h1>
      <form
        action="/users/register"
        method="POST"
        class="row d-flex flex-column align-items-center"
        @submit.prevent.stop="handleSubmit"
      >
        <div class="form-group col-8 mt-3">
          <label for="name">Name</label>
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Enter name"
            autocomplete="username"
            required
            autofocus
          />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            autocomplete="email"
            required
          />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter Password"
            autocomplete="new-password"
            required
          />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            autocomplete="new-password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block col-6 mt-5">
          Register
        </button>
        <p class="lead mt-4" style="width: 300px; margin-left: 72px;">
          Have An Account?
          <router-link :to="{ name: 'signin' }">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confrimPassword: this.confirmPassword
      };
      console.log(JSON.stringify(data));
    }
  }
};
</script>

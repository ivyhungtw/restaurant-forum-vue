<template>
  <div class="container mt-5 pt-5">
    <div class="card card-body">
      <h1 class="text-center mt-3">Register</h1>
      <vee-form
        :validation-schema="schema"
        action="/users/register"
        method="POST"
        class="row d-flex flex-column align-items-center"
        @submit="handleSubmit"
      >
        <div class="form-group col-8 mt-3">
          <label for="name">Name</label>
          <vee-field
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
          <ErrorMessage class="text-red" name="name" />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="email">Email</label>
          <vee-field
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            autocomplete="email"
            required
          />
          <ErrorMessage class="text-red" name="email" />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="password">Password</label>
          <vee-field
            id="password"
            name="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter Password"
            autocomplete="new-password"
            required
          />
          <ErrorMessage class="text-red" name="password" />
        </div>
        <div class="form-group col-8 mt-3">
          <label for="confirmPassword">Confirm Password</label>
          <vee-field
            id="confirmPassword"
            name="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            autocomplete="new-password"
            required
          />
          <ErrorMessage class="text-red" name="confirmPassword" />
        </div>
        <button type="submit" class="btn btn-red btn-block col-6 mt-5" :disabled="isProcessing">
          Register
        </button>
        <p class="lead mt-4" style="width: 300px; margin-left: 72px;">
          Have An Account?
          <router-link :to="{ name: 'signin' }">Login</router-link>
        </p>
      </vee-form>
    </div>
  </div>
</template>

<script>
import authenticationAPI from '../apis/authentication';
import { Toast } from '../utils/helpers';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isProcessing: false,
      schema: {
        name: 'required|min:3|max:50',
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:32',
        confirmPassword: 'passwords_mismatch:@password'
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.name || !this.email || !this.password || !this.confirmPassword) {
          return Toast.fire({
            icon: 'warning',
            title: 'Please fill out all fields.'
          });
        }

        if (this.password !== this.confirmPassword) {
          return Toast.fire({
            icon: 'warning',
            title: 'Password and confirmPassword do not match.'
          });
        }

        this.isProcessing = true;

        const { data } = await authenticationAPI.signup({
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });

        if (data.status !== 'success') {
          this.isProcessing = false;
          if (data.status === 'error') {
            return Toast.fire({
              icon: 'error',
              title: data.message
            });
          }
          throw new Error(data.message);
        }

        Toast.fire({
          icon: 'success',
          title: data.message
        });

        return this.$router.push({ name: 'signin' });
      } catch (err) {
        this.isProcessing = false;
        return Toast.fire({
          icon: 'warning',
          title: 'Unable to create an account, please try again later.'
        });
      }
    }
  }
};
</script>

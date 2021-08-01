<template>
  <div id="restaurant-forum">
    <navbar />
    <main class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

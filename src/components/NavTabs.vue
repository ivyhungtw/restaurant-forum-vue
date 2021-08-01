<template>
  <ul class="nav nav-tabs mb-4">
    <li v-for="tab in tabs" :key="tab.title" class="nav-item">
      <router-link :to="{ name: tab.pathName }" class="nav-link">
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
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
  }
};
</script>

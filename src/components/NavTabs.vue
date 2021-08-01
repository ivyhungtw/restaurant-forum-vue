<template>
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item">
      <router-link :to="{ name: 'restaurants' }" class="nav-link">
        Home
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'restaurants-feed' }" class="nav-link">
        News Feed
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'restaurants-top' }" class="nav-link">
        Top Restaurants
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'users-top' }" class="nav-link">
        Top Users
      </router-link>
    </li>
  </ul>
</template>

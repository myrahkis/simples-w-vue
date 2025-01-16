<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="nav">
    <ul>
      <RouterLink to="/todos">
        <li>Todos</li>
      </RouterLink>
      <RouterLink to="/wiki">
        <li>Wiki</li>
      </RouterLink>
      <RouterLink to="/posts">
        <li>Posts</li>
      </RouterLink>
      <RouterLink to="/calculator">
        <li>Calculator</li>
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
</style>

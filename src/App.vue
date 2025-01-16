<script setup>
import { RouterView } from 'vue-router'
import Navbar from './ui/Navbar.vue';
</script>

<template>
  <nav>
    <Navbar />
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>

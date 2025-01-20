<script setup></script>

<template>
  <input
    class="input u-mr-sm"
    type="text"
    placeholder="Search by title"
    :value="$store.state.posts.searchQuery"
    @input="$store.commit('posts/setSearchQuery', $event.target.value)"
  />
</template>

<style>
.u-mr-sm {
  margin-right: 0.5rem;
}
</style>

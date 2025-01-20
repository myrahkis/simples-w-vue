<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const searchQuery = computed(() => store.state.posts.searchQuery)
const setSearchQuery = (value) => store.commit('posts/setSearchQuery', value)
</script>

<template>
  <input
    class="input u-mr-sm"
    type="text"
    placeholder="Search by title"
    :value="searchQuery"
    @input="setSearchQuery($event.target.value)"
  />
</template>

<style>
.u-mr-sm {
  margin-right: 0.5rem;
}
</style>

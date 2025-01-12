<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchResult = ref([])
const isLoading = ref(false)
const error = ref(null)

const url =
  'https://ru.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&format=json&origin=*&srlimit=50'

async function fetchFromWiki(query) {
  try {
    isLoading.value = true

    const res = await fetch(`${url}&srsearch=${query}`)

    if (!res.ok) throw new Error("Couldn't fetch search data.")

    const data = await res.json()

    if (data.query.search.length === 0) throw new Error(`${query} couldn't be found.`)

    searchResult.value = data.query.search
    error.value = ''
  } catch (err) {
    console.error(err.message)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

function submitHandle() {
  if (searchQuery.value === '') return

  fetchFromWiki(searchQuery.value)
}
</script>

<template>
  <h1>Wiki</h1>
  <form @submit.prevent="submitHandle">
    <input type="text" v-model="searchQuery" />
    <button type="submit">Fetch</button>
  </form>

  <ul>
    <li v-for="result in searchResult" :key="result.pageid">
      {{ result.title }}
    </li>
  </ul>
</template>

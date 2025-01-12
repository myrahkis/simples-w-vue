<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchResult = ref([])
const isLoading = ref(false)
const error = ref(null)

const selectedPage = ref('')

const url = 'https://ru.wikipedia.org/w/api.php?format=json&origin=*'
const searchParams = '&list=search&prop=info&inprop=url&action=query&srlimit=50&srsearch='
const pageParams = '&action=parse&page='

async function fetchSearchQuery(query) {
  try {
    isLoading.value = true

    const res = await fetch(`${url}${searchParams}${query}`)

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

async function fetchPage(title) {
  try {
    isLoading.value = true

    const res = await fetch(`${url}${pageParams}${title}`)

    if (!res.ok) throw new Error("Couldn't get page code.")

    const data = await res.json()

    if (!data.parse) throw new Error(`Page '${title}' couldn't be found.`)

    // console.log(data.parse)
    selectedPage.value = data.parse.text['*']

    const container = document.getElementById('page-content')

    if (container) container.innerHTML = selectedPage.value

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

  fetchSearchQuery(searchQuery.value)
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
      <a type="button" target="_blank" @click="fetchPage(result.title)">{{ result.title }}</a>
    </li>
  </ul>

  <div id="page-content"></div>
</template>

import { watch, onMounted, ref } from 'vue'

function useLocalStorage(key) {
  const list = ref([])

  onMounted(() => {
    let stored = localStorage.getItem(key)

    if (stored !== null) {
      list.value = JSON.parse(stored)
    }
  })

  watch(
    list,
    (newTodos) => {
      localStorage.setItem(key, JSON.stringify(newTodos))
    },
    { deep: true },
  )

  return { list }
}

export default useLocalStorage

import { onMounted, ref } from 'vue'

function useIntersection(action, MAX_PAGES, page) {
  const observerRef = ref(null)

  onMounted(function () {
    const options = {
      root: document.querySelector('.main'),
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = function (entries) {
      if (entries[0].isIntersecting && page.value <= MAX_PAGES) {
        action()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(observerRef.value)
  })

  return observerRef
}

export default useIntersection

<script setup>
const { onSubmit } = defineProps({
  searchQuery: String,
  onSubmit: Function,
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <input
      type="text"
      @input="$emit('update:searchQuery', $event.target.value)"
      @focus="$emit('focus')"
      class="input"
    />
    <button type="submit" class="find-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 -3 50 50"
      >
        <path
          d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
        ></path>
      </svg>
    </button>
  </form>
</template>

<style scoped>
.form {
  position: relative;
  display: flex;
  justify-content: center;

  .input {
    background-color: white;
    outline-color: var(--dark-bg-color);
    outline-offset: -2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: all 0.15s;
  }
}

.find-btn {
  background-color: var(--dark-bg-color);
  padding: 1rem 1.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: all 0.15s;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: var(--text-color);
  }

  &:hover {
    box-shadow: 0 0.5rem 0.6rem #434358d7;
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 0.3rem 0.3rem #434358d7;
  }
}
</style>

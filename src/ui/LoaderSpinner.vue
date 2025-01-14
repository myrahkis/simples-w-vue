<template>
  <div class="loader-wrapper">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.297);
  backdrop-filter: blur(2px);
}
.loader {
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1.3rem solid var(--neon-green-color);
  border-left-color: var(--neon-pink-color);
  animation: loader 3s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

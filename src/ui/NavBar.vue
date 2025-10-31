<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
  <div class="navigation">
    <input
      type="checkbox"
      class="checkbox"
      id="navi-toggle"
      :checked="isOpen"
      @click="isOpen = !isOpen"
    />
    <label for="navi-toggle" class="menu-btn">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="800px" height="800px">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M 19 4 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 0 -2 h 16 a 1 1 0 0 1 1 1 Z m 0 6 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 1 1 0 -2 h 16 a 1 1 0 0 1 1 1 Z m -1 7 a 1 1 0 1 0 0 -2 H 2 a 1 1 0 1 0 0 2 h 16 Z"
          />
        </svg>
      </span>
    </label>
    <div class="nav-bg">&nbsp;</div>
    <div class="nav-list">
      <ul class="links">
        <RouterLink to="/todos">
          <li class="link" @click="isOpen = false">Todos</li>
        </RouterLink>
        <RouterLink to="/wiki">
          <li class="link" @click="isOpen = false">Wiki</li>
        </RouterLink>
        <RouterLink to="/posts">
          <li class="link" @click="isOpen = false">Posts</li>
        </RouterLink>
        <RouterLink to="/calculator">
          <li class="link" @click="isOpen = false">Calculator</li>
        </RouterLink>
        <RouterLink to="/weather">
          <li class="link" @click="isOpen = false">Weather</li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1400;
}
.menu-btn,
.nav-list {
  pointer-events: auto;
}
.checkbox {
  display: none;
}
.menu-btn {
  position: absolute;
  z-index: 1500;
  display: flex;
  align-items: center;
  cursor: pointer;
  top: 0.5rem;
  left: 5rem;
  background-color: var(--neon-green-color);
  padding: 0.3rem 0.7rem;
  border-radius: 2rem;
  transition: all 0.3s;

  svg {
    width: 3.5rem;
    height: 3.5rem;
    color: white;
  }

  &:hover {
    background-color: var(--dark-bg-color);

    svg {
      color: var(--neon-green-color);
    }
  }

  @media screen and (max-width: 680px) {
    top: 1rem;
    left: 3rem;

    svg {
      width: 3rem;
      height: 3rem;
    }
  }
  @media screen and (max-width: 562px) {
    top: 0.5rem;
    left: 2rem;
  }
  @media screen and (max-width: 451px) {
    left: 1rem;
  }
}

.nav-bg {
  position: absolute;
  top: 0.8rem;
  left: 5.3rem;
  height: 3.8rem;
  width: 3.8rem;
  border-radius: 50%;
  z-index: 1000;
  background-image: radial-gradient(var(--neon-green-color), var(--neon-pink-color));
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 680px) {
    top: 1rem;
    left: 3.1rem;
    height: 3.8rem;
    width: 3.8rem;
  }
  @media screen and (max-width: 562px) {
    top: 0.5rem;
    left: 2.1rem;
  }
  @media screen and (max-width: 451px) {
    left: 1.1rem;
  }
}

.checkbox:checked ~ .nav-bg {
  overflow: hidden !important;
  transform: scale(90);

  @media screen and (max-width: 680px) {
    transform: scale(45);
  }
}

.nav-list {
  position: fixed;
  z-index: 1500;
  top: 50%;
  left: 50%;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -50%) scale(0.8);
  transition:
    transform 0.7s,
    opacity 0.7s,
    visibility 0s linear 0.7s;
}
.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: upper-roman;
  font-size: 3rem;
}

.checkbox:checked ~ .nav-list {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
  transition:
    transform 0.7s,
    opacity 0.7s,
    visibility 0s;
}

.link {
  padding: 1rem;
  color: var(--dark-bg-color);
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 20%,
    var(--neon-green-color) 20%
  );
  background-size: 600%;
  transition: all 0.3s;

  &:hover {
    background-size: 100%;

    transform: translateX(-1.5rem);
  }
}
</style>

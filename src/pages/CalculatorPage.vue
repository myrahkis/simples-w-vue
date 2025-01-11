<script setup></script>

<template>
  <div class="container">
    <div class="calculator-grid">
      <input class="display" />
      <button class="cell">&lArr;</button>
      <button class="cell">C</button>
      <button class="cell mod">MOD</button>
      <button class="cell">/</button>
      <button class="cell">7</button>
      <button class="cell">8</button>
      <button class="cell">9</button>
      <button class="cell">*</button>
      <button class="cell">4</button>
      <button class="cell">5</button>
      <button class="cell">6</button>
      <button class="cell">-</button>
      <button class="cell">1</button>
      <button class="cell">2</button>
      <button class="cell">3</button>
      <button class="cell">+</button>
      <button class="cell zero">0</button>
      <button class="cell">.</button>
      <button class="cell equals">=</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.calculator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 1fr);
  max-width: 45%;
  justify-content: center;
  border: 2px solid var(--neon-green-color);
}
.display {
  grid-column: 1 / -1;
  grid-row: 1 / 3;
  margin: 1.5rem;
  padding: 1rem;
  font-size: 2.3rem;
}
.cell {
  border-radius: 0;
  background-color: transparent;
  border: 1px solid var(--neon-green-color);
  transition: all 0.2s;

  &:last-child {
    outline: 2px solid var(--dark-bg-color);
    outline-offset: -3px;
  }

  &:hover {
    transform: translateY(-3px);
    background-color: var(--neon-green-color);
    color: var(--dark-bg-color);
  }
  &:active {
    transform: translateY(0);
  }
}
.zero {
  grid-column: 1 / 3;
}
.equals {
  background-color: var(--neon-green-color);
  color: var(--dark-bg-color);
}
</style>

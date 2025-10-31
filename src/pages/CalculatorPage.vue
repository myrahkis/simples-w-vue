<script setup>
import CalcButtons from '@/features/calculator/CalcButtons.vue'
import { evaluate } from 'mathjs'
import { nextTick, ref, watch } from 'vue'

const expression = ref('0')
const result = ref('')

function isValidExpression(expr) {
  try {
    // если посчиталось с ошибкой (напр, выражение заканчивается оператором), то выражение не корректно
    evaluate(expr || '0')
    return true
  } catch {
    return false
  }
}

watch(
  expression,
  () => {
    if (isValidExpression(expression.value)) {
      result.value = evaluate(expression.value).toString()
    }
  },
  { immediate: true },
)

function addToDisplay(value) {
  if (expression.value === '0') {
    expression.value = value
  } else {
    expression.value += value
  }
}

function clearDisplay() {
  expression.value = '0'
  result.value = ''
}

function eraseChar() {
  expression.value = expression.value.slice(0, -1) || '0'
}

function doneCalculating() {
  if (result.value !== '') {
    expression.value = result.value

    // nextTick для очистки result после завершения обновлений
    // иначе watch перезаписывает значение
    nextTick(() => {
      result.value = ''
    })
  }
}
</script>

<template>
  <header class="header">
    <h1 class="header--green">Simple calculator</h1>
  </header>
  <main class="container">
    <div class="calculator-grid">
      <input class="display" type="text" v-model="expression" disabled />
      <p class="result-cell">{{ result }}</p>
      <CalcButtons
        :onAdd="addToDisplay"
        :onErase="eraseChar"
        :onClear="clearDisplay"
        :onEquals="doneCalculating"
      />
    </div>
  </main>
</template>

<style scoped>
/* .header {
  font-size: 1.6rem;

  @media screen and (max-width: 562px) {
    font-size: 1.5rem;
  }
} */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 89vh;
}
.calculator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr auto repeat(5, 1fr);
  max-width: 90%;
  justify-content: center;
  border: 2px solid var(--neon-green-color);
}
.display {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  margin: 1.5rem;
  padding: 1rem;
  font-size: 2.3rem;
  text-align: right;
}
.result-cell {
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  padding: 1.5rem;
  padding-top: 0;
  font-size: 3rem;
  text-align: right;
  height: 5rem;
}
</style>

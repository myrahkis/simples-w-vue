<script setup>
import { computed, ref, watch } from 'vue'

const cityName = ref('')
const datas = ref(null)
const selectedCity = ref({})
const weatherData = ref(null)
const dailyForecast = ref(null)

const citiesData = computed(() =>
  datas.value?.map((city) => {
    return {
      name: city.name,
      countryCode: city.country_code,
      state: city.admin1 || '',
      timezone: city.timezone,
      lat: city.latitude,
      lon: city.longitude,
    }
  }),
)

async function getCities() {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName.value}&count=10&language=en&format=json`,
    )

    if (!res.ok) throw new Error("Couldn't fetch cities")

    const data = await res.json()

    datas.value = data.results
    console.log(data.results)
  } catch (err) {
    console.error(err)
  }
}

async function getCityWeather(newCity) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${newCity?.lat}&longitude=${newCity?.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    )

    if (!res.ok) throw new Error("couldn't fetch weather")

    const data = await res.json()
    weatherData.value = data
  } catch (err) {
    console.error(err)
  }
}
async function getDailyForecast(cityName) {
  const todayStr = new Date().toISOString().split('T')[0]
  const today = new Date()
  today.setDate(today.getDate() + 7)
  const nextWeekStr = today.toISOString().split('T')[0]

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityName?.lat}&longitude=${cityName?.lon}&hourly=temperature_2m&start_date=${todayStr}&end_date=${nextWeekStr}`,
    )

    if (!res.ok) throw new Error("Couldn't fetch daily forecast.")

    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err.message)
  }
}

function selectCityHandle(city) {
  selectedCity.value = city
}

watch(selectedCity, (newCity) => {
  getCityWeather(newCity)
  getDailyForecast(newCity)
})
</script>

<template>
  <div style="margin-top: 10%">
    <label for="city-search"></label>
    <input type="text" name="city-search" v-model="cityName" />
    <button @click="getCities">get data</button>
    <ul>
      <li v-for="(city, index) in citiesData" :key="index" @click="selectCityHandle(city)">
        {{ city?.name }}, {{ city?.state }}, {{ city?.countryCode }}
      </li>
    </ul>
    <h1>{{ selectedCity.name }}</h1>
  </div>
  <div v-if="weatherData">
    <h2>
      Weather now: {{ weatherData?.current.temperature_2m }}
      {{ weatherData?.current_units.temperature_2m }}
    </h2>
  </div>
</template>

<style scoped></style>

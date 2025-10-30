<script setup>
import { identity } from 'mathjs'
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
    // console.log(data.results)
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
    // console.log(data)
    dailyForecast.value = data
    // console.log(dailyForecast.value)
  } catch (err) {
    console.error(err.message)
  }
}

function selectCityHandle(city) {
  selectedCity.value = city
}

function formatForecastByHourly(forecast) {
  const hourly = forecast.value?.hourly
  if (!hourly) return []

  const times = hourly.time || []
  const temps = hourly.temperature_2m || []

  const timeTempArr = times.map((t, i) => ({
    time: t,
    temp: `${temps[i]}${forecast.value?.hourly_units?.temperature_2m}`,
  }))

  const grouped = timeTempArr.reduce((acc, item) => {
    const dateObj = new Date(item.time)
    const date = dateObj.toLocaleDateString()

    if (!acc[date]) acc[date] = []

    acc[date].push({
      time: dateObj.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temp: item.temp,
    })
    return acc
  }, {})

  console.log(
    Object.entries(grouped).map(([date, hours]) => ({
      date,
      hours,
    })),
  )
  return Object.entries(grouped).map(([date, hours]) => ({
    date,
    hours,
  }))
}

const dailyForecastFormated = computed(() => formatForecastByHourly(dailyForecast))
const forecastToday = computed(() => dailyForecastFormated.value[0])
const forecastForWeek = computed(() => dailyForecastFormated.value?.filter((_, idx) => idx !== 0))

watch(selectedCity, (newCity) => {
  getCityWeather(newCity)
  getDailyForecast(newCity)
})
</script>

<template>
  <header class="header header--green">
    <h1>Weather</h1>
    <div class="input-wrapper">
      <input type="text" name="city-search" v-model="cityName" class="input" />
      <button @click="getCities" class="find-btn">
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
      <ul class="result-list" v-if="forecastForWeek.length === 0">
        <li v-for="(city, index) in citiesData" :key="index" @click="selectCityHandle(city)">
          {{ city?.name }}, {{ city?.state }}, {{ city?.countryCode }}
        </li>
      </ul>
    </div>
  </header>
  <div class="city-results-wrapper">
    <span>{{ forecastToday?.date }}</span>
    <h2 class="selected-city" v-if="selectedCity.name && weatherData">
      {{ selectedCity.name }}: {{ weatherData?.current.temperature_2m }}
      {{ weatherData?.current_units.temperature_2m }}
    </h2>
    <ul class="today-dayly">
      <li v-for="({ time, temp }, index) in forecastToday?.hours" :key="index">
        <span>{{ time }}</span>
        <span>{{ temp }}</span>
      </li>
    </ul>
    <div class="dayly-forecast-wrapper" v-if="forecastForWeek">
      <h3 class="dayly-forecast-heading">Weather this week:</h3>
      <ul class="dayly-forecast">
        <li v-for="(day, index) in forecastForWeek" :key="index" class="dayly-forecast-day">
          <span>{{ day.date }}</span>
          <div v-for="({ time, temp }, index) in day.hours" :key="index">
            {{ time }}: {{ temp }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* .weather-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  padding: 2rem;
} */
.header {
  font-size: 2rem;
}
.input-wrapper {
  position: relative;
  display: flex;
  width: fit-content;
  margin: 0 auto;
}
.input {
  background-color: white;
  outline-color: var(--dark-bg-color);
  outline-offset: -2px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: all 0.15s;
}
.result-list {
  list-style: none;
  position: absolute;
  overflow: hidden;
  top: 100%;
  left: 0.8em;
  right: 0.8em;
  background-color: var(--dark-bg-color);
  border: 1px solid var(--neon-green-color);
  border-top: none;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  li {
    cursor: pointer;
    padding: 0.8rem 0.5rem;
    transition: all 0.2s;

    &:not(&:last-child) {
      border-bottom: 1px solid #042c17;
    }

    &:hover {
      background-color: var(--neon-green-color);
    }
  }
}

.today-dayly {
  overflow-y: auto;
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  /* justify-content: center; */
  width: 100%;
  padding: 2rem;
  border: 1px solid var(--neon-green-color);
  border-radius: 1rem;

  scrollbar-width: thin;

  li {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    gap: 0.8rem;
  }
}

.city-results-wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  gap: 1rem;

  .selected-city {
    font-size: 2.5rem;
  }
}

.dayly-forecast-wrapper {
  margin: 0 auto;

  .dayly-forecast-heading {
    font-size: 2.2rem;
  }
}
.dayly-forecast {
  list-style: none;
  display: flex;
  gap: 1rem;
}
.dayly-forecast-day {
  border: 1px solid var(--neon-green-color);
  border-radius: 1rem;

  div {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
  }

  span {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--neon-green-color);
  }
}
</style>

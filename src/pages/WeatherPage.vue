<script setup>
import { getCities, getCityWeather, getDailyForecast } from '@/services/WeatherApi'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const cityName = ref('')
const datas = ref([])
const selectedCity = ref({})
const weatherData = ref(null)
const dailyForecast = ref(null)
const isInputFocused = ref(false)
const hourRefs = ref([])

const weatherMap = new Map([
  [0, 'Clear sky'],
  [1, 'Mainly clear'],
  [2, 'Partly cloudy'],
  [3, 'Overcast'],
  [45, 'Fog'],
  [48, 'Depositing rime fog'],
  [51, 'Light drizzle'],
  [53, 'Moderate drizzle'],
  [55, 'Dense drizzle'],
  [56, 'Light freezing drizzle'],
  [57, 'Dense freezing drizzle'],
  [61, 'Slight rain'],
  [63, 'Moderate rain'],
  [65, 'Heavy rain'],
  [66, 'Light freezing rain'],
  [67, 'Heavy freezing rain'],
  [71, 'Slight snow fall'],
  [73, 'Moderate snow fall'],
  [75, 'Heavy snow fall'],
  [77, 'Snow grains'],
  [80, 'Slight rain showers'],
  [81, 'Moderate rain showers'],
  [82, 'Violent rain showers'],
  [85, 'slight snow showers'],
  [86, 'Heavy snow showers'],
  [95, 'Slight thunderstorm'],
  [96, 'Thunderstorm with slight hail'],
  [99, 'Thunderstorm with heavy hail'],
])

async function handleSearch() {
  const cities = await getCities(cityName.value)
  datas.value = cities
}
async function handleCurrentData() {
  const cities = await getCityWeather(selectedCity.value.lat, selectedCity.value.lon)
  weatherData.value = cities
}
async function handleDailyData() {
  const cities = await getDailyForecast(selectedCity.value.lat, selectedCity.value.lon)
  dailyForecast.value = cities
}

function handleFocus() {
  isInputFocused.value = true
}
function handleBlur(event) {
  if (!event.target.closest('.header') && !event.target.closest('.result-list')) {
    isInputFocused.value = false
  }
}

function getActiveHour(time) {
  const now = new Date().toLocaleTimeString().slice(0, 2)
  return time.slice(0, 2) === now
}
function getPastHours(time) {
  const now = new Date().toLocaleTimeString().slice(0, 2)
  return time.slice(0, 2) < now
}
function selectCityHandle(e) {
  if (e.target.nodeName !== 'LI') return

  const idx = +e.target.dataset.index

  selectedCity.value = citiesData.value[idx]
  isInputFocused.value = false
}

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
const dayHourlyFormatted = computed(() => {
  const hourly = weatherData.value?.hourly
  if (!hourly) return []

  return hourly.time.map((t, i) => ({
    time: new Date(t).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temp: `${Math.round(hourly.temperature_2m[i])}${weatherData.value?.hourly_units?.temperature_2m}`,
    rain: `${hourly.precipitation_probability[i]}${weatherData.value?.hourly_units?.precipitation_probability}`,
    wind: `${hourly.wind_speed_10m[i]}${weatherData.value?.hourly_units?.wind_speed_10m}`,
  }))
})
const dailyForecastFormatted = computed(() => {
  const daily = dailyForecast.value?.daily
  if (!daily) return []

  return daily.time.map((t, i) => ({
    date: new Date(t).toLocaleDateString(),
    tempMin: `${Math.round(daily.temperature_2m_min[i])}${dailyForecast.value?.daily_units?.temperature_2m_min}`,
    tempMax: `${Math.round(daily.temperature_2m_max[i])}${dailyForecast.value?.daily_units?.temperature_2m_min}`,
    rain: `${daily.precipitation_probability_max[i]}${dailyForecast.value?.daily_units?.precipitation_probability_max}`,
    wind: `${daily.wind_speed_10m_max[i]}${dailyForecast.value?.daily_units?.wind_speed_10m_max}`,
  }))
})

watch(selectedCity, (newCity) => {
  handleCurrentData(newCity.lat, newCity.lon)
  handleDailyData(newCity.lat, newCity.lon)
})
watch(
  dayHourlyFormatted,
  async (newVal) => {
    if (!newVal || newVal.length === 0) return
    await nextTick()
    const active = hourRefs.value.find((el) => el && el.classList.contains('active-hour'))

    if (active) {
      active.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  },
  { immediate: true, deep: true },
)
onMounted(() => {
  document.addEventListener('click', handleBlur)
})
onUnmounted(() => {
  document.removeEventListener('click', handleBlur)
})
</script>

<template>
  <header class="header header--green">
    <h1>Weather</h1>
    <div class="input-wrapper">
      <input
        class="input"
        type="text"
        name="city-search"
        v-model="cityName"
        @focus="handleFocus"
        @keypress.enter="handleSearch"
      />
      <button @click="handleSearch" class="find-btn">
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
      <ul
        class="result-list"
        v-if="isInputFocused && datas.length > 0"
        @click="selectCityHandle($event)"
      >
        <li v-for="(city, index) in citiesData" :key="index" :data-index="index">
          {{ city?.name }}, {{ city?.state }}, {{ city?.countryCode }}
        </li>
      </ul>
    </div>
  </header>
  <div class="city-results-wrapper">
    <div class="city-results-wrapper--top-centered">
      <div class="days-forecast-wrapper" v-if="weatherData">
        <span class="date">{{ new Date(weatherData?.current.time)?.toLocaleDateString() }}</span>
        <h2 class="selected-city" v-if="selectedCity.name && weatherData">
          {{ selectedCity.name }}
        </h2>
        <span class="current-temp"
          >{{ Math.round(weatherData?.current.temperature_2m)
          }}{{ weatherData?.current_units.temperature_2m }}
        </span>
        <span class="weather-code">{{ weatherMap.get(weatherData?.current.weather_code) }}</span>
        <div class="today-dayly">
          <ul>
            <li
              v-for="({ time, temp, rain, wind }, index) in dayHourlyFormatted"
              :key="index"
              :class="{ 'active-hour': getActiveHour(time), 'past-hour': getPastHours(time) }"
              :ref="(el) => (hourRefs[index] = el)"
            >
              <span>{{ time }}</span>
              <span>{{ temp }}</span>
              <span><img src="/icons/rainIcon.svg" alt="" /> {{ rain }}</span>
              <span><img src="/icons/windIcon.svg" alt="" /> {{ wind }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="dayly-forecast-wrapper" v-if="dailyForecastFormatted">
        <h3 class="dayly-forecast-heading" v-if="dailyForecast">Weather this week:</h3>
        <ul class="dayly-forecast">
          <li
            v-for="({ date, tempMin, tempMax, rain, wind }, index) in dailyForecastFormatted"
            :key="index"
            class="dayly-forecast-day"
          >
            <p>{{ date }}</p>
            <div class="dayly-forecast-hour">
              <span>
                <img src="/icons/minTempIcon.svg" alt="" />
                {{ tempMin }}
              </span>
              <span>
                <img src="/icons/maxTempIcon.svg" alt="" />
                {{ tempMax }}
              </span>
              <span>
                <img src="/icons/rainIcon.svg" alt="" />
                {{ rain }}
              </span>
              <span>
                <img src="/icons/windIcon.svg" alt="" />
                {{ wind }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: 2rem;
  min-height: 8rem;
}
.input-wrapper {
  position: relative;
  display: flex;
  width: fit-content;
  margin: 0 auto;
}
.input {
  font-size: 1.7rem;
  background-color: white;
  outline-color: var(--dark-bg-color);
  outline-offset: -2px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: all 0.15s;
}
.find-btn {
  svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: var(--text-color);
  }
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

.days-forecast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 40%;

  span {
    width: fit-content;
  }

  .selected-city {
    width: fit-content;
    font-size: 3rem;
  }
  .date {
    font-size: 1.5rem;
  }
  .current-temp {
    font-size: 1.5rem;
  }
  .weather-code {
    font-size: 1.8rem;
  }
}

.today-dayly {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;

  scrollbar-width: thin;
  scrollbar-color: #9e219eff var(--dark-bg-color);
  scroll-snap-type: x proximity;

  ul {
    list-style: none;
    display: flex;
    gap: 3rem;
    padding: 2rem;
    max-width: 100% !important;
  }

  ul li {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    gap: 1rem;
    scroll-snap-align: start;

    span {
      display: inline-flex;
      gap: 0.3rem;
      align-items: center;
      width: max-content;

      &:nth-child(2) {
        font-weight: 600;
        font-size: 1.1em;
      }
    }
  }
}
.active-hour {
  border: 1px solid var(--neon-green-color);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}
.past-hour {
  filter: brightness(0.6);
}

.city-results-wrapper {
  display: flex;
  padding: 3rem;
  min-height: calc(100vh - 8rem - 3rem);
  align-items: center;

  margin: 0 auto;

  .city-results-wrapper--top-centered {
    display: flex;
    justify-content: center;
    gap: 5rem;
    width: 100%;
  }
}

.dayly-forecast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50%;

  .dayly-forecast-heading {
    font-size: 2.2rem;
  }
}
.dayly-forecast {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.dayly-forecast-day {
  display: flex;
  align-items: center;
  gap: 8rem;
  border: 1px solid var(--neon-green-color);
  border-radius: 1rem;
  padding: 1rem 1.5rem;

  p {
    font-size: 1.5rem;
  }

  div {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    width: max-content;
  }
}

@media (max-width: 945px) {
  .city-results-wrapper--top-centered {
    flex-direction: column;
  }
  .days-forecast-wrapper {
    width: 100%;
  }
  .dayly-forecast-wrapper {
    width: fit-content;
    max-width: fit-content;
    margin: 0 auto;
  }
}
@media (max-width: 520px) {
  .today-dayly {
    ul li {
      font-size: clamp(1rem, 1.5vw, 1.5rem);

      span {
        &:nth-child(2) {
          font-size: clamp(0.9em, 1vw, 1.1em);
        }
      }
    }
  }
  .dayly-forecast-day {
    gap: 3rem;
    p {
      font-size: clamp(1rem, 1.5vw, 1.5rem);
    }
    span {
      font-size: clamp(1rem, 1.5vw, 1.5rem);
    }
  }
  .days-forecast-wrapper {
    .selected-city {
      font-size: clamp(2rem, 3vw, 3rem);
    }
    .date {
      font-size: clamp(1rem, 1.5vw, 1.5rem);
    }
    .current-temp {
      font-size: clamp(1rem, 1.5vw, 1.5rem);
    }
    .weather-code {
      font-size: clamp(1.2rem, 2vw, 1.8rem);
    }
  }
  .result-list {
    font-size: clamp(1.5rem, 2vw, 2rem);
  }
}
@media (max-width: 400px) {
  .dayly-forecast-day {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }
}
</style>

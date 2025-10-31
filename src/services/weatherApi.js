const citiesUrl = 'https://geocoding-api.open-meteo.com/v1/'
const weatherUrl = 'https://api.open-meteo.com/v1/forecast'

export async function getCities(cityName) {
  if (!cityName) return

  try {
    const res = await fetch(`${citiesUrl}search?name=${cityName}&count=10&language=en&format=json`)

    if (!res.ok) throw new Error("Couldn't fetch cities")

    const data = await res.json()

    return data.results
  } catch (err) {
    console.error(err)
  }
}

export async function getCityWeather(lat, lon) {
  if (!lat || !lon) return

  try {
    const res = await fetch(
      `${weatherUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability,wind_speed_10m&forecast_days=1`,
    )

    if (!res.ok) throw new Error("couldn't fetch weather")

    const data = await res.json()

    return data
  } catch (err) {
    console.error(err)
  }
}

export async function getDailyForecast(lat, lon) {
  if (!lat || !lon) return

  try {
    const res = await fetch(
      `${weatherUrl}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max`,
    )

    if (!res.ok) throw new Error("Couldn't fetch daily forecast.")

    const data = await res.json()

    return data
  } catch (err) {
    console.error(err)
  }
}

import { fetchWeatherApi } from 'openmeteo';
import axios from 'axios'

const baseUrl = "https://api.open-meteo.com/v1/forecast";
const weatherOptions = "&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1"

const getWeather = (latlng) => {
    const request = axios.get(`${baseUrl}?latitude=${latlng[0]}&longitude=${latlng[1]}${weatherOptions}`)
    return request.then(response => response.data)
}

export default { getWeather }
// Weather API utility using OpenWeatherMap

export interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  weatherMain: string;
}

interface CityConfig {
  name: string;
  lat: number;
  lon: number;
}

const cities: CityConfig[] = [
  { name: 'Praia Grande', lat: -24.0084, lon: -46.4122 },
  { name: 'Santos', lat: -23.9608, lon: -46.3339 },
  { name: 'São Vicente', lat: -23.9631, lon: -46.3922 },
];

let currentCityIndex = 0;

export async function fetchWeather(
  apiKey: string,
  cityIndex: number = 0
): Promise<WeatherData> {
  const city = cities[cityIndex];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();

    return {
      city: city.name,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].main),
      weatherMain: data.weather[0].main,
    };
  } catch {
    return {
      city: city.name,
      temp: 0,
      feelsLike: 0,
      humidity: 0,
      windSpeed: 0,
      tempMin: 0,
      tempMax: 0,
      description: 'Indisponível',
      icon: '🌤',
      weatherMain: 'Clear',
    };
  }
}

function getWeatherIcon(weatherMain: string): string {
  const icons: Record<string, string> = {
    Clear: '☀️',
    Clouds: '⛅',
    Rain: '🌧',
    Drizzle: '🌦',
    Thunderstorm: '⛈',
    Snow: '❄️',
    Mist: '🌫',
    Smoke: '🌫',
    Haze: '🌫',
    Dust: '🌫',
    Fog: '🌫',
    Sand: '🌫',
    Ash: '🌫',
    Squall: '💨',
    Tornado: '🌪',
  };

  return icons[weatherMain] || '🌤';
}

export function getNextCityIndex(): number {
  currentCityIndex = (currentCityIndex + 1) % cities.length;
  return currentCityIndex;
}

export function resetCityIndex(): void {
  currentCityIndex = 0;
}

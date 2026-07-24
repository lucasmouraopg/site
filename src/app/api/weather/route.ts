import { NextResponse } from 'next/server';

interface CityConfig {
  name: string;
  lat: number;
  lon: number;
}

const DEFAULT_CITIES: CityConfig[] = [
  { name: 'Praia Grande', lat: -24.0084, lon: -46.4122 },
  { name: 'Santos', lat: -23.9608, lon: -46.3339 },
  { name: 'São Vicente', lat: -23.9631, lon: -46.3922 },
  { name: 'Cubatão', lat: -23.8953, lon: -46.4233 },
  { name: 'Guarujá', lat: -23.9811, lon: -46.2578 },
  { name: 'Vale do Ribeira', lat: -24.4833, lon: -47.9917 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
];

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

function getWeatherIcon(main: string): string {
  return icons[main] || '🌤';
}

interface WeatherResponse {
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

async function fetchCityWeather(
  apiKey: string,
  city: CityConfig
): Promise<WeatherResponse> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=pt_br`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) throw new Error('Weather API error');

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

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const visitorCity = searchParams.get('visitorCity');

  const cities = [...DEFAULT_CITIES];

  if (visitorCity) {
    const alreadyExists = cities.some(
      (c) => c.name.toLowerCase() === visitorCity.toLowerCase()
    );
    if (!alreadyExists) {
      cities.push({ name: visitorCity, lat: 0, lon: 0 });
    }
  }

  const results = await Promise.allSettled(
    cities.map((city) => {
      if (city.lat === 0 && city.lon === 0) {
        return Promise.resolve({
          city: city.name,
          temp: 0,
          feelsLike: 0,
          humidity: 0,
          windSpeed: 0,
          tempMin: 0,
          tempMax: 0,
          description: 'Geolocalização indisponível',
          icon: '🌤',
          weatherMain: 'Clear',
        } as WeatherResponse);
      }
      return fetchCityWeather(apiKey, city);
    })
  );

  const weatherData: WeatherResponse[] = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return {
      city: cities[index].name,
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
  });

  return NextResponse.json(weatherData);
}

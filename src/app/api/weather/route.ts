import { NextResponse } from 'next/server';

const cities = [
  { name: 'Praia Grande', lat: -24.0084, lon: -46.4122 },
  { name: 'Santos', lat: -23.9608, lon: -46.3339 },
  { name: 'São Vicente', lat: -23.9631, lon: -46.3922 },
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

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const cityIndex = Math.min(Math.max(parseInt(searchParams.get('city') || '0', 10) || 0, 0), cities.length - 1);
  const city = cities[cityIndex];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=pt_br`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();

    return NextResponse.json({
      city: city.name,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      description: data.weather[0].description,
      icon: icons[data.weather[0].main] || '🌤',
      weatherMain: data.weather[0].main,
    });
  } catch {
    return NextResponse.json({
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
    });
  }
}

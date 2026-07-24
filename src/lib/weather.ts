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

export interface CityConfig {
  name: string;
  lat: number;
  lon: number;
}

export const ALL_CITIES: CityConfig[] = [
  { name: 'Praia Grande', lat: -24.0084, lon: -46.4122 },
  { name: 'Santos', lat: -23.9608, lon: -46.3339 },
  { name: 'São Vicente', lat: -23.9631, lon: -46.3922 },
  { name: 'Cubatão', lat: -23.8953, lon: -46.4233 },
  { name: 'Guarujá', lat: -23.9811, lon: -46.2578 },
  { name: 'Vale do Ribeira', lat: -24.4833, lon: -47.9917 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
];

export function getWeatherIcon(weatherMain: string): string {
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

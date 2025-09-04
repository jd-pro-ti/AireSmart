'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Header from '../../components/header';
import Footer from '../../components/footer';

// Coordenadas de ciudades principales de Michoacán
const ciudades = [
  { nombre: 'Morelia', lat: 19.7008, lng: -101.1844 },
  { nombre: 'Uruapan', lat: 19.4216, lng: -102.0576 },
  { nombre: 'Zamora', lat: 19.9856, lng: -102.2833 },
  { nombre: 'Lázaro Cárdenas', lat: 17.9589, lng: -102.2 },
  { nombre: 'Zitácuaro', lat: 19.4361, lng: -100.3573 },
  { nombre: 'Apatzingán', lat: 19.0833, lng: -102.35 }
];

export default function MapaGoogleMichoacan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [datosCiudades, setDatosCiudades] = useState({});

  // Cargar Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAv0uz48-sIpfzDw2MKVryibebp95izmNU'
  });

  // Llamar datos desde OpenWeather (Clima + Calidad de aire)
  useEffect(() => {
    const fetchDatos = async () => {
      const result = {};
      for (const c of ciudades) {
        try {
          // Clima
          const climaRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${c.lat}&lon=${c.lng}&units=metric&lang=es&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`
          );
          const climaData = await climaRes.json();

          // Calidad de aire
          const aireRes = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${c.lat}&lon=${c.lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`
          );
          const aireData = await aireRes.json();

          result[c.nombre] = {
            clima: climaData.weather?.[0]?.description || 'N/A',
            temp: climaData.main?.temp || '-',
            humedad: climaData.main?.humidity || '-',
            aqi: aireData.list?.[0]?.main?.aqi || null
          };
        } catch {
          result[c.nombre] = { clima: 'N/A', temp: '-', humedad: '-', aqi: null };
        }
      }
      setDatosCiudades(result);
    };

    fetchDatos();
    const interval = setInterval(fetchDatos, 300000); // cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  // Definir color de icono según AQI
  const getIcon = (aqi) => {
    switch (aqi) {
      case 1: return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";   // Bueno
      case 2: return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";  // Moderado
      case 3: return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";  // Poco saludable
      case 4: return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";     // Malo
      case 5: return "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";  // Muy malo
      default: return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";   // Desconocido
    }
  };

  if (!isLoaded) return <p className="text-center mt-10">Cargando mapa…</p>;

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className={`flex-1 flex flex-col items-center pt-20 p-6 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          📍 Mapa de Michoacán — Clima y Calidad del Aire
        </h1>

        <div className="w-full max-w-6xl h-[600px] rounded-xl shadow-lg overflow-hidden">
          <GoogleMap
            center={{ lat: 19.5, lng: -101.5 }}
            zoom={7}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {ciudades.map((c, idx) => (
              <Marker
                key={idx}
                position={{ lat: c.lat, lng: c.lng }}
                onClick={() => setCiudadSeleccionada(c.nombre)}
                icon={{
                  url: getIcon(datosCiudades[c.nombre]?.aqi),
                  scaledSize: new window.google.maps.Size(40, 40) // tamaño del icono
                }}
              />
            ))}

            {ciudadSeleccionada && datosCiudades[ciudadSeleccionada] && (
              <InfoWindow
                position={{
                  lat: ciudades.find(c => c.nombre === ciudadSeleccionada).lat,
                  lng: ciudades.find(c => c.nombre === ciudadSeleccionada).lng
                }}
                onCloseClick={() => setCiudadSeleccionada(null)}
              >
                <div className="text-center text-black">
                  <h2 className="text-lg font-bold mb-1">{ciudadSeleccionada}</h2>
                  <p>🌤 {datosCiudades[ciudadSeleccionada].clima}</p>
                  <p>🌡 {datosCiudades[ciudadSeleccionada].temp}°C</p>
                  <p>💧 Humedad: {datosCiudades[ciudadSeleccionada].humedad}%</p>
                  <p>🌫 AQI: {datosCiudades[ciudadSeleccionada].aqi || 'N/A'}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </main>
      <Footer />
    </div>
  );
}

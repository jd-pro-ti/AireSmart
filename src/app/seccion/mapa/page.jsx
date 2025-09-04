'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { MapPin, Sun, Cloud, CloudRain } from 'lucide-react';

export default function MapaCalidad() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCiudad, setSelectedCiudad] = useState(null);

  // Datos de ciudades simulados
  const ciudades = [
    { nombre: 'Morelia', top: '30%', left: '50%' },
    { nombre: 'Uruapan', top: '50%', left: '30%' },
    { nombre: 'Zamora', top: '25%', left: '20%' },
    { nombre: 'Lázaro Cárdenas', top: '80%', left: '70%' },
    { nombre: 'Zitácuaro', top: '40%', left: '60%' },
    { nombre: 'Apatzingán', top: '65%', left: '35%' },
  ];

  // Función para generar datos aleatorios de clima/calidad
  const generarDatos = () => {
    const calidades = ['Buena', 'Moderada', 'Mala'];
    const climas = ['Soleado', 'Nublado', 'Lluvias ligeras', 'Tormenta'];
    return ciudades.map(c => ({
      ...c,
      calidad: calidades[Math.floor(Math.random() * calidades.length)],
      clima: climas[Math.floor(Math.random() * climas.length)],
      temperatura: Math.floor(Math.random() * 10) + 20, // 20-30°C
      nivel: Math.floor(Math.random() * 150) + 30, // AQI simulado
    }));
  };

  const [datos, setDatos] = useState(generarDatos());

  // Actualizar datos cada 15 segundos simulando tiempo real
  useEffect(() => {
    const interval = setInterval(() => setDatos(generarDatos()), 15000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (nivel) => {
    if (nivel <= 50) return 'bg-green-400';
    if (nivel <= 100) return 'bg-yellow-400';
    if (nivel <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getClimaIcon = (clima) => {
    if (clima === 'Soleado') return <Sun size={28} className="text-yellow-500" />;
    if (clima === 'Nublado') return <Cloud size={28} className="text-gray-400" />;
    return <CloudRain size={28} className="text-blue-400" />;
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center justify-start p-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🗺 Mapa de Calidad de Aire - Michoacán
          </h1>

          <div className="relative w-full max-w-6xl h-[600px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
            <img
              src="/imagenes/mapa_michoacan.jpg"
              alt="Mapa Michoacán"
              className="w-full h-full object-cover"
            />

            {/* Marcadores */}
            {datos.map((ciudad, idx) => (
              <div
                key={idx}
                className="absolute cursor-pointer flex flex-col items-center"
                style={{ top: ciudad.top, left: ciudad.left, transform: 'translate(-50%, -100%)' }}
                onClick={() => setSelectedCiudad(ciudad)}
              >
                <MapPin size={32} className={getColor(ciudad.nivel)} />
              </div>
            ))}

            {/* Modal de información */}
            {selectedCiudad && (
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <div
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setSelectedCiudad(null)}
                ></div>

                <div className="bg-white rounded-2xl p-6 shadow-2xl relative z-10 text-center max-w-xs">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
                    onClick={() => setSelectedCiudad(null)}
                  >
                    ✖
                  </button>
                  <h2 className="text-2xl font-bold mb-2">{selectedCiudad.nombre}</h2>
                  <p className="text-gray-700 mb-2">
                    Calidad del aire:{' '}
                    <span className={`font-bold px-2 rounded text-white ${getColor(selectedCiudad.nivel)}`}>
                      {selectedCiudad.calidad}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">Nivel AQI: {selectedCiudad.nivel}</p>
                  <p className="text-gray-700 mb-2">Clima: {selectedCiudad.clima}</p>
                  <p className="text-gray-700 mb-4">Temperatura: {selectedCiudad.temperatura}°C</p>
                  <div className="flex justify-center mb-2">{getClimaIcon(selectedCiudad.clima)}</div>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setSelectedCiudad(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

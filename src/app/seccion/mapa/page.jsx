'use client';

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { MapPin } from 'lucide-react';

export default function MapaCalidad() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCiudad, setSelectedCiudad] = useState(null);

  // Datos simulados de calidad de aire con posición relativa (0-100%)
  const ciudades = [
    { nombre: 'Morelia', top: '30%', left: '50%', calidad: 'Alta', nivel: 150 },
    { nombre: 'Uruapan', top: '50%', left: '30%', calidad: 'Moderada', nivel: 90 },
    { nombre: 'Zamora', top: '25%', left: '20%', calidad: 'Baja', nivel: 40 },
    { nombre: 'Lázaro Cárdenas', top: '80%', left: '70%', calidad: 'Alta', nivel: 160 },
  ];

  const getColor = (nivel) => {
    if (nivel <= 50) return 'bg-green-400';
    if (nivel <= 100) return 'bg-yellow-400';
    if (nivel <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 
        ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <main className="flex flex-col items-center justify-start p-4 md:p-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🗺 Mapa de Calidad de Aire
          </h1>

          {/* Mapa */}
          <div className="relative w-full max-w-6xl h-[500px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
            <img
              src="/imagenes/mapa_michoacan.jpg" // tu imagen de mapa
              alt="Mapa Michoacán"
              className="w-full h-full object-cover"
            />

            {/* Marcadores */}
            {ciudades.map((ciudad, idx) => (
              <div
                key={idx}
                className="absolute cursor-pointer flex flex-col items-center"
                style={{
                  top: ciudad.top,
                  left: ciudad.left,
                  transform: 'translate(-50%, -100%)'
                }}
                onClick={() => setSelectedCiudad(ciudad)}
              >
                <MapPin size={28} className={getColor(ciudad.nivel)} />
              </div>
            ))}

            {/* Modal de información */}
            {selectedCiudad && (
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <div
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setSelectedCiudad(null)}
                ></div>

                <div className="bg-white rounded-xl p-6 shadow-2xl relative z-10 text-center max-w-xs">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
                    onClick={() => setSelectedCiudad(null)}
                  >
                    ✖
                  </button>
                  <h2 className="text-xl font-bold mb-2">{selectedCiudad.nombre}</h2>
                  <p className="text-gray-700 mb-1">
                    Calidad:{' '}
                    <span
                      className={`font-bold ${getColor(selectedCiudad.nivel)} text-white px-2 rounded`}
                    >
                      {selectedCiudad.calidad}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Nivel AQI: {selectedCiudad.nivel}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

'use client'

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

export default function Predicciones() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Datos simulados del pronóstico
  const pronostico = [
    { dia: 'Lun', fecha: '4 Sep', descripcion: 'Soleado', temp: 25, humedad: 40, icon: 'soleado' },
    { dia: 'Mar', fecha: '5 Sep', descripcion: 'Parcialmente nublado', temp: 22, humedad: 50, icon: 'parcial' },
    { dia: 'Mié', fecha: '6 Sep', descripcion: 'Nublado', temp: 20, humedad: 55, icon: 'nublado' },
    { dia: 'Jue', fecha: '7 Sep', descripcion: 'Lluvia ligera', temp: 18, humedad: 60, icon: 'lluvia' },
    { dia: 'Vie', fecha: '8 Sep', descripcion: 'Soleado', temp: 26, humedad: 35, icon: 'soleado' },
  ];

  // Función para renderizar iconos según tipo de clima
  const renderIcon = (tipo) => {
    switch (tipo) {
      case 'soleado':
        return <Sun size={48} className="text-yellow-400 mb-2" />;
      case 'parcial':
        return <CloudSun size={48} className="text-yellow-300 mb-2" />;
      case 'nublado':
        return <Cloud size={48} className="text-gray-400 mb-2" />;
      case 'lluvia':
        return <CloudRain size={48} className="text-blue-400 mb-2" />;
      default:
        return <Sun size={48} className="text-yellow-400 mb-2" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 ml-16 md:ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🌤 Predicciones del Clima
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
          {pronostico.map((dia, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <h2 className="font-semibold text-lg">{dia.dia}</h2>
              <p className="text-sm text-gray-400">{dia.fecha}</p>
              {/* Icono */}
              {renderIcon(dia.icon)}
              <p className="text-gray-600 capitalize">{dia.descripcion}</p>
              <p className="mt-2 text-lg font-bold">{dia.temp}°C</p>
              <p className="text-sm text-gray-500">Humedad: {dia.humedad}%</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="w-full mt-6">
          <Footer />
        </div>
      </main>
    </div>
  );
}
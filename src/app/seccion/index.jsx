'use client'
import React, { useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/heder';
import { Car, RefreshCw, CircleDot } from "lucide-react";

// 📌 Datos de calidad del aire por ciudad de Michoacán
const ciudades = [
  {
    nombre: "Morelia",
    calidad: "Buena",
    valores: { NO2: 20.5, O3: 12.3, PM25: 15.2, PM10: 28.7, SO2: 5.1 }
  },
  {
    nombre: "Uruapan",
    calidad: "Razonablemente buena",
    valores: { NO2: 24.1, O3: 8.9, PM25: 18.4, PM10: 32.1, SO2: 7.3 }
  },
  {
    nombre: "Zamora",
    calidad: "Moderada",
    valores: { NO2: 32.5, O3: 14.2, PM25: 25.3, PM10: 40.5, SO2: 9.8 }
  },
  {
    nombre: "Lázaro Cárdenas",
    calidad: "Moderada",
    valores: { NO2: 28.7, O3: 10.5, PM25: 22.6, PM10: 45.3, SO2: 12.4 }
  },
  {
    nombre: "Zitácuaro",
    calidad: "Buena",
    valores: { NO2: 18.9, O3: 11.1, PM25: 14.5, PM10: 27.4, SO2: 4.9 }
  },
  {
    nombre: "Apatzingán",
    calidad: "Razonablemente buena",
    valores: { NO2: 25.6, O3: 9.3, PM25: 19.7, PM10: 35.8, SO2: 8.6 }
  }
];

// 📌 Componente para cada tarjeta
const AirQualityCard = ({ ciudad }) => {
  return (
    <div className="bg-[#EAF3F5] rounded-xl shadow-md p-6 mb-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Car size={24} />
          <h3 className="text-xl font-bold">{ciudad.nombre}</h3>
        </div>
        <div className="flex space-x-3">
          <CircleDot className="text-green-600" />
          <RefreshCw size={20} className="cursor-pointer hover:rotate-90 transition" />
        </div>
      </div>

      {/* Estado */}
      <p className="text-gray-700">
        La calidad del aire es:{" "}
        <span className="font-bold">{ciudad.calidad}</span>
      </p>

      {/* Contaminantes */}
      <h4 className="mt-4 mb-2 text-sm font-semibold text-gray-800">
        Concentración de contaminantes (µg/m³)
      </h4>
      <div className="grid grid-cols-5 gap-4 text-center">
        <div>
          <div className="bg-green-500 h-20 rounded-md"></div>
          <p className="text-xs mt-1">NO₂</p>
          <p className="font-semibold">{ciudad.valores.NO2}</p>
        </div>
        <div>
          <div className="bg-blue-600 h-12 rounded-md"></div>
          <p className="text-xs mt-1">O₃</p>
          <p className="font-semibold">{ciudad.valores.O3}</p>
        </div>
        <div>
          <div className="bg-yellow-500 h-16 rounded-md"></div>
          <p className="text-xs mt-1">PM2.5</p>
          <p className="font-semibold">{ciudad.valores.PM25}</p>
        </div>
        <div>
          <div className="bg-gray-500 h-20 rounded-md"></div>
          <p className="text-xs mt-1">PM10</p>
          <p className="font-semibold">{ciudad.valores.PM10}</p>
        </div>
        <div>
          <div className="bg-red-500 h-8 rounded-md"></div>
          <p className="text-xs mt-1">SO₂</p>
          <p className="font-semibold">{ciudad.valores.SO2}</p>
        </div>
      </div>
    </div>
  );
};

// 📌 Página principal
export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido */}
      <main className="p-6 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          CALIDAD DEL AIRE EN TIEMPO REAL - MICHOACÁN
        </h2>

        {/* Renderizar tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ciudades.map((c, i) => (
            <AirQualityCard key={i} ciudad={c} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

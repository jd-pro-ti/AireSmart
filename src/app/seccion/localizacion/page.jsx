'use client'
import {useState} from "react";
import Footer from '../../components/footer';
import Header from '../../components/header';

export default function localizacion() {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
          {/* Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🌍 Ubicaciones y Clima en Michoacán
      </h1>

      {/* Tarjetas de ciudades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-lg">Morelia</h2>
          <p className="text-sm text-gray-600">Clima: Soleado</p>
          <p className="text-sm text-gray-600">Temperatura: 25°C</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-lg">Uruapan</h2>
          <p className="text-sm text-gray-600">Clima: Nublado</p>
          <p className="text-sm text-gray-600">Temperatura: 22°C</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-lg">Zamora</h2>
          <p className="text-sm text-gray-600">Clima: Lluvias ligeras</p>
          <p className="text-sm text-gray-600">Temperatura: 20°C</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-lg">Lázaro Cárdenas</h2>
          <p className="text-sm text-gray-600">Clima: Soleado y húmedo</p>
          <p className="text-sm text-gray-600">Temperatura: 30°C</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}


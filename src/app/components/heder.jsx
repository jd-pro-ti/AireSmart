'use client'
import React from 'react';
import {
  MapPin,
  Map,
  Bell,
  LineChart,
  BookOpen
} from 'lucide-react'; // Importamos los iconos

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Botón ☰ */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="m-4 p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 w-32 z-50"
      >
        ☰ Menú
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-black hover:text-gray-600 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Menú con íconos */}
        <nav className="p-4 space-y-3">
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
          >
            <MapPin size={20} /> Ubicación
          </a>

          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
          >
            <Map size={20} /> Mapa de Calidad de Aire
          </a>

          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
          >
            <Bell size={20} /> Alertas y Notificaciones
          </a>

          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
          >
            <LineChart size={20} /> Predicciones
          </a>

          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
          >
            <BookOpen size={20} /> Capacitación
          </a>
        </nav>
      </div>
    </>
  );
}

export default Header;

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Map, Bell, LineChart, BookOpen, Home } from "lucide-react";

function Header({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  const menuItems = [
    { icon: Home, text: 'Inicio', path: '/seccion' },
    { icon: MapPin, text: 'Ubicación', path: '/seccion/localizacion' },
    { icon: Map, text: 'Mapa de Calidad de Aire', path: '/seccion/mapa' },
    { icon: Bell, text: 'Alertas y Notificaciones', path: '/seccion/Alertas' },
    { icon: LineChart, text: 'Predicciones', path: '/seccion/predicciones' },
    { icon: BookOpen, text: 'Capacitación', path: '/seccion/capacitacion' }
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {/* Encabezado */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2
          className={`text-lg font-bold text-gray-800 transition-opacity duration-300 
          ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          Menú
        </h2>
      </div>

      {/* Menú dinámico */}
      <nav className="p-2 space-y-3">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => router.push(item.path)}
            className="w-full flex items-center gap-2 p-2 rounded text-left text-black hover:bg-gray-100"
          >
            <item.icon size={20} />
            <span
              className={`transition-opacity duration-300 
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hidden group-hover:block'}`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Header;

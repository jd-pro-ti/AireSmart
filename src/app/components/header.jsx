'use client'
import React from 'react';
import {
  MapPin,
  Map,
  Bell,
  LineChart,
  BookOpen
} from 'lucide-react'; 

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      

      {/* Sidebar mini por defecto */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 
        transition-all duration-300 ease-in-out 
        group 
        ${sidebarOpen ? 'w-64' : 'w-16'} 
        hover:w-64`}
      >
        {/* Encabezado */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2
            className={`text-lg font-bold text-gray-800 transition-opacity duration-300 
            ${sidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hidden group-hover:block'}`}
          >
            Menú
          </h2>
          
        </div>

        {/* Menú con íconos */}
        <nav className="p-2 space-y-3">
          {[
            { icon: <MapPin size={20} />, text: 'Ubicación' },
            { icon: <Map size={20} />, text: 'Mapa de Calidad de Aire' },
            { icon: <Bell size={20} />, text: 'Alertas y Notificaciones' },
            { icon: <LineChart size={20} />, text: 'Predicciones' },
            { icon: <BookOpen size={20} />, text: 'Capacitación' }
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center gap-2 p-2 rounded text-black hover:bg-gray-100"
            >
              {item.icon}
              <span
                className={`transition-opacity duration-300 
                ${sidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hidden group-hover:block'}`}
              >
                {item.text}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Header;

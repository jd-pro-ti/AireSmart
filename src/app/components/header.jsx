'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // 👈 para navegar manualmente
import {
  MapPin,
  Map,
  Bell,
  LineChart,
  BookOpen
} from 'lucide-react'; 

function Header({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();

  // en vez de 'link' podemos poner 'onClick'
  const menuItems = [
    { icon: <MapPin size={20} />, text: 'Ubicación', action: () => router.push("/seccion/localizacion") },

    { icon: <Map size={20} />, text: 'Mapa de Calidad de Aire', action: () => router.push("/seccion/mapa") },
    { icon: <Bell size={20} />, text: 'Alertas y Notificaciones', action: () => router.push("/seccion/Alertas") },
    { icon: <LineChart size={20} />, text: 'Predicciones', action: () => router.push("/seccion/predicciones") },
    { icon: <BookOpen size={20} />, text: 'Capacitación', action: () => router.push("/seccion/capacitacion") }
  ];

  return (
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

      {/* Menú */}
      <nav className="p-2 space-y-3">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action} // 👈 acción al click
            className="w-full flex items-center gap-2 p-2 rounded text-left text-black hover:bg-gray-100"
          >
            {item.icon}
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

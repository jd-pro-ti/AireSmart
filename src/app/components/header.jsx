'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Map, Bell, LineChart, BookOpen, Home, LogOut } from "lucide-react";

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
      className={`fixed top-0 left-0 h-full 
      bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-600 
      shadow-2xl z-50 backdrop-blur-sm
      transition-all duration-500 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-20'} group`}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {/* Logo */}
      <div className="p-4 border-b border-emerald-400/40 flex justify-center items-center bg-emerald-700/20">
        <img
          src="/img/logo.jpg"
          alt="Logo"
          className={`transition-all duration-500 
          ${sidebarOpen ? 'w-28 h-16' : 'w-10 h-10'} object-contain`}
        />
      </div>

      {/* Menú dinámico */}
      <nav className="p-3 space-y-3 flex flex-col">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-3 p-3 rounded-lg text-left text-white 
              hover:bg-emerald-400/30 hover:shadow-[0_0_10px_#8EF6B0]
              transition-all duration-300"
          >
            <item.icon size={24} className="text-emerald-200 group-hover:text-white transition-all" />
            <span
              className={`transition-opacity duration-300 text-sm font-semibold
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden group-hover:block'}`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </nav>

      {/* Botón inferior */}
      <div className="absolute bottom-4 w-full px-3">
        <button
          onClick={() => router.push('/logout')}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-white 
            hover:bg-emerald-400/40 hover:shadow-[0_0_10px_#6EE7B7] 
            transition-all duration-300"
        >
          <LogOut size={24} className="text-emerald-100" />
          <span
            className={`transition-opacity duration-300 text-sm font-semibold
            ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden group-hover:block'}`}
          >
            Cerrar Sesión
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Map, 
  Bell, 
  LineChart, 
  BookOpen, 
  Home, 
  LogOut 
} from "lucide-react";

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
      bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 
      shadow-2xl z-50 backdrop-blur-sm
      transition-all duration-500 ease-in-out
      ${sidebarOpen ? 'w-64' : 'w-20'} group`}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {/* Logo / Imagen */}
      <div className="p-4 border-b border-blue-400 flex justify-center items-center">
        <img
          src="/logo.png" // coloca aquí tu imagen en /public/logo.png
          alt="Logo"
          className={`transition-all duration-500 
          ${sidebarOpen ? 'w-28 h-12' : 'w-10 h-10'} object-contain`}
        />
      </div>

      {/* Menú dinámico */}
      <nav className="p-3 space-y-3 flex flex-col">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-3 p-3 rounded-lg text-left text-black 
              hover:bg-blue-400/40 hover:shadow-[0_0_15px_#22c55e] 
              transition-all duration-300"
          >
            <item.icon size={26} className="text-green-500 group-hover:animate-pulse" />
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
          onClick={() => router.push('/logout')} // Cambia la ruta si es necesario
          className="flex items-center gap-3 w-full p-3 rounded-lg text-black 
            hover:bg-red-500/40 hover:shadow-[0_0_15px_#ef4444] 
            transition-all duration-300"
        >
          <LogOut size={26} className="text-green-500" />
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

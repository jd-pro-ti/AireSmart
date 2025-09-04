'use client';

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

// Datos de la capacitación
const secciones = [
  {
    titulo: "Introducción a la App",
    descripcion:
      "Conoce la finalidad de la aplicación, sus funciones principales y cómo puede ayudarte a gestionar tus tareas o inventarios de manera eficiente.",
  },
  {
    titulo: "Registro y Acceso",
    descripcion:
      "Aprende a crear tu cuenta, iniciar sesión y recuperar tu contraseña si es necesario. Todo de manera segura y rápida.",
  },
  {
    titulo: "Navegación General",
    descripcion:
      "Explora cómo moverte dentro de la app, identificar los menús principales y acceder a cada sección sin complicaciones.",
  },
  {
    titulo: "Gestión de Inventarios",
    descripcion:
      "Aprende a agregar, modificar y eliminar productos o muestras. Conoce también cómo generar reportes y consultar historial.",
  },
  {
    titulo: "Seguridad y Roles",
    descripcion:
      "Entiende cómo se manejan los permisos dentro de la app, quién puede acceder a cada módulo y cómo proteger tus datos.",
  },
  {
    titulo: "Soporte y Ayuda",
    descripcion:
      "Conoce los canales de ayuda disponibles y cómo reportar problemas o dudas para recibir asistencia rápidamente.",
  },
];

export default function Capacitacion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar / Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 
        ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <main className="flex flex-col items-center p-4 md:p-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            📚 Capacitación de la App
          </h1>

          <div className="space-y-6 w-full max-w-4xl">
            {secciones.map((sec, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {sec.titulo}
                </h2>
                <p className="text-gray-700">{sec.descripcion}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

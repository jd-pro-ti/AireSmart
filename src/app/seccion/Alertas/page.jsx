'use client'

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Bell, Info } from 'lucide-react';

export default function Alertas() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAlerta, setSelectedAlerta] = useState(null);

  const alertas = [
    { 
      id: 1, 
      tipo: 'Calidad de Aire', 
      mensaje: 'Nivel de contaminación alto en Morelia', 
      fecha: '2025-09-04',
      detalle: 'Se recomienda evitar actividades al aire libre y mantener las ventanas cerradas.',
      alerta: true
    },
    { 
      id: 2, 
      tipo: 'Clima', 
      mensaje: 'Lluvias fuertes en Uruapan', 
      fecha: '2025-09-04',
      detalle: 'Pronóstico de lluvias intensas durante todo el día. Precaución en caminos y tránsito.',
      alerta: true
    },
    { 
      id: 3, 
      tipo: 'Mantenimiento', 
      mensaje: 'Actualización del sistema programada', 
      fecha: '2025-09-05',
      detalle: 'El sistema estará temporalmente fuera de servicio entre 14:00 y 16:00 hrs.',
      alerta: false
    },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 
        ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <main className="flex flex-col items-center justify-start p-6 md:p-8 flex-1">
          {/* Encabezado */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            🔔 Alertas y Notificaciones
          </h1>

          {/* Cards de alertas */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {alertas.map((alerta) => (
                <div
                  key={alerta.id}
                  className="bg-white shadow-md rounded-xl p-5 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg flex items-start gap-4"
                  onClick={() => setSelectedAlerta(alerta)}
                >
                  {alerta.alerta ? (
                    <Bell size={30} className="text-red-500 shrink-0" />
                  ) : (
                    <Info size={30} className="text-green-500 shrink-0" />
                  )}
                  <div className="flex flex-col">
                    <h2 className="font-bold text-lg text-black">{alerta.tipo}</h2>
                    <p className="text-sm text-gray-700">{alerta.mensaje}</p>
                    <p className="text-xs text-gray-400 mt-1">{alerta.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {selectedAlerta && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              {/* Fondo transparente */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedAlerta(null)}
              ></div>

              {/* Contenido del modal */}
              <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-2xl relative z-10 text-center">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                  onClick={() => setSelectedAlerta(null)}
                >
                  ✖
                </button>
                {selectedAlerta.alerta ? (
                  <Bell size={36} className="mx-auto mb-3 text-red-500" />
                ) : (
                  <Info size={36} className="mx-auto mb-3 text-green-500" />
                )}
                <h2 className="text-xl font-bold text-black mb-2">{selectedAlerta.tipo}</h2>
                <p className="text-gray-700 mb-2">{selectedAlerta.mensaje}</p>
                <p className="text-gray-500 text-sm mb-4">{selectedAlerta.fecha}</p>
                <p className="text-gray-600">{selectedAlerta.detalle}</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

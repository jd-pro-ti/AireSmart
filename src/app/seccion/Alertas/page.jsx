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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 ml-16 md:ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🔔 Alertas y Notificaciones
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl justify-center">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-5 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3"
              onClick={() => setSelectedAlerta(alerta)}
            >
              {alerta.alerta ? (
                <Bell size={28} className="text-red-500" />
              ) : (
                <Info size={28} className="text-green-500" />
              )}
              <div>
                <h2 className="font-semibold text-lg mb-1">{alerta.tipo}</h2>
                <p className="text-sm text-gray-700">{alerta.mensaje}</p>
                <p className="text-xs text-gray-400 mt-1">{alerta.fecha}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedAlerta && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Fondo transparente */}
            <div
              className="absolute inset-0 bg-white/20 backdrop-blur-sm"
              onClick={() => setSelectedAlerta(null)}
            ></div>

            {/* Contenido del modal */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 w-11/12 max-w-md shadow-2xl relative z-10 text-center">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                onClick={() => setSelectedAlerta(null)}
              >
                ✖
              </button>
              {selectedAlerta.alerta ? (
                <Bell size={32} className="mx-auto mb-2 text-red-500" />
              ) : (
                <Info size={32} className="mx-auto mb-2 text-green-500" />
              )}
              <h2 className="text-xl font-bold mb-2">{selectedAlerta.tipo}</h2>
              <p className="text-gray-700 mb-2">{selectedAlerta.mensaje}</p>
              <p className="text-gray-500 text-sm mb-4">{selectedAlerta.fecha}</p>
              <p className="text-gray-600">{selectedAlerta.detalle}</p>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
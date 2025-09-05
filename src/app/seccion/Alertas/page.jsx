'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Bell, Info, CloudRain, Sun } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function CalidadAireMichoacan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [alertaActual, setAlertaActual] = useState(null);
  const [estados, setEstados] = useState([
    { nombre: 'Morelia', calidad: 'Buena', nivel: 40 },
    { nombre: 'Uruapan', calidad: 'Moderada', nivel: 90 },
    { nombre: 'Zamora', calidad: 'Mala', nivel: 140 },
    { nombre: 'Lázaro Cárdenas', calidad: 'Mala', nivel: 160 },
    { nombre: 'Zitácuaro', calidad: 'Buena', nivel: 30 },
    { nombre: 'Apatzingán', calidad: 'Moderada', nivel: 80 }
  ]);

  const getColorByCalidad = (nivel) => {
    if (nivel <= 50) return 'text-[#10B981]';
    if (nivel <= 100) return 'text-[#F59E0B]';
    if (nivel <= 150) return 'text-[#EF4444]';
    return 'text-[#EF4444]';
  };

  const getClimaIcon = (nivel) => {
    if (nivel <= 50) return <Sun size={28} className="text-[#F59E0B]" />;
    if (nivel <= 100) return <Info size={28} className="text-[#6B7280]" />;
    return <CloudRain size={28} className="text-[#3B82F6]" />;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const niveles = [30, 50, 80, 100, 140, 160];
      const calidades = ['Buena', 'Moderada', 'Mala'];

      const nuevosEstados = estados.map((estado) => {
        const index = Math.floor(Math.random() * niveles.length);
        return {
          ...estado,
          nivel: niveles[index],
          calidad: calidades[Math.floor(Math.random() * calidades.length)]
        };
      });

      setEstados(nuevosEstados);

      // Buscar el peor estado (el de mayor AQI)
      const peorEstado = [...nuevosEstados].sort((a, b) => b.nivel - a.nivel)[0];

      // Solo mostrar alertas para calidad Moderada o Mala
      if (peorEstado.nivel > 50) {
        // Determinar el tipo de alerta según el nivel
        let tipoAlerta = '';
        let colorAlerta = '';
        
        if (peorEstado.nivel <= 100) {
          tipoAlerta = 'moderada';
          colorAlerta = 'bg-[#F59E0B]'; // Naranja
        } else {
          tipoAlerta = 'mala';
          colorAlerta = 'bg-[#EF4444]'; // Rojo
        }

        setAlertaActual({
          mensaje: `⚠️ ${peorEstado.nombre}: Calidad del aire ${peorEstado.calidad} (AQI ${peorEstado.nivel})`,
          tipo: tipoAlerta,
          color: colorAlerta
        });
      } else {
        // Calidad Buena - no mostrar alerta
        setAlertaActual(null);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [estados]);

  const dataChart = estados.map((e) => ({
    nombre: e.nombre,
    nivel: e.nivel
  }));

  return (
    <div className="flex min-h-screen bg-[#F0F4F8]">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center justify-start p-6 md:p-8 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-8 text-center">
            🌬 Calidad del Aire en Michoacán 
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-8">
            {estados.map((estado, idx) => (
              <div
                key={idx}
                className={`bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition transform flex flex-col gap-3 border-l-4 ${getColorByCalidad(estado.nivel)}`}
                onClick={() => setSelectedEstado(estado)}
              >
                <div className="flex items-center gap-3">
                  {getClimaIcon(estado.nivel)}
                  <h2 className="font-bold text-lg text-[#111827]">{estado.nombre}</h2>
                </div>
                <p className="text-[#6B7280]">Calidad: {estado.calidad}</p>
                <p className="text-[#6B7280]">Nivel AQI: {estado.nivel}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-6xl mb-8">
            <h2 className="text-xl font-semibold text-[#111827] mb-4 text-center">Evolución de Calidad del Aire</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" stroke="#111827" />
                <YAxis label={{ value: "AQI", angle: -90, position: "insideLeft", fill: "#111827" }} stroke="#111827" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nivel" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6, fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {selectedEstado && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedEstado(null)}></div>
              <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-2xl relative z-10 text-center animate-fadeIn">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                  onClick={() => setSelectedEstado(null)}
                >
                  ✖
                </button>
                <div className="flex justify-center mb-4">{getClimaIcon(selectedEstado.nivel)}</div>
                <h2 className="text-2xl font-bold text-[#111827] mb-2">{selectedEstado.nombre}</h2>
                <p className="text-[#6B7280] mb-2">Calidad del aire: {selectedEstado.calidad}</p>
                <p className="text-[#6B7280] mb-2">Nivel AQI: {selectedEstado.nivel}</p>
                <button className="mt-4 px-5 py-2 bg-[#1E3A8A] text-white rounded-xl hover:bg-[#3B82F6] transition" onClick={() => setSelectedEstado(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {alertaActual && (
            <div
              className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg font-semibold text-white ${alertaActual.color} animate-fadeIn`}
            >
              {alertaActual.mensaje}
            </div>
          )}
        </main>

        <Footer/>
      </div>
    </div>
  );
}
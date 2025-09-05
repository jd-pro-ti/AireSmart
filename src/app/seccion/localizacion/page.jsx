'use client';
import { useState, useEffect } from "react";
import Footer from '../../components/footer';
import Header from '../../components/header';
import { Sun, Cloud, CloudRain, MapPin, AlertCircle, CheckCircle, MinusCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

// Ciudades y estados
const ciudades = ["Morelia", "Uruapan", "Zamora", "Lázaro Cárdenas", "Zitácuaro", "Apatzingán"];
const calidades = ["Buena", "Moderada", "Mala"];
const climaTipos = ["Soleado", "Nublado", "Lluvias ligeras", "Tormenta", "Noche despejada"];

// Colores e iconos de calidad
const calidadInfo = {
  "Buena": { color: "#10B981", icon: <CheckCircle size={24} className="text-[#10B981]" /> },
  "Moderada": { color: "#F59E0B", icon: <MinusCircle size={24} className="text-[#F59E0B]" /> },
  "Mala": { color: "#EF4444", icon: <AlertCircle size={24} className="text-[#EF4444]" /> },
};

// Iconos de clima
const climaIconos = {
  "Soleado": <Sun size={28} className="text-[#F59E0B]" />,
  "Nublado": <Cloud size={28} className="text-[#6B7280]" />,
  "Lluvias ligeras": <CloudRain size={28} className="text-[#3B82F6]" />,
  "Tormenta": <CloudRain size={28} className="text-[#1E3A8A]" />,
  "Noche despejada": <Sun size={28} className="text-[#111827]" />,
};

// Función para generar calidad/clima aleatoria
const getRandomCalidad = () => calidades[Math.floor(Math.random() * calidades.length)];
const getRandomClima = () => climaTipos[Math.floor(Math.random() * climaTipos.length)];

export default function Localizacion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [datosCiudades, setDatosCiudades] = useState([]);

  useEffect(() => {
    const inicial = ciudades.map(ciudad => ({
      ciudad,
      calidad: getRandomCalidad(),
      clima: getRandomClima(),
      temperatura: Math.floor(Math.random() * 10) + 20, // 20-30°C
    }));
    setDatosCiudades(inicial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDatosCiudades(prev => 
        prev.map(d => ({
          ...d,
          calidad: getRandomCalidad(),
          clima: getRandomClima(),
          temperatura: Math.floor(Math.random() * 10) + 20,
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <main className="p-6 flex-1">
          <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center">
            🌍 Ubicación, Clima y Calidad del Aire - Michoacán
          </h1>

          {/* Tarjetas de ciudades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {datosCiudades.map((d, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl p-6 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-4"
                onClick={() => setCiudadSeleccionada(d)}
              >
                {/* Iconos */}
                <div className="flex flex-col items-center gap-2">
                  <MapPin size={24} className="text-[#3B82F6]" />
                  {climaIconos[d.clima] || <Sun size={28} className="text-[#F59E0B]" />}
                  {calidadInfo[d.calidad].icon}
                </div>
                {/* Info */}
                <div className="flex flex-col">
                  <h2 className="font-bold text-xl text-[#111827] mb-1">{d.ciudad}</h2>
                  <p className="text-[#6B7280]">Clima: <span className="font-semibold">{d.clima}</span></p>
                  <p className="text-[#6B7280]">Temperatura: <span className="font-semibold">{d.temperatura}°C</span></p>
                  <p className="font-semibold" style={{ color: calidadInfo[d.calidad].color }}>
                    Calidad del aire: {d.calidad}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica de barras animada */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold text-[#111827] mb-4 text-center">
              Calidad del Aire por Estado (Actualización en Tiempo Real)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={datosCiudades}>
                <XAxis dataKey="ciudad" stroke="#111827" />
                <YAxis stroke="#111827" />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperatura" name="Temperatura (°C)" animationDuration={1000}>
                  {datosCiudades.map((entry, index) => (
                    <Cell key={index} fill={calidadInfo[entry.calidad].color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Modal */}
          {ciudadSeleccionada && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-black/40" onClick={() => setCiudadSeleccionada(null)}></div>
              <div className="bg-white rounded-2xl p-8 w-11/12 max-w-md shadow-2xl relative z-10 text-center">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                  onClick={() => setCiudadSeleccionada(null)}
                >✖</button>
                <div className="flex justify-center gap-4 mb-4">
                  <MapPin size={24} className="text-[#3B82F6]" />
                  {climaIconos[ciudadSeleccionada.clima]}
                  {calidadInfo[ciudadSeleccionada.calidad].icon}
                </div>
                <h2 className="text-2xl font-bold text-[#111827] mb-4">{ciudadSeleccionada.ciudad}</h2>
                <p className="text-[#6B7280] mb-2">Clima: {ciudadSeleccionada.clima}</p>
                <p className="text-[#6B7280] mb-2">Temperatura: {ciudadSeleccionada.temperatura}°C</p>
                <p className="mb-2 font-semibold" style={{ color: calidadInfo[ciudadSeleccionada.calidad].color }}>
                  Calidad del aire: {ciudadSeleccionada.calidad}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#3B82F6]"
                  onClick={() => setCiudadSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </main>
        <Footer />
      </div>
    </div>
  );
}

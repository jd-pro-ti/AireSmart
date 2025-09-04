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
  "Buena": { color: "#16A34A", icon: <CheckCircle size={24} className="text-green-600" /> },
  "Moderada": { color: "#FACC15", icon: <MinusCircle size={24} className="text-yellow-500" /> },
  "Mala": { color: "#DC2626", icon: <AlertCircle size={24} className="text-red-600" /> },
};

// Iconos de clima
const climaIconos = {
  "Soleado": <Sun size={28} className="text-yellow-500" />,
  "Nublado": <Cloud size={28} className="text-gray-400" />,
  "Lluvias ligeras": <CloudRain size={28} className="text-blue-400" />,
  "Tormenta": <CloudRain size={28} className="text-indigo-600" />,
  "Noche despejada": <Sun size={28} className="text-gray-800" />,
};

// Función para generar calidad/clima aleatoria
const getRandomCalidad = () => calidades[Math.floor(Math.random() * calidades.length)];
const getRandomClima = () => climaTipos[Math.floor(Math.random() * climaTipos.length)];

export default function Localizacion() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [datosCiudades, setDatosCiudades] = useState([]);

  // Inicializa datos de ciudades
  useEffect(() => {
    const inicial = ciudades.map(ciudad => ({
      ciudad,
      calidad: getRandomCalidad(),
      clima: getRandomClima(),
      temperatura: Math.floor(Math.random() * 10) + 20, // 20-30°C
    }));
    setDatosCiudades(inicial);
  }, []);

  // Actualiza cada 10 segundos con animación
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
    <div className="min-h-screen bg-blue-100 flex">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <main className="p-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
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
                  <MapPin size={24} className="text-blue-500" />
                  {climaIconos[d.clima] || <Sun size={28} className="text-yellow-500" />}
                  {calidadInfo[d.calidad].icon}
                </div>
                {/* Info */}
                <div className="flex flex-col">
                  <h2 className="font-bold text-xl text-gray-800 mb-1">{d.ciudad}</h2>
                  <p className="text-gray-600">Clima: <span className="font-semibold">{d.clima}</span></p>
                  <p className="text-gray-600">Temperatura: <span className="font-semibold">{d.temperatura}°C</span></p>
                  <p className="font-semibold" style={{ color: calidadInfo[d.calidad].color }}>
                    Calidad del aire: {d.calidad}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica de barras animada */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Calidad del Aire por Estado (Actualización en Tiempo Real)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={datosCiudades}>
                <XAxis dataKey="ciudad" stroke="#000" />
                <YAxis stroke="#000" />
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
                  <MapPin size={24} className="text-blue-500" />
                  {climaIconos[ciudadSeleccionada.clima]}
                  {calidadInfo[ciudadSeleccionada.calidad].icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{ciudadSeleccionada.ciudad}</h2>
                <p className="text-gray-700 mb-2">Clima: {ciudadSeleccionada.clima}</p>
                <p className="text-gray-700 mb-2">Temperatura: {ciudadSeleccionada.temperatura}°C</p>
                <p className="mb-2 font-semibold" style={{ color: calidadInfo[ciudadSeleccionada.calidad].color }}>
                  Calidad del aire: {ciudadSeleccionada.calidad}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

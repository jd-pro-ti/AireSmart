'use client'
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Iconos de clima correctos
import { CloudSun, Cloud, Sun } from "lucide-react";

// Datos de ciudades
const ciudades = [
  { 
    nombre: "Morelia", 
    calidad: "Buena", 
    valores: { NO2: 20.5, O3: 12.3, PM25: 15.2, PM10: 28.7, SO2: 5.1 },
    icono: Sun
  },
  { 
    nombre: "Uruapan", 
    calidad: "Razonablemente buena", 
    valores: { NO2: 24.1, O3: 8.9, PM25: 18.4, PM10: 32.1, SO2: 7.3 },
    icono: CloudSun
  },
  { 
    nombre: "Zamora", 
    calidad: "Moderada", 
    valores: { NO2: 32.5, O3: 14.2, PM25: 25.3, PM10: 40.5, SO2: 9.8 },
    icono: Cloud
  },
  { 
    nombre: "Lázaro Cárdenas", 
    calidad: "Moderada", 
    valores: { NO2: 28.7, O3: 10.5, PM25: 22.6, PM10: 45.3, SO2: 12.4 },
    icono: Cloud
  },
  { 
    nombre: "Zitácuaro", 
    calidad: "Buena", 
    valores: { NO2: 18.9, O3: 11.1, PM25: 14.5, PM10: 27.4, SO2: 4.9 },
    icono: Sun
  },
  { 
    nombre: "Apatzingán", 
    calidad: "Razonablemente buena", 
    valores: { NO2: 25.6, O3: 9.3, PM25: 19.7, PM10: 35.8, SO2: 8.6 },
    icono: CloudSun
  }
];

// Colores por calidad del aire
const getColorByCalidad = (calidad) => {
  switch (calidad) {
    case "Buena":
      return "#10B981"; // Verde éxito
    case "Razonablemente buena":
      return "#F59E0B"; // Naranja advertencia
    case "Moderada":
      return "#EF4444"; // Rojo peligro
    default:
      return "#6B7280"; // Gris oscuro
  }
};

// Colores generales para gráficas (futuristas, respetando tus indicaciones)
const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#1E3A8A"];

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ciudadIndex, setCiudadIndex] = useState(0);

  // Rotar ciudades cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCiudadIndex((prev) => (prev + 1) % ciudades.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const ciudadActual = ciudades[ciudadIndex];
  const colorLinea = getColorByCalidad(ciudadActual.calidad);
  const IconoClima = ciudadActual.icono;

  // Datos para gráfica de línea
  const dataLinea = Object.entries(ciudadActual.valores).map(([key, value]) => ({
    contaminante: key,
    valor: value,
  }));

  // Datos pastel contaminantes
  const dataPieContaminantes = Object.entries(ciudadActual.valores).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Datos pastel calidades
  const dataPieCalidades = [
    { name: "Buena", value: ciudades.filter((c) => c.calidad === "Buena").length },
    { name: "Razonablemente buena", value: ciudades.filter((c) => c.calidad === "Razonablemente buena").length },
    { name: "Moderada", value: ciudades.filter((c) => c.calidad === "Moderada").length },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <main className="p-6 flex-1">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center tracking-wide drop-shadow-lg">
            🌍 CALIDAD DEL AIRE EN TIEMPO REAL - MICHOACÁN
          </h2>

          {/* Ciudad actual con icono */}
          <div className="text-center mb-6 bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6] flex flex-col items-center justify-center">
            <IconoClima size={48} color={colorLinea} className="mb-2" />
            <h3 className="text-2xl font-semibold text-[#111827]">{ciudadActual.nombre}</h3>
            <p className="text-[#111827]">
              Calidad del aire:{" "}
              <span className="font-bold" style={{ color: colorLinea }}>
                {ciudadActual.calidad}
              </span>
            </p>
          </div>

          {/* Gráfica de línea */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6] mb-8 transition-all duration-500 hover:scale-[1.02]">
            <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
              Contaminantes en {ciudadActual.nombre}
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dataLinea}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6B7280" />
                <XAxis dataKey="contaminante" stroke="#111827" />
                <YAxis
                  label={{
                    value: "µg/m³",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#111827",
                  }}
                  stroke="#111827"
                />
                <Tooltip contentStyle={{ color: "#111827", background: "#F0F4F8" }} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke={colorLinea}
                  strokeWidth={3}
                  dot={{ r: 6, fill: colorLinea, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráficas de pastel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pastel contaminantes */}
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6] transition-all duration-500 hover:scale-[1.02]">
              <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
                Distribución de Contaminantes en {ciudadActual.nombre}
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPieContaminantes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={{ fill: "#6B7280", fontWeight: "bold" }}
                  >
                    {dataPieContaminantes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ color: "#111827", background: "#F0F4F8" }} />
                  <Legend wrapperStyle={{ color: "#111827" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pastel calidades */}
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6] transition-all duration-500 hover:scale-[1.02]">
              <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
                Calidad del Aire en Michoacán
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPieCalidades}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={{ fill: "#6B7280", fontWeight: "bold" }}
                  >
                    {dataPieCalidades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorByCalidad(entry.name)} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ color: "#111827", background: "#F0F4F8" }} />
                  <Legend wrapperStyle={{ color: "#111827" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

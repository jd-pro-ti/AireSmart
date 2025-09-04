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

// Datos de ciudades
const ciudades = [
  { nombre: "Morelia", calidad: "Buena", valores: { NO2: 20.5, O3: 12.3, PM25: 15.2, PM10: 28.7, SO2: 5.1 } },
  { nombre: "Uruapan", calidad: "Razonablemente buena", valores: { NO2: 24.1, O3: 8.9, PM25: 18.4, PM10: 32.1, SO2: 7.3 } },
  { nombre: "Zamora", calidad: "Moderada", valores: { NO2: 32.5, O3: 14.2, PM25: 25.3, PM10: 40.5, SO2: 9.8 } },
  { nombre: "Lázaro Cárdenas", calidad: "Moderada", valores: { NO2: 28.7, O3: 10.5, PM25: 22.6, PM10: 45.3, SO2: 12.4 } },
  { nombre: "Zitácuaro", calidad: "Buena", valores: { NO2: 18.9, O3: 11.1, PM25: 14.5, PM10: 27.4, SO2: 4.9 } },
  { nombre: "Apatzingán", calidad: "Razonablemente buena", valores: { NO2: 25.6, O3: 9.3, PM25: 19.7, PM10: 35.8, SO2: 8.6 } }
];

// Colores por calidad del aire
const getColorByCalidad = (calidad) => {
  switch (calidad) {
    case "Buena":
      return "#16A34A"; // Verde
    case "Razonablemente buena":
      return "#FACC15"; // Amarillo
    case "Moderada":
      return "#DC2626"; // Rojo
    default:
      return "#6B7280"; // Gris
  }
};

// Colores originales para las gráficas de pastel
const COLORS = ["#16A34A", "#FACC15", "#DC2626", "#3B82F6", "#9333EA"];

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ciudadIndex, setCiudadIndex] = useState(0);

  // Rotar ciudades (afecta a todas las gráficas)
  useEffect(() => {
    const interval = setInterval(() => {
      setCiudadIndex((prev) => (prev + 1) % ciudades.length);
    }, 10000); // cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const ciudadActual = ciudades[ciudadIndex];
  const colorLinea = getColorByCalidad(ciudadActual.calidad);

  // Datos para gráfica de línea
  const dataLinea = Object.entries(ciudadActual.valores).map(([key, value]) => ({
    contaminante: key,
    valor: value,
  }));

  // Datos para gráfica de pastel de contaminantes
  const dataPieContaminantes = Object.entries(ciudadActual.valores).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Datos para gráfica de pastel de calidades generales
  const dataPieCalidades = [
    { name: "Buena", value: ciudades.filter((c) => c.calidad === "Buena").length },
    { name: "Razonablemente buena", value: ciudades.filter((c) => c.calidad === "Razonablemente buena").length },
    { name: "Moderada", value: ciudades.filter((c) => c.calidad === "Moderada").length },
  ];

  return (
    <div className="min-h-screen bg-blue-100 flex">
      {/* Sidebar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <main className="p-6 flex-1">
          <h2 className="text-3xl font-bold text-black mb-6 text-center">
            CALIDAD DEL AIRE EN TIEMPO REAL - MICHOACÁN
          </h2>

          {/* Ciudad actual */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-black">{ciudadActual.nombre}</h3>
            <p className="text-black">
              Calidad del aire:{" "}
              <span className="font-bold" style={{ color: colorLinea }}>
                {ciudadActual.calidad}
              </span>
            </p>
          </div>

          {/* Gráfica de línea */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h4 className="text-lg font-semibold mb-4 text-black text-center">
              Contaminantes en {ciudadActual.nombre}
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dataLinea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="contaminante" stroke="#000" />
                <YAxis
                  label={{
                    value: "µg/m³",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#000",
                  }}
                  stroke="#000"
                />
                <Tooltip contentStyle={{ color: "#000" }} />
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
            {/* Pastel de contaminantes */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold mb-4 text-black text-center">
                Distribución de Contaminantes en {ciudadActual.nombre}
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPieContaminantes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#3B82F6"
                    dataKey="value"
                    label={{ fill: "#000", fontWeight: "bold" }}
                  >
                    {dataPieContaminantes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ color: "#000" }} />
                  <Legend wrapperStyle={{ color: "#000" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pastel de calidades generales */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold mb-4 text-black text-center">
                Calidad del Aire en Michoacán
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPieCalidades}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#3B82F6"
                    dataKey="value"
                    label={{ fill: "#000", fontWeight: "bold" }}
                  >
                    {dataPieCalidades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorByCalidad(entry.name)} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ color: "#000" }} />
                  <Legend wrapperStyle={{ color: "#000" }} />
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

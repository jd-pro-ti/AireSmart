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
import { CloudSun, Cloud, Sun, Globe } from "lucide-react";

// Datos de ciudades
const ciudades = [
  { nombre: "Morelia", calidad: "Buena", valores: { NO2: 20.5, O3: 12.3, PM25: 15.2, PM10: 28.7, SO2: 5.1 }, icono: Sun },
  { nombre: "Uruapan", calidad: "Razonablemente buena", valores: { NO2: 24.1, O3: 8.9, PM25: 18.4, PM10: 32.1, SO2: 7.3 }, icono: CloudSun },
  { nombre: "Zamora", calidad: "Moderada", valores: { NO2: 32.5, O3: 14.2, PM25: 25.3, PM10: 40.5, SO2: 9.8 }, icono: Cloud },
  { nombre: "Lázaro Cárdenas", calidad: "Moderada", valores: { NO2: 28.7, O3: 10.5, PM25: 22.6, PM10: 45.3, SO2: 12.4 }, icono: Cloud },
  { nombre: "Zitácuaro", calidad: "Buena", valores: { NO2: 18.9, O3: 11.1, PM25: 14.5, PM10: 27.4, SO2: 4.9 }, icono: Sun },
  { nombre: "Apatzingán", calidad: "Razonablemente buena", valores: { NO2: 25.6, O3: 9.3, PM25: 19.7, PM10: 35.8, SO2: 8.6 }, icono: CloudSun },
];

// Colores por calidad
const getColorByCalidad = (calidad) => {
  switch (calidad) {
    case "Buena": return "#10B981";
    case "Razonablemente buena": return "#F59E0B";
    case "Moderada": return "#EF4444";
    default: return "#6B7280";
  }
};

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#1E3A8A"];

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCities, setVisibleCities] = useState([]);
  const [highlightCity, setHighlightCity] = useState(null);
  const [lineData, setLineData] = useState([]);

  // Función para calcular porcentaje de calidad
  const getQualityPercentage = (valores) => {
    const total = Object.values(valores).reduce((a, b) => a + b, 0);
    const maxTotal = Object.values(valores).length * 50; // valor máximo estimado
    return Math.round((1 - total / maxTotal) * 100);
  };

  // Inicializar ciudades progresivamente y luego actualización
  useEffect(() => {
    let i = 0;

    const addCityInterval = setInterval(() => {
      if (i < ciudades.length) {
        const ciudad = ciudades[i];
        if (ciudad) {
          setVisibleCities((prev) => {
            if (!prev.includes(ciudad.nombre)) return [...prev, ciudad.nombre];
            return prev;
          });
          // Agregar línea inicial
          setLineData((prev) => {
            const newData = Object.keys(ciudad.valores).map((contaminante) => ({
              contaminante,
              [ciudad.nombre]: ciudad.valores[contaminante],
              ...prev.find(d => d.contaminante === contaminante)
            }));
            return newData;
          });
        }
        i++;
      } else {
        clearInterval(addCityInterval);

        let j = 0;
        setInterval(() => {
          const ciudad = ciudades[j % ciudades.length];
          setHighlightCity(ciudad.nombre);

          // Actualizar línea suavemente
          setLineData((prev) => {
            return prev.map(d => ({
              ...d,
              [ciudad.nombre]: ciudad.valores[d.contaminante] + Math.random() * 5 - 2.5, // pequeño movimiento
            }));
          });

          setTimeout(() => setHighlightCity(null), 3000);
          j++;
        }, 30000);
      }
    }, 2000);

    return () => clearInterval(addCityInterval);
  }, []);

  // Datos para gráficas de pastel
  const dataPieContaminantes = Object.entries(ciudades.reduce((acc, c) => {
    Object.entries(c.valores).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  const dataPieCalidades = [
    { name: "Buena", value: ciudades.filter((c) => c.calidad === "Buena").length },
    { name: "Razonablemente buena", value: ciudades.filter((c) => c.calidad === "Razonablemente buena").length },
    { name: "Moderada", value: ciudades.filter((c) => c.calidad === "Moderada").length },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-500 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <main className="p-6 flex-1">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center tracking-wide drop-shadow-sm">
            <Globe className="inline-block mr-2" size={32} /> CALIDAD DEL AIRE EN TIEMPO REAL - MICHOACÁN
          </h2>

          {/* Nombres y clima con porcentaje */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {visibleCities.map((nombre, idx) => {
              const ciudad = ciudades.find((c) => c.nombre === nombre);
              if (!ciudad) return null;
              const IconoClima = ciudad.icono;
              const isHighlight = highlightCity === ciudad.nombre;
              const porcentaje = getQualityPercentage(ciudad.valores);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded-xl ${isHighlight ? "bg-[#E0E7FF]" : "bg-white"} shadow-md`}
                >
                  <IconoClima size={24} color={getColorByCalidad(ciudad.calidad)} />
                  <span className="font-semibold text-[#111827]">{ciudad.nombre}</span>
                  <span className="text-[#6B7280]">{ciudad.calidad} ({porcentaje}%)</span>
                </div>
              );
            })}
          </div>

          {/* Gráfica de línea */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6]/30 mb-8">
            <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
              Contaminantes por ciudad
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6B7280" />
                <XAxis dataKey="contaminante" stroke="#111827" />
                <YAxis stroke="#111827" />
                <Tooltip contentStyle={{ color: "#111827", background: "#F0F4F8" }} />
                {ciudades.map((c) =>
                  visibleCities.includes(c.nombre) ? (
                    <Line
                      key={c.nombre}
                      type="monotone"
                      dataKey={c.nombre}
                      stroke={getColorByCalidad(c.calidad)}
                      strokeWidth={highlightCity === c.nombre ? 5 : 2}
                      dot={highlightCity === c.nombre ? { r: 6, fill: getColorByCalidad(c.calidad) } : false}
                      isAnimationActive={true}
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>

            {/* Simbología */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {ciudades.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div style={{ width: 20, height: 10, backgroundColor: getColorByCalidad(c.calidad) }} />
                  <span className="text-[#111827]">{c.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gráficas de pastel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6]/30 transition-all duration-500 hover:scale-[1.02]">
              <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
                Distribución de Contaminantes en Michoacán
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataPieContaminantes} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={{ fill: "#6B7280", fontWeight: "bold" }}>
                    {dataPieContaminantes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ color: "#111827", background: "#F0F4F8" }} />
                  <Legend wrapperStyle={{ color: "#111827" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#3B82F6]/30 transition-all duration-500 hover:scale-[1.02]">
              <h4 className="text-lg font-semibold mb-4 text-[#111827] text-center">
                Calidad del Aire en Michoacán
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataPieCalidades} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={{ fill: "#6B7280", fontWeight: "bold" }}>
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

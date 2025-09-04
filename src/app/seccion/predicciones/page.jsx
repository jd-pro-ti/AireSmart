'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Airplay, Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

export default function IAClimaProfesional() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pregunta, setPregunta] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Inicializar datos solo en el cliente
  useEffect(() => {
    setEstados([
      { nombre: 'Morelia', clima: 'Soleado', temperatura: 25, humedad: 40, calidad: 'Buena' },
      { nombre: 'Uruapan', clima: 'Nublado', temperatura: 22, humedad: 55, calidad: 'Razonablemente buena' },
      { nombre: 'Zamora', clima: 'Lluvia ligera', temperatura: 20, humedad: 60, calidad: 'Moderada' },
      { nombre: 'Lázaro Cárdenas', clima: 'Soleado y húmedo', temperatura: 30, humedad: 50, calidad: 'Alta' },
      { nombre: 'Zitácuaro', clima: 'Parcialmente nublado', temperatura: 24, humedad: 45, calidad: 'Buena' },
      { nombre: 'Apatzingán', clima: 'Soleado', temperatura: 28, humedad: 35, calidad: 'Razonablemente buena' },
    ]);
    setIsMounted(true);
  }, []);

  // Cambios automáticos de clima y calidad solo en cliente
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setEstados(prev =>
        prev.map(e => {
          const tempChange = Math.floor(Math.random() * 3 - 1);
          const humChange = Math.floor(Math.random() * 5 - 2);
          let calidad = e.calidad;

          const newTemp = e.temperatura + tempChange;
          const newHum = e.humedad + humChange;

          if (newTemp < 20 || newHum > 60) calidad = 'Moderada';
          else if (newTemp >= 20 && newTemp <= 26 && newHum <= 50) calidad = 'Buena';
          else calidad = 'Razonablemente buena';

          return { ...e, temperatura: newTemp, humedad: newHum, calidad };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [isMounted]);

  const generarRespuesta = (texto) => {
    if (!isMounted) return 'Cargando datos...';

    const lower = texto.toLowerCase();
    let mensaje = '';

    const consejos = [
      "💨 Evita actividades al aire libre si la calidad del aire es moderada o alta.",
      "🌤 Disfruta de los días soleados, pero hidrátate adecuadamente.",
      "☔ Usa paraguas o ropa impermeable si hay lluvias.",
      "🌫 Evita ejercicio intenso en áreas con contaminación alta.",
      "🧼 Mantén las ventanas cerradas si la calidad del aire es mala."
    ];

    const pronosticos = [
      "Pronóstico semanal: alternancia de días soleados y parcialmente nublados con lluvias ligeras intermitentes.",
      "La humedad se mantendrá moderada, adecuada para actividades al aire libre.",
      "Temperaturas en aumento hacia finales de la semana, especialmente en zonas costeras."
    ];

    const infoGeneral = [
      "Michoacán cuenta con diversidad climática: zonas costeras cálidas, tierras altas templadas y valles con clima variable.",
      "La calidad del aire varía según la región y la actividad humana, especialmente en ciudades industriales y urbanas.",
      "Se recomienda monitorear la calidad del aire diariamente para protección de la salud."
    ];

    for (let estado of estados) {
      if (lower.includes(estado.nombre.toLowerCase())) {
        mensaje = `📍 Estado: ${estado.nombre}\nClima actual: ${estado.clima}\nTemperatura: ${estado.temperatura}°C\nHumedad: ${estado.humedad}%\nCalidad del aire: ${estado.calidad}\nConsejo: ${consejos[Math.floor(Math.random()*consejos.length)]}\nPronóstico: ${pronosticos[Math.floor(Math.random()*pronosticos.length)]}`;
        return mensaje;
      }
    }

    if (lower.includes('clima')) mensaje = "🌤 Puedes preguntar por el clima de cualquier estado para obtener información detallada y consejos.";
    else if (lower.includes('calidad del aire')) mensaje = "💨 La calidad del aire varía según el estado y las condiciones ambientales. Pregunta por un estado específico para recibir detalles precisos.";
    else if (lower.includes('pronóstico')) mensaje = "🗓 El pronóstico indica días soleados y parcialmente nublados, con lluvias ligeras intermitentes según la región de Michoacán.";
    else if (lower.includes('información general') || lower.includes('info general')) mensaje = infoGeneral[Math.floor(Math.random()*infoGeneral.length)];
    else if (lower.includes('recomendación') || lower.includes('consejo')) mensaje = consejos[Math.floor(Math.random()*consejos.length)];
    else mensaje = "🤖 Lo siento, no entendí tu pregunta. Puedes consultar sobre clima, calidad del aire, pronósticos o información general de un estado específico de Michoacán.";

    return mensaje;
  };

  const enviarPregunta = () => {
    if (!pregunta.trim()) return;

    const nuevaRespuesta = generarRespuesta(pregunta);
    setRespuestas([...respuestas, { pregunta, respuesta: nuevaRespuesta }]);
    setPregunta('');
  };

  const renderIcon = (clima) => {
    const lower = clima.toLowerCase();
    if (lower.includes('soleado')) return <Sun size={32} className="text-yellow-400" />;
    if (lower.includes('nublado')) return <Cloud size={32} className="text-gray-400" />;
    if (lower.includes('lluvia')) return <CloudRain size={32} className="text-blue-400" />;
    if (lower.includes('parcial')) return <CloudSun size={32} className="text-yellow-300" />;
    return <Sun size={32} className="text-yellow-400" />;
  };

  if (!isMounted) return null; // Evitar mismatch SSR

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center justify-start p-6 md:p-8 flex-1">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            🤖 Asistente Profesional de Clima y Calidad del Aire - Michoacán
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-10">
            {estados.map((estado, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center border-l-4 border-blue-400 transition transform hover:-translate-y-1 hover:shadow-2xl">
                {renderIcon(estado.clima)}
                <h2 className="font-semibold text-lg mt-2">{estado.nombre}</h2>
                <p className="text-gray-600 capitalize">{estado.clima}</p>
                <p className="text-gray-700 font-semibold mt-1">Calidad del aire: {estado.calidad}</p>
                <p className="text-sm text-gray-500">Temp: {estado.temperatura}°C | Humedad: {estado.humedad}%</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Airplay size={28} /> Pregúntame sobre clima, calidad del aire y pronósticos
            </h2>

            <textarea
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              placeholder="Ej: ¿Cómo está la calidad del aire en Morelia?"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
            ></textarea>

            <button
              className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              onClick={enviarPregunta}
            >
              Preguntar
            </button>

            <div className="flex flex-col gap-3 mt-2">
              {respuestas.map((item, idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400 text-gray-800 whitespace-pre-line">
                  <p className="font-semibold mb-1">Tú: {item.pregunta}</p>
                  <p>🤖 IA: {item.respuesta}</p>
                </div>
              ))}
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Airplay, Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

export default function IAClima() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pregunta, setPregunta] = useState('');
  const [respuestas, setRespuestas] = useState([]);

  // Datos simulados por estado de Michoacán
  const estados = [
    { nombre: 'Morelia', clima: 'Soleado', temperatura: 25, humedad: 40, calidad: 'Buena' },
    { nombre: 'Uruapan', clima: 'Nublado', temperatura: 22, humedad: 55, calidad: 'Razonablemente buena' },
    { nombre: 'Zamora', clima: 'Lluvia ligera', temperatura: 20, humedad: 60, calidad: 'Moderada' },
    { nombre: 'Lázaro Cárdenas', clima: 'Soleado y húmedo', temperatura: 30, humedad: 50, calidad: 'Alta' },
    { nombre: 'Zitácuaro', clima: 'Parcialmente nublado', temperatura: 24, humedad: 45, calidad: 'Buena' },
    { nombre: 'Apatzingán', clima: 'Soleado', temperatura: 28, humedad: 35, calidad: 'Razonablemente buena' },
  ];

  // Función que simula la IA
  const generarRespuesta = (texto) => {
    const lower = texto.toLowerCase();
    let mensaje = '';

    if (lower.includes('morelia')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'morelia');
      mensaje = `📍 Morelia: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('uruapan')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'uruapan');
      mensaje = `📍 Uruapan: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('zamora')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'zamora');
      mensaje = `📍 Zamora: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('lázaro cárdenas')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'lázaro cárdenas');
      mensaje = `📍 Lázaro Cárdenas: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('zitácuaro')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'zitácuaro');
      mensaje = `📍 Zitácuaro: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('apatzingán')) {
      const e = estados.find(e => e.nombre.toLowerCase() === 'apatzingán');
      mensaje = `📍 Apatzingán: Clima ${e.clima}, Temperatura ${e.temperatura}°C, Humedad ${e.humedad}%, Calidad del aire: ${e.calidad}.`;
    } else if (lower.includes('clima')) {
      mensaje = '🌤 Puedes consultar el clima de cada estado preguntando por el nombre del estado.';
    } else if (lower.includes('calidad del aire')) {
      mensaje = '💨 La calidad del aire varía según el estado. Pregunta por un estado específico para obtener los datos.';
    } else {
      mensaje = '🤖 Lo siento, no entiendo tu pregunta. Pregunta sobre el clima o la calidad del aire en un estado de Michoacán.';
    }

    return mensaje;
  };

  const enviarPregunta = () => {
    if (!pregunta.trim()) return;

    // Agrega la pregunta y la respuesta
    const nuevaRespuesta = generarRespuesta(pregunta);
    setRespuestas([...respuestas, { pregunta, respuesta: nuevaRespuesta }]);
    setPregunta('');
  };

  // Función para mostrar iconos según clima
  const renderIcon = (clima) => {
    const lower = clima.toLowerCase();
    if (lower.includes('soleado')) return <Sun size={32} className="text-yellow-400" />;
    if (lower.includes('nublado')) return <Cloud size={32} className="text-gray-400" />;
    if (lower.includes('lluvia')) return <CloudRain size={32} className="text-blue-400" />;
    if (lower.includes('parcial')) return <CloudSun size={32} className="text-yellow-300" />;
    return <Sun size={32} className="text-yellow-400" />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center justify-start p-6 md:p-8 flex-1">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            🤖 Asistente de Clima y Calidad del Aire - Michoacán
          </h1>

          {/* Lista de estados */}
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

          {/* Chat IA */}
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Airplay size={28} /> Pregúntame sobre clima y calidad del aire
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
                <div key={idx} className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400 text-gray-800">
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

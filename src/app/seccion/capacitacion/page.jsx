'use client';

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Play, Pause, X } from 'lucide-react';

// Datos extendidos de la capacitación
const secciones = [
  {
    titulo: "Introducción a la App",
    descripcion: "Conoce la finalidad de la aplicación y sus funciones principales.",
    detalles: [
      "La app fue diseñada para optimizar tus procesos.",
      "Puedes acceder a todas las funciones desde el menú principal.",
      "Se busca mejorar la eficiencia y reducir errores manuales."
    ]
  },
  {
    titulo: "Registro y Acceso",
    descripcion: "Aprende a crear tu cuenta, iniciar sesión y recuperar tu contraseña de manera segura.",
    detalles: [
      "Para registrarte necesitas un correo válido y contraseña segura.",
      "Si olvidas tu contraseña, la app te guiará paso a paso para recuperarla.",
      "Todos los datos se manejan de forma segura y encriptada."
    ]
  },
  {
    titulo: "Navegación General",
    descripcion: "Explora cómo moverte dentro de la app y acceder a cada sección sin complicaciones.",
    detalles: [
      "La barra lateral te permite cambiar de módulo rápidamente.",
      "Cada módulo tiene submenús para organizar las funcionalidades.",
      "Los iconos ayudan a identificar acciones importantes visualmente."
    ]
  },
  {
    titulo: "Gestión de Inventarios",
    descripcion: "Aprende a agregar, modificar y eliminar productos o muestras y generar reportes.",
    detalles: [
      "Puedes añadir productos con detalles completos de cada ítem.",
      "Modificar o eliminar registros es rápido y seguro.",
      "Los reportes se generan automáticamente con información actualizada."
    ]
  },
  {
    titulo: "Seguridad y Roles",
    descripcion: "Entiende cómo se manejan los permisos dentro de la app y cómo proteger tus datos.",
    detalles: [
      "Cada usuario tiene permisos según su rol asignado.",
      "Se controla el acceso a módulos sensibles para proteger la información.",
      "El sistema registra acciones importantes para auditorías internas."
    ]
  },
  {
    titulo: "Soporte y Ayuda",
    descripcion: "Conoce los canales de ayuda disponibles y cómo reportar problemas para recibir asistencia rápidamente.",
    detalles: [
      "La sección de soporte permite enviar tickets de ayuda.",
      "También se incluyen tutoriales y documentación en línea.",
      "Se garantiza respuesta rápida y seguimiento de cada caso."
    ]
  },
];

export default function CapacitacionIA() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // Función para iniciar voz
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.onend = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const nextStep = () => {
    if (selected && currentStep < selected.detalles.length - 1) {
      setCurrentStep(currentStep + 1);
      speakText(selected.detalles[currentStep + 1]);
    }
  };

  const prevStep = () => {
    if (selected && currentStep > 0) {
      setCurrentStep(currentStep - 1);
      speakText(selected.detalles[currentStep - 1]);
    }
  };

  const openSeccion = (sec) => {
    setSelected(sec);
    setCurrentStep(0);
    speakText(sec.detalles[0]);
  };

  const closeModal = () => {
    setSelected(null);
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center p-4 md:p-6 flex-1">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            📚 Capacitación Interactiva
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {secciones.map((sec, idx) => (
              <div
                key={idx}
                onClick={() => openSeccion(sec)}
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{sec.titulo}</h2>
                <p className="text-gray-700">{sec.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Modal de explicación IA + video de señas */}
          {selected && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeModal}
              ></div>

              <div className="bg-white rounded-2xl p-6 w-11/12 max-w-lg shadow-2xl relative z-10 flex flex-col items-center gap-4">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-4">{selected.titulo}</h2>
                <p className="text-gray-700 mb-4">{selected.detalles[currentStep]}</p>

                {/* Video de señas explicativo */}
                <div className="w-full max-w-sm h-48 overflow-hidden rounded-xl shadow-md mb-4">
                  <video
                    src="/videos/senas_explicativo.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <div className="flex justify-between items-center mt-4 w-full">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="bg-gray-200 px-4 py-2 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition"
                  >
                    ← Anterior
                  </button>

                  <span className="text-gray-500">{currentStep + 1}/{selected.detalles.length}</span>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === selected.detalles.length - 1}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:opacity-50 hover:bg-blue-700 transition"
                  >
                    Siguiente →
                  </button>
                </div>

                <div className="mt-4 flex justify-center items-center gap-4">
                  {speaking ? (
                    <button
                      onClick={() => window.speechSynthesis.cancel()}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <Pause size={18} /> Detener voz
                    </button>
                  ) : (
                    <button
                      onClick={() => speakText(selected.detalles[currentStep])}
                      className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <Play size={18} /> Escuchar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
}

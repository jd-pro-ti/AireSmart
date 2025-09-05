'use client';

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Play, Pause, X, BookOpen } from 'lucide-react';

// ✅ Definimos las secciones de capacitación para AireSmart
const secciones = [
  {
    titulo: "Uso del Sistema",
    descripcion: "Aprende cómo navegar en AireSmart, desde el inicio de sesión hasta el monitoreo en tiempo real.",
    detalles: [
      "Bienvenido a AireSmart, una plataforma diseñada para monitorear la calidad del aire en tiempo real.",
      "El sistema permite visualizar mapas interactivos, reportes automáticos y notificaciones instantáneas.",
      "Puedes acceder a información específica de tu ciudad y consultar la calidad del aire clasificada por colores.",
      "La plataforma está diseñada con un enfoque amigable, intuitivo y adaptable para todo tipo de usuarios.",
    ],
  },
  {
    titulo: "Calidad del Aire",
    descripcion: "Conoce los niveles de calidad y cómo interpretarlos.",
    detalles: [
      "La calidad del aire se mide en función de contaminantes clave: PM2.5, PM10, Ozono (O₃), Dióxido de Nitrógeno (NO₂) y otros.",
      "Los colores ayudan a interpretar los niveles: Verde = Bueno, Amarillo = Moderado, Rojo = Malo.",
      "Estos niveles se actualizan en tiempo real para que siempre tengas información confiable.",
      "AireSmart integra alertas preventivas para proteger tu salud en caso de altos niveles de contaminación.",
    ],
  },
  {
    titulo: "Seguridad y Salud",
    descripcion: "Recomendaciones para cuidar tu salud según el nivel de contaminación.",
    detalles: [
      "En nivel Verde: Actividades al aire libre son seguras.",
      "En nivel Amarillo: Precaución para personas sensibles (niños, adultos mayores, asmáticos).",
      "En nivel Rojo: Se recomienda evitar actividades al aire libre y utilizar cubrebocas.",
      "AireSmart envía notificaciones automáticas según tu ubicación y nivel de contaminación.",
    ],
  },
  {
    titulo: "Capacitación Técnica",
    descripcion: "Guía completa para administradores y técnicos de la plataforma.",
    detalles: [
      "Administradores pueden gestionar usuarios y roles de acceso para mayor seguridad.",
      "Los técnicos tienen acceso a reportes avanzados, gráficas y exportación de datos.",
      "La plataforma incluye herramientas de análisis predictivo con IA para anticipar riesgos.",
      "Se recomienda realizar auditorías mensuales para mantener la integridad de la información.",
    ],
  },
];

export default function CapacitacionIA() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  // ✅ Función de voz IA (más lenta y clara)
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 0.9; // más despacio
      utterance.pitch = 1;
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
    <div className="flex min-h-screen bg-[#F0F4F8]">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <main className="flex flex-col items-center p-4 md:p-6 flex-1">

          {/* Título con icono */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-8 text-center flex items-center gap-2">
            <BookOpen className="w-9 h-9 text-[#1E3A8A]" /> Capacitación Interactiva - AireSmart
          </h1>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {secciones.map((sec, idx) => (
              <div
                key={idx}
                onClick={() => openSeccion(sec)}
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-[#111827] mb-2">{sec.titulo}</h2>
                <p className="text-[#6B7280]">{sec.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selected && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={closeModal}
              ></div>

              <div className="bg-white rounded-2xl p-6 w-11/12 max-w-lg shadow-2xl relative z-10 flex flex-col items-center gap-4">
                <button
                  className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827]"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-[#111827] mb-4">{selected.titulo}</h2>
                <p className="text-[#6B7280] mb-4">{selected.detalles[currentStep]}</p>

                {/* Botones navegación */}
                <div className="flex justify-between items-center mt-4 w-full">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="bg-[#F0F4F8] text-[#111827] px-4 py-2 rounded-xl disabled:opacity-50 hover:bg-[#E0E7FF] transition"
                  >
                    ← Anterior
                  </button>

                  <span className="text-[#6B7280]">{currentStep + 1}/{selected.detalles.length}</span>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === selected.detalles.length - 1}
                    className="bg-[#1E3A8A] text-white px-4 py-2 rounded-xl disabled:opacity-50 hover:bg-[#3B82F6] transition"
                  >
                    Siguiente →
                  </button>
                </div>

                {/* Botón de voz IA */}
                <div className="mt-4 flex justify-center items-center gap-4">
                  {speaking ? (
                    <button
                      onClick={() => window.speechSynthesis.cancel()}
                      className="bg-[#EF4444] text-white px-4 py-2 rounded-xl hover:bg-[#DC2626] transition flex items-center gap-2"
                    >
                      <Pause size={18} /> Detener voz
                    </button>
                  ) : (
                    <button
                      onClick={() => speakText(selected.detalles[currentStep])}
                      className="bg-[#10B981] text-white px-4 py-2 rounded-xl hover:bg-[#059669] transition flex items-center gap-2"
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

"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#e0ded5] border-t border-gray-400 text-gray-800 py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Nombre del proyecto */}
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} AIR Quiality - Todos los derechos reservados
        </p>
        
        {/* Links */}
        <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
          <a href="#" className="hover:text-purple-700">Política de Privacidad</a>
          <a href="#" className="hover:text-purple-700">Términos de Uso</a>
          <a href="#" className="hover:text-purple-700">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
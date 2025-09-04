'use client'
import React, { useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar dentro del Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay transparente */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              CALIDAD DEL AIRE EN TIEMPO REAL
            </h2>

            {/* Aquí va el resto de tu contenido */}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

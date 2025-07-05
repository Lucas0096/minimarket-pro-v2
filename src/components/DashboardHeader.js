import React from 'react';

const DashboardHeader = ({ user, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white">Minimarket PRO</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 text-sm hidden sm:block">Bienvenido, {user.name}</span>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
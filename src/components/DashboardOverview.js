import React from 'react';

const DashboardOverview = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Panel de Control</h2>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Ventas Totales</p>
            <p className="text-3xl font-bold text-emerald-500 mt-1">{formatCurrency(stats.totalSales)}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12m-6-4h.01M3 12l2.408 1.204C7.92 13.998 8.99 14 10 14c.707 0 1.407-.071 2.1-.213m0 0l-2.293 2.293A7 7 0 0012 21h7.586a2 2 0 001.414-.586l2-2V12.586a2 2 0 00-.586-1.414l-2-2A2 2 0 0015.414 8H12z" />
          </svg>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Usuarios Registrados</p>
            <p className="text-3xl font-bold text-blue-500 mt-1">{stats.totalUsers}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2C3.547 15.342 6.429 12 12 12s8.453 3.342 10 8h-5zm0 0v-2a3 3 0 00-5.356-1.857M12 12a4 4 0 100-8 4 4 0 000 8zm-2 10h4v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2h4z" />
          </svg>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Mercados Activos</p>
            <p className="text-3xl font-bold text-purple-500 mt-1">{stats.totalMarkets}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Productos en Inventario</p>
            <p className="text-3xl font-bold text-yellow-500 mt-1">{stats.totalProducts}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
      </div>

      {/* Ventas Recientes */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Ventas Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID Venta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mercado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stats.recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{sale.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(sale.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.market}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-emerald-500">{formatCurrency(sale.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Productos Más Vendidos */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Productos Más Vendidos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Unidades Vendidas</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ingresos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stats.topProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">{product.sold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-emerald-500">{formatCurrency(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
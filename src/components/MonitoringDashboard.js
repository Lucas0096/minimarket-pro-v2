import React from 'react';

const MonitoringDashboard = () => {
  // Datos de ejemplo para el monitoreo
  const metrics = [
    { id: 1, name: 'Uso de CPU', value: '65%', unit: '', status: 'high', trend: 'up', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v5m3 0h.01M12 12h.01M12 15h.01M12 18h.01" />
      </svg>
    )},
    { id: 2, name: 'Uso de Memoria', value: '40%', unit: '', status: 'normal', trend: 'stable', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )},
    { id: 3, name: 'Latencia de Red', value: '50', unit: 'ms', status: 'normal', trend: 'down', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )},
    { id: 4, name: 'Errores por Minuto', value: '2', unit: '', status: 'low', trend: 'stable', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  const serviceStatus = [
    { name: 'users-service', status: 'running', uptime: '2d 14h', health: 'healthy' },
    { name: 'markets-service', status: 'running', uptime: '2d 14h', health: 'healthy' },
    { name: 'payments-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'inventory-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'billing-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'stats-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'logs-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'notifications-service', status: 'running', uptime: '1d 20h', health: 'healthy' },
    { name: 'api-gateway', status: 'running', uptime: '2d 14h', health: 'healthy' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'healthy': return 'text-green-500';
      case 'unhealthy': return 'text-red-500';
      case 'stopped': return 'bg-red-500';
      case 'high': return 'text-red-500';
      case 'normal': return 'text-green-500';
      case 'low': return 'text-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
      case 'down': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
      case 'stable': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
      default: return null;
    }
  };

  const handleRestartService = (serviceName) => {
    // Aquí iría la lógica para llamar a la API de reinicio del servicio
    console.log(`Reiniciando servicio: ${serviceName}`);
    // En un entorno real, esto haría una llamada a un endpoint de la API Gateway
    // que a su vez orquestaría el reinicio del microservicio correspondiente.
    // Por ejemplo: fetch(`/api/restart-service/${serviceName}`, { method: 'POST' });
    alert(`Solicitud de reinicio enviada para ${serviceName}.`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Monitoreo del Sistema</h2>

      {/* Resumen de Métricas Clave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{metric.name}</p>
              <p className="text-3xl font-bold text-white mt-1">
                {metric.value}
                <span className="text-lg font-normal text-gray-400 ml-1">{metric.unit}</span>
              </p>
              <div className={`flex items-center text-sm mt-2 ${getStatusColor(metric.status)}`}>
                {getTrendIcon(metric.trend)}
                <span className="ml-1 capitalize">{metric.status}</span>
              </div>
            </div>
            {metric.icon}
          </div>
        ))}
      </div>

      {/* Estado de los Microservicios */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Estado de Microservicios</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Servicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Salud</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {serviceStatus.map(service => (
                <tr key={service.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(service.status)} text-white`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{service.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-semibold ${getStatusColor(service.health)}`}>
                      {service.health}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRestartService(service.name)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                      title="Reiniciar Servicio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enlaces a Herramientas de Monitoreo */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="http://localhost:9090"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
          Ir a Prometheus
        </a>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m-4 8h4m10-4h4m-4 4h4M7 12h10" />
          </svg>
          Ir a Grafana
        </a>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
// DONE
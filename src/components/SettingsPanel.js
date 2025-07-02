import React, { useState } from 'react';

const SettingsPanel = ({ settings, onSave }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(settings || {
    general: {
      companyName: '',
      email: '',
      phone: '',
      address: '',
      taxId: '',
      currency: 'EUR',
      language: 'es'
    },
    appearance: {
      theme: 'dark',
      primaryColor: '#10b981',
      logo: null
    },
    notifications: {
      email: true,
      browser: true,
      lowStock: true,
      newSales: true,
      newUsers: true,
      expiringSubscriptions: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'medium'
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Configuración</h2>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Tabs de navegación */}
          <div className="w-full sm:w-64 bg-gray-900 p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-700">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'general'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 h-5 w-5 ${activeTab === 'general' ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                General
              </button>

              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'appearance'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 h-5 w-5 ${activeTab === 'appearance' ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Apariencia
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 h-5 w-5 ${activeTab === 'notifications' ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notificaciones
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 h-5 w-5 ${activeTab === 'security' ? 'text-emerald-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Seguridad
              </button>
            </nav>
          </div>

          {/* Contenido de la configuración */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {/* Configuración General */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">Información General</h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.general.companyName}
                        onChange={(e) => handleInputChange('general', 'companyName', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.general.email}
                        onChange={(e) => handleInputChange('general', 'email', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={formData.general.phone}
                        onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium text-gray-300">
                        NIF/CIF
                      </label>
                      <input
                        type="text"
                        id="taxId"
                        value={formData.general.taxId}
                        onChange={(e) => handleInputChange('general', 'taxId', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                        Dirección
                      </label>
                      <textarea
                        id="address"
                        rows="3"
                        value={formData.general.address}
                        onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-300">
                        Moneda
                      </label>
                      <select
                        id="currency"
                        value={formData.general.currency}
                        onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dólar estadounidense ($)</option>
                        <option value="GBP">Libra esterlina (£)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-300">
                        Idioma
                      </label>
                      <select
                        id="language"
                        value={formData.general.language}
                        onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Apariencia */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">Apariencia</h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Tema
                      </label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="theme-dark"
                            name="theme"
                            type="radio"
                            checked={formData.appearance.theme === 'dark'}
                            onChange={() => handleInputChange('appearance', 'theme', 'dark')}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 bg-gray-700"
                          />
                          <label htmlFor="theme-dark" className="ml-3 block text-sm font-medium text-gray-300">
                            Oscuro
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="theme-light"
                            name="theme"
                            type="radio"
                            checked={formData.appearance.theme === 'light'}
                            onChange={() => handleInputChange('appearance', 'theme', 'light')}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 bg-gray-700"
                          />
                          <label htmlFor="theme-light" className="ml-3 block text-sm font-medium text-gray-300">
                            Claro
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="theme-system"
                            name="theme"
                            type="radio"
                            checked={formData.appearance.theme === 'system'}
                            onChange={() => handleInputChange('appearance', 'theme', 'system')}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 bg-gray-700"
                          />
                          <label htmlFor="theme-system" className="ml-3 block text-sm font-medium text-gray-300">
                            Sistema
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-300">
                        Color Primario
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="color"
                          id="primaryColor"
                          value={formData.appearance.primaryColor}
                          onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                          className="h-8 w-8 rounded-md border border-gray-600 bg-gray-700 cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-gray-400">{formData.appearance.primaryColor}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Logo
                      </label>
                      <div className="mt-1 flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-md bg-gray-700 flex items-center justify-center border border-gray-600">
                          {formData.appearance.logo ? (
                            <img src={formData.appearance.logo} alt="Logo" className="h-14 w-14 object-contain" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          Subir Logo
                        </button>
                        {formData.appearance.logo && (
                          <button
                            type="button"
                            onClick={() => handleInputChange('appearance', 'logo', null)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Recomendado: PNG o SVG, 512x512px o mayor.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">Notificaciones</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          checked={formData.notifications.email}
                          onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-notifications" className="font-medium text-gray-300">Notificaciones por Email</label>
                        <p className="text-gray-400">Recibir notificaciones importantes por correo electrónico.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="browser-notifications"
                          type="checkbox"
                          checked={formData.notifications.browser}
                          onChange={(e) => handleInputChange('notifications', 'browser', e.target.checked)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="browser-notifications" className="font-medium text-gray-300">Notificaciones del Navegador</label>
                        <p className="text-gray-400">Mostrar notificaciones en el navegador mientras estás usando la aplicación.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="text-sm font-medium text-white mb-3">Eventos de notificación</h4>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="low-stock"
                              type="checkbox"
                              checked={formData.notifications.lowStock}
                              onChange={(e) => handleInputChange('notifications', 'lowStock', e.target.checked)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="low-stock" className="font-medium text-gray-300">Stock bajo</label>
                            <p className="text-gray-400">Notificar cuando un producto esté por debajo del nivel mínimo de stock.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-sales"
                              type="checkbox"
                              checked={formData.notifications.newSales}
                              onChange={(e) => handleInputChange('notifications', 'newSales', e.target.checked)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new-sales" className="font-medium text-gray-300">Nuevas ventas</label>
                            <p className="text-gray-400">Notificar cuando se registre una nueva venta.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-users"
                              type="checkbox"
                              checked={formData.notifications.newUsers}
                              onChange={(e) => handleInputChange('notifications', 'newUsers', e.target.checked)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="new-users" className="font-medium text-gray-300">Nuevos usuarios</label>
                            <p className="text-gray-400">Notificar cuando se registre un nuevo usuario.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="expiring-subscriptions"
                              type="checkbox"
                              checked={formData.notifications.expiringSubscriptions}
                              onChange={(e) => handleInputChange('notifications', 'expiringSubscriptions', e.target.checked)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="expiring-subscriptions" className="font-medium text-gray-300">Suscripciones por expirar</label>
                            <p className="text-gray-400">Notificar cuando una suscripción esté próxima a expirar.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">Seguridad</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="two-factor-auth"
                          type="checkbox"
                          checked={formData.security.twoFactorAuth}
                          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 rounded bg-gray-700"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="two-factor-auth" className="font-medium text-gray-300">Autenticación de dos factores</label>
                        <p className="text-gray-400">Habilitar la verificación en dos pasos para mayor seguridad.</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-300">
                        Tiempo de inactividad (minutos)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="session-timeout"
                          min="5"
                          max="120"
                          value={formData.security.sessionTimeout}
                          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Cerrar sesión automáticamente después de este tiempo de inactividad.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="password-policy" className="block text-sm font-medium text-gray-300">
                        Política de contraseñas
                      </label>
                      <select
                        id="password-policy"
                        value={formData.security.passwordPolicy}
                        onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="low">Básica (mínimo 6 caracteres)</option>
                        <option value="medium">Media (mínimo 8 caracteres, incluir números)</option>
                        <option value="high">Alta (mínimo 10 caracteres, incluir números, mayúsculas y símbolos)</option>
                      </select>
                      <p className="mt-1 text-sm text-gray-400">
                        Define los requisitos mínimos para las contraseñas de los usuarios.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
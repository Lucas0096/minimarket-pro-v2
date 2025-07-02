import React, { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardOverview from './components/DashboardOverview';
import MarketsList from './components/MarketsList';
import UsersList from './components/UsersList';
import InventoryList from './components/InventoryList';
import SalesList from './components/SalesList';
import InvoicesList from './components/InvoicesList';
import SubscriptionsList from './components/SubscriptionsList';
import SettingsPanel from './components/SettingsPanel';

// Importar datos de ejemplo
import { dashboardStats } from './mock/stats';
import { markets } from './mock/markets';
import { users } from './mock/users';
import { products } from './mock/products';
import { sales } from './mock/sales';
import { invoices } from './mock/invoices';
import { subscriptions } from './mock/subscriptions';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState({
    name: 'Admin',
    email: 'admin@minimarket.pro'
  });

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };

  const handleItemAction = (action, id) => {
    console.log(`Acción: ${action}, ID: ${id}`);
  };

  const handleSaveSettings = (settings) => {
    console.log('Guardando configuración:', settings);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          user={currentUser}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto bg-gray-900">
          {activeSection === 'dashboard' && (
            <DashboardOverview stats={dashboardStats} />
          )}

          {activeSection === 'markets' && (
            <MarketsList
              markets={markets}
              onView={(id) => handleItemAction('view', id)}
              onEdit={(id) => handleItemAction('edit', id)}
              onDelete={(id) => handleItemAction('delete', id)}
            />
          )}

          {activeSection === 'users' && (
            <UsersList
              users={users}
              onView={(id) => handleItemAction('view', id)}
              onEdit={(id) => handleItemAction('edit', id)}
              onDelete={(id) => handleItemAction('delete', id)}
            />
          )}

          {activeSection === 'inventory' && (
            <InventoryList
              products={products}
              onView={(id) => handleItemAction('view', id)}
              onEdit={(id) => handleItemAction('edit', id)}
              onDelete={(id) => handleItemAction('delete', id)}
            />
          )}

          {activeSection === 'sales' && (
            <SalesList
              sales={sales}
              onView={(id) => handleItemAction('view', id)}
              onPrint={(id) => handleItemAction('print', id)}
              onCancel={(id) => handleItemAction('cancel', id)}
            />
          )}

          {activeSection === 'invoices' && (
            <InvoicesList
              invoices={invoices}
              onView={(id) => handleItemAction('view', id)}
              onPrint={(id) => handleItemAction('print', id)}
              onDownload={(id) => handleItemAction('download', id)}
            />
          )}

          {activeSection === 'subscriptions' && (
            <SubscriptionsList
              subscriptions={subscriptions}
              onEdit={(id) => handleItemAction('edit', id)}
              onCancel={(id) => handleItemAction('cancel', id)}
              onRenew={(id) => handleItemAction('renew', id)}
            />
          )}

          {activeSection === 'settings' && (
            <SettingsPanel
              settings={{
                general: {
                  companyName: 'Minimarket PRO',
                  email: 'info@minimarket.pro',
                  phone: '+34 912 345 678',
                  address: 'Calle Ejemplo 123, 28001 Madrid, España',
                  taxId: 'B12345678',
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
                  newUsers: false,
                  expiringSubscriptions: true
                },
                security: {
                  twoFactorAuth: false,
                  sessionTimeout: 30,
                  passwordPolicy: 'medium'
                }
              }}
              onSave={handleSaveSettings}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

// DONE
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'users', 'addMarket', 'addUser', 'payments', 'settings', 'permissions'
  const [markets, setMarkets] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data y funciones para simular IndexedDB y auth
  // En un proyecto real, estas funciones vendrían de tus archivos utils/
  const mockData = {
    markets: [
      { id: 'market1', name: 'Mercado Central', lastConnection: Date.now() - 1000 * 60 * 5, subscriptionEndDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).getTime() + 1000 * 60 * 60 * 24 * 10, ownerName: 'Juan', ownerLastName: 'Pérez', ownerDNI: '12345678A', ownerPhone: '5512345678', ownerEmail: 'juan.perez@example.com', address: 'Calle Falsa 123', mapLocation: 'https://maps.google.com/?q=Calle+Falsa+123' },
      { id: 'market2', name: 'Mercado del Sol', lastConnection: Date.now() - 1000 * 60 * 60 * 25, subscriptionEndDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).getTime() + 1000 * 60 * 60 * 24 * 60, ownerName: 'María', ownerLastName: 'García', ownerDNI: '87654321B', ownerPhone: '5587654321', ownerEmail: 'maria.garcia@example.com', address: 'Avenida Siempre Viva 742', mapLocation: 'https://maps.google.com/?q=Avenida+Siempre Viva+742' },
      { id: 'market3', name: 'Mercado de la Luna', lastConnection: Date.now() - 1000 * 60 * 60 * 24 * 30, subscriptionEndDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5).getTime() - 1000 * 60 * 60 * 24 * 5, ownerName: 'Pedro', ownerLastName: 'Rodríguez', ownerDNI: '11223344C', ownerPhone: '5511223344', ownerEmail: 'pedro.rodriguez@example.com', address: 'Boulevard de los Sueños 500', mapLocation: 'https://maps.google.com/?q=Boulevard+de+los+Sueños+500' },
    ],
    users: [
      { id: 1, username: 'admin', password: 'password', role: 'admin', marketId: 'market1', accessBlocked: false, lastActive: Date.now() - 1000 * 60 * 10, permissions: { ventas: true, reportes: true, pagos: true, stock: true } },
      { id: 2, username: 'vendedor1', password: 'pass', role: 'vendedor', marketId: 'market1', accessBlocked: false, lastActive: Date.now() - 1000 * 60 * 30, permissions: { ventas: true, reportes: false, pagos: false, stock: true } },
      { id: 3, username: 'vendedor2', password: 'pass', role: 'vendedor', marketId: 'market2', accessBlocked: true, lastActive: Date.now() - 1000 * 60 * 60 * 2, permissions: { ventas: true, reportes: false, pagos: false, stock: true } },
      { id: 4, username: 'marketOwner1', password: 'pass', role: 'market', marketId: 'market1', accessBlocked: false, lastActive: Date.now() - 1000 * 60 * 60 * 1, permissions: { ventas: true, reportes: true, pagos: true, stock: true } },
      { id: 5, username: 'vendedor3', password: 'pass', role: 'vendedor', marketId: 'market1', accessBlocked: false, lastActive: Date.now() - 1000 * 60 * 45, permissions: { ventas: true, reportes: false, pagos: false, stock: true } },
      { id: 6, username: 'vendedor4', password: 'pass', role: 'vendedor', marketId: 'market2', accessBlocked: false, lastActive: Date.now() - 1000 * 60 * 60 * 3, permissions: { ventas: true, reportes: false, pagos: false, stock: true } },
      { id: 7, username: 'vendedor5', password: 'pass', role: 'vendedor', marketId: 'market3', accessBlocked: true, lastActive: Date.now() - 1000 * 60 * 60 * 24 * 6, permissions: { ventas: true, reportes: false, pagos: false, stock: true } },
    ],
    transactions: [
      { id: 'trans1', date: Date.now() - 1000 * 60 * 60 * 24 * 35, marketId: 'market1', operationNumber: 'OP12345', amount: 100.00 },
      { id: 'trans2', date: Date.now() - 1000 * 60 * 60 * 24 * 65, marketId: 'market2', operationNumber: 'OP67890', amount: 120.00 },
      { id: 'trans3', date: Date.now() - 1000 * 60 * 60 * 24 * 5, marketId: 'market1', operationNumber: 'OP54321', amount: 100.00 },
      { id: 'trans4', date: Date.now() - 1000 * 60 * 60 * 24 * 10, marketId: 'market3', operationNumber: 'OP98765', amount: 90.00 },
    ],
    permissionSections: ['ventas', 'reportes', 'pagos', 'stock'], // Secciones de permisos configurables
    roles: { // Roles predefinidos con sus permisos
      dueño: { ventas: true, reportes: true, pagos: true, stock: true, configuracion: true, usuarios: true },
      encargado: { ventas: true, reportes: true, pagos: false, stock: true, configuracion: false, usuarios: false },
      vendedor: { ventas: true, reportes: false, pagos: false, stock: false, configuracion: false, usuarios: false },
    },
    settings: { // Mock de configuración general
      logoUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=Logo',
      backgroundUrl: 'https://via.placeholder.com/1200x800/CCCCCC/333333?text=Fondo',
      commerceName: 'Mi Comercio',
      openingHours: { // Horarios de apertura por defecto
        monday: [{ start: '09:00', end: '18:00' }],
        tuesday: [{ start: '09:00', end: '18:00' }],
        wednesday: [{ start: '09:00', end: '18:00' }],
        thursday: [{ start: '09:00', end: '18:00' }],
        friday: [{ start: '09:00', end: '18:00' }],
        saturday: [{ start: '10:00', end: '14:00' }],
        sunday: [], // Cerrado
      }
    },
    subscriptionPlans: [
      { id: 'plan1', name: 'Básico', price: 50.00, features: ['Ventas', 'Reportes Básicos'], maxUsers: 5 },
      { id: 'plan2', name: 'Premium', price: 100.00, features: ['Ventas', 'Reportes Avanzados', 'Pagos'], maxUsers: 10 },
    ]
  };

  const getAllData = async (storeName) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData[storeName] || []);
      }, 100);
    });
  };

  const addData = async (storeName, data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockData[storeName].push(data);
        resolve(data);
      }, 100);
    });
  };

  const putData = async (storeName, data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockData[storeName].findIndex(item => item.id === data.id);
        if (index !== -1) {
          mockData[storeName][index] = data;
        }
        resolve(data);
      }, 100);
    });
  };

  const deleteData = async (storeName, id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockData[storeName] = mockData[storeName].filter(item => item.id !== id);
        resolve();
      }, 100);
    });
  };

  const syncLocalStorageWithIndexedDB = (storeName, data) => {
    console.log(`Sincronizando ${storeName} con IndexedDB:`, data);
  };

  const isAdmin = () => {
    return true; // Simulación de isAdmin, en un entorno real esto verificaría el rol del usuario logueado
  };

  // Carga inicial de datos
  const [transactions, setTransactions] = useState([]);
  const [permissionSections, setPermissionSections] = useState([]);
  const [settings, setSettings] = useState({});
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [roles, setRoles] = useState({}); // Nuevo estado para roles

  useEffect(() => {
    const loadData = async () => {
      const savedMarkets = await getAllData('markets');
      const savedUsers = await getAllData('users');
      const savedTransactions = await getAllData('transactions');
      const savedPermissionSections = await getAllData('permissionSections');
      const savedSettings = mockData.settings; // Directamente del mock para settings
      const savedSubscriptionPlans = await getAllData('subscriptionPlans');
      const savedRoles = mockData.roles; // Directamente del mock para roles

      setMarkets(savedMarkets);
      setUsers(savedUsers);
      setTransactions(savedTransactions);
      setPermissionSections(savedPermissionSections);
      setSettings(savedSettings);
      setSubscriptionPlans(savedSubscriptionPlans);
      setRoles(savedRoles);
    };
    loadData();
  }, []);

  // Lógica para agregar/editar usuarios y mercados
  const [editingUser, setEditingUser] = useState(null);
  const [newMarketName, setNewMarketName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('vendedor'); // Ahora se usará para seleccionar rol predefinido
  const [selectedMarketForUser, setSelectedMarketForUser] = useState('');

  // Estado para el nuevo formulario de mercado
  const [newMarketOwnerName, setNewMarketOwnerName] = useState('');
  const [newMarketOwnerLastName, setNewMarketOwnerLastName] = useState('');
  const [newMarketOwnerDNI, setNewMarketOwnerDNI] = useState('');
  const [newMarketOwnerPhone, setNewMarketOwnerPhone] = useState('');
  const [newMarketOwnerEmail, setNewMarketOwnerEmail] = useState('');
  const [newMarketAddress, setNewMarketAddress] = useState('');
  const [newMarketMapLocation, setNewMarketMapLocation] = useState('');

  // Función para calcular la fecha de vencimiento al 5 de un mes
  const calculateSubscriptionEndDate = (baseTimestamp, monthsToAdd = 1) => {
    const baseDate = new Date(baseTimestamp);
    let targetMonth = baseDate.getMonth() + monthsToAdd;
    let targetYear = baseDate.getFullYear();

    // Ajustar año si el mes excede 11
    if (targetMonth > 11) {
      targetYear += Math.floor(targetMonth / 12);
      targetMonth %= 12;
    }

    const newDate = new Date(targetYear, targetMonth, 5);
    newDate.setHours(23, 59, 59, 999); // Fin del día 5
    return newDate.getTime();
  };

  const handleAddMarket = async () => {
    if (!newMarketName.trim() || !newMarketOwnerName.trim() || !newMarketOwnerLastName.trim() || !newMarketOwnerDNI.trim() || !newMarketOwnerPhone.trim() || !newMarketOwnerEmail.trim() || !newMarketAddress.trim() || !newMarketMapLocation.trim()) {
      setMessage({ type: 'error', text: 'Todos los campos del mercado son obligatorios.' });
      return;
    }
    
    const newMarket = {
      id: `market${Date.now()}`,
      name: newMarketName.trim(),
      lastConnection: Date.now(),
      subscriptionEndDate: calculateSubscriptionEndDate(Date.now()), // Fecha de vencimiento al 5 del próximo mes
      ownerName: newMarketOwnerName.trim(),
      ownerLastName: newMarketOwnerLastName.trim(),
      ownerDNI: newMarketOwnerDNI.trim(),
      ownerPhone: newMarketOwnerPhone.trim(),
      ownerEmail: newMarketOwnerEmail.trim(),
      address: newMarketAddress.trim(),
      mapLocation: newMarketMapLocation.trim(),
    };
    
    const updatedMarkets = [...markets, newMarket];
    await addData('markets', newMarket);
    setMarkets(updatedMarkets);
    syncLocalStorageWithIndexedDB('markets', updatedMarkets);
    setNewMarketName('');
    setNewMarketOwnerName('');
    setNewMarketOwnerLastName('');
    setNewMarketOwnerDNI('');
    setNewMarketOwnerPhone('');
    setNewMarketOwnerEmail('');
    setNewMarketAddress('');
    setNewMarketMapLocation('');
    setMessage({ type: 'success', text: `Mercado "${newMarket.name}" agregado con éxito.` });
    setCurrentView('users'); // Volver a la vista de usuarios
  };

  const handleAddUser = async () => {
    setMessage({ type: '', text: '' });
    if (!newUsername.trim() || !newPassword.trim() || !selectedMarketForUser || !newUserRole) {
      setMessage({ type: 'error', text: 'Todos los campos de usuario son obligatorios.' });
      return;
    }

    const allUsers = await getAllData('users');
    if (allUsers.some(u => u.username === newUsername.trim())) {
      setMessage({ type: 'error', text: `El usuario "${newUsername.trim()}" ya existe. Por favor, elige otro.` });
      return;
    }
    
    const newUser = {
      id: Date.now(),
      username: newUsername.trim(),
      password: newPassword.trim(),
      role: newUserRole, // Rol predefinido
      marketId: selectedMarketForUser,
      accessBlocked: false,
      lastActive: Date.now(),
      permissions: roles[newUserRole] || {} // Asignar permisos según el rol
    };
    
    const updatedUsers = [...users, newUser];
    await addData('users', newUser);
    setUsers(updatedUsers);
    syncLocalStorageWithIndexedDB('users', updatedUsers);
    resetUserForm();
    setMessage({ type: 'success', text: `Usuario "${newUser.username}" creado con éxito.` });
    setCurrentView('users'); // Volver a la vista de usuarios
  };

  const handleUpdateUser = async () => {
    setMessage({ type: '', text: '' });
    if (!editingUser || !editingUser.username || !editingUser.password || !editingUser.role) {
      setMessage({ type: 'error', text: 'Todos los campos de usuario son obligatorios.' });
      return;
    }
    
    // Asegurar que los permisos se actualicen si el rol cambia
    const updatedUserWithPermissions = { 
      ...editingUser, 
      permissions: roles[editingUser.role] || {} 
    };

    const updatedUsers = users.map(u => 
      u.id === updatedUserWithPermissions.id ? updatedUserWithPermissions : u
    );
    
    await putData('users', updatedUserWithPermissions);
    setUsers(updatedUsers);
    syncLocalStorageWithIndexedDB('users', updatedUsers);
    handleCancelEdit();
    setMessage({ type: 'success', text: `Usuario "${updatedUserWithPermissions.username}" actualizado con éxito.` });
  };

  const handleDeleteUser = async (id) => {
    setMessage({ type: '', text: '' });
    const userToDelete = users.find(u => u.id === id);
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario "${userToDelete.username}"?`)) {
      await deleteData('users', id);
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      syncLocalStorageWithIndexedDB('users', updatedUsers);
      setMessage({ type: 'success', text: `Usuario "${userToDelete.username}" eliminado con éxito.` });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setNewUsername(user.username);
    setNewPassword(user.password);
    setNewUserRole(user.role);
    setSelectedMarketForUser(user.marketId);
    setCurrentView('addUser'); // Ir a la vista de agregar/editar usuario
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    resetUserForm();
    setCurrentView('users'); // Volver a la vista de usuarios
  };

  const resetUserForm = () => {
    setNewUsername('');
    setNewPassword('');
    setNewUserRole('vendedor');
    setSelectedMarketForUser('');
  };

  // Lógica para acciones de usuario y mercado
  const handleUserAction = async (userId, actionType) => {
    console.log(`Acción de usuario: ${actionType} para ID: ${userId}`);
    // Implementación simulada
    setMessage({ type: 'success', text: `Acción '${actionType}' simulada para usuario ${userId}.` });
  };

  const handleMarketAction = async (marketId, actionType, value = null) => {
    setMessage({ type: '', text: '' });
    const marketToUpdate = markets.find(m => m.id === marketId);
    if (!marketToUpdate) return;

    let updatedMarket = { ...marketToUpdate };
    let actionMessage = '';

    switch (actionType) {
      case 'resetDays':
        // Si se resetean los días, la nueva fecha de vencimiento es el 5 del próximo mes
        updatedMarket.subscriptionEndDate = calculateSubscriptionEndDate(Date.now());
        actionMessage = `Días de suscripción de ${updatedMarket.name} reseteados.`;
        break;
      case 'blockAccess':
        updatedMarket.subscriptionEndDate = Date.now() - 1; // Bloqueo inmediato
        actionMessage = `Acceso de ${updatedMarket.name} bloqueado.`;
        break;
      case 'extendDays':
        // Extender la fecha de vencimiento actual por un mes calendario (al día 5)
        // Si la fecha de vencimiento actual ya pasó o es el día 5 del mes actual o anterior,
        // se extiende desde hoy al 5 del próximo mes.
        // Si la fecha de vencimiento actual es futura, se extiende desde esa fecha al 5 del siguiente mes.
        const currentEndDate = new Date(updatedMarket.subscriptionEndDate);
        const today = new Date();
        let newEndDateTimestamp;

        // Si la fecha de vencimiento actual ya pasó o es el día 5 del mes actual o anterior
        if (currentEndDate.getTime() <= today.getTime() || (currentEndDate.getDate() === 5 && currentEndDate.getMonth() <= today.getMonth() && currentEndDate.getFullYear() <= today.getFullYear())) {
          // Extender desde hoy al 5 del próximo mes
          newEndDateTimestamp = calculateSubscriptionEndDate(today.getTime());
        } else {
          // Extender desde la fecha de vencimiento actual al 5 del siguiente mes
          newEndDateTimestamp = calculateSubscriptionEndDate(currentEndDate.getTime());
        }
        updatedMarket.subscriptionEndDate = newEndDateTimestamp;
        actionMessage = `Suscripción de ${updatedMarket.name} extendida por 30 días.`;
        break;
      case 'sendReminder':
        actionMessage = `Recordatorio de pago enviado a ${updatedMarket.name}. (Simulado)`;
        break;
      case 'unblockAccess':
        // Al desbloquear, la nueva fecha de vencimiento es el 5 del próximo mes
        updatedMarket.subscriptionEndDate = calculateSubscriptionEndDate(Date.now());
        actionMessage = `Acceso de ${updatedMarket.name} desbloqueado.`;
        break;
      default:
        return;
    }

    try {
      await putData('markets', updatedMarket);
      const updatedMarketsList = markets.map(m => m.id === marketId ? updatedMarket : m);
      setMarkets(updatedMarketsList);
      syncLocalStorageWithIndexedDB('markets', updatedMarketsList);
      setMessage({ type: 'success', text: actionMessage });
    } catch (error) {
      setMessage({ type: 'error', text: `Error al realizar la acción: ${error.message}` });
    }
  };

  // Funciones de formato de tiempo
  const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp; // Diferencia en milisegundos

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  };

  const getRemainingTime = (endDate) => {
    const now = Date.now(); 
    const diff = endDate - now; // Diferencia en milisegundos

    if (diff <= 0) return { text: 'Bloqueado', color: 'text-red-600', days: 0, hours: 0, minutes: 0, seconds: 0 };

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    let text = '';
    if (days > 0) text += `${days} día${days > 1 ? 's' : ''} `;
    if (remainingHours > 0) text += `${remainingHours} hr${remainingHours > 1 ? 's' : ''} `;
    if (remainingMinutes > 0) text += `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0 && days === 0 && remainingHours === 0 && remainingMinutes === 0) text += `${remainingSeconds} seg`; // Solo segundos si es lo único que queda

    if (text === '') text = 'Menos de 1 seg';

    return { 
      text: text.trim(), 
      color: days <= 7 ? 'text-orange-600' : 'text-green-600',
      days: days,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds
    };
  };

  const sendReminder = (market, type, daysBefore = null) => {
    let subject = `Recordatorio de Pago - ${market.name}`;
    let body = `Estimado ${market.ownerName} ${market.ownerLastName},\n\n`;
    const remaining = getRemainingTime(market.subscriptionEndDate);
    const isBlocked = remaining.text === 'Bloqueado';

    if (isBlocked) {
      body += `Su suscripción para el mercado "${market.name}" ha vencido. Su acceso ha sido bloqueado.\n`;
      body += `Por favor, realice el pago para reactivar su servicio. Puede haber recargos aplicables.\n\n`;
      subject = `URGENTE: Suscripción Vencida - ${market.name}`;
    } else if (daysBefore === 7) {
      body += `Le recordamos que su suscripción para el mercado "${market.name}" vencerá en ${remaining.days} días.\n`;
      body += `Por favor, realice el pago a tiempo para evitar interrupciones en el servicio.\n\n`;
    } else if (daysBefore === 1) { // 24 horas
      body += `¡Último recordatorio! Su suscripción para el mercado "${market.name}" vencerá en menos de 24 horas.\n`;
      body += `Asegúrese de realizar el pago para mantener su servicio activo.\n\n`;
    } else {
      body += `Este es un recordatorio general sobre su suscripción para el mercado "${market.name}".\n`;
      body += `Días restantes: ${remaining.text}.\n\n`;
    }

    body += `Gracias por su atención.\n\nAtentamente,\nEl equipo de Administración.`;

    if (type === 'email') {
      window.open(`mailto:${market.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      setMessage({ type: 'success', text: `Recordatorio por correo enviado a ${market.ownerName} (${market.ownerEmail}).` });
    } else if (type === 'whatsapp') {
      const whatsappUrl = `https://wa.me/${market.ownerPhone}?text=${encodeURIComponent(body)}`;
      window.open(whatsappUrl, '_blank');
      setMessage({ type: 'success', text: `Recordatorio por WhatsApp enviado a ${market.ownerName} (${market.ownerPhone}).` });
    }
  };


  if (!isAdmin()) {
    return <div className="text-center py-10 text-gray-800 dark:text-white">Acceso no autorizado.</div>;
  }

  // Agrupar usuarios por mercado
  const usersByMarket = markets.reduce((acc, market) => {
    acc[market.id] = users.filter(user => user.marketId === market.id && user.role !== 'admin');
    return acc;
  }, {});

  // Lógica del calendario
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredDayInfo, setHoveredDayInfo] = useState(null); // Para el tooltip del calendario

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const calendarDays = [];

    // Fill leading empty days
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2 text-center text-gray-400"></div>);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      
      // Días de pago (1 al 5)
      const isPaymentPeriod = day >= 1 && day <= 5;

      // Días de bloqueo (cuando la suscripción de un mercado termina)
      const blockingMarkets = markets.filter(market => {
        const endDate = new Date(market.subscriptionEndDate);
        return endDate.getDate() === day && endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear;
      });
      const isBlockingDay = blockingMarkets.length > 0;

      calendarDays.push(
        <div 
          key={day} 
          className={`relative p-2 text-center rounded-lg 
            ${isToday ? 'bg-blue-200 text-blue-800 font-bold' : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white'} 
            ${isPaymentPeriod ? 'bg-green-100 text-green-800 font-bold border-2 border-green-500' : ''}
            ${isBlockingDay ? 'bg-red-100 text-red-800 font-bold border-2 border-red-500' : ''}
          `}
          onMouseEnter={() => {
            if (isBlockingDay) {
              setHoveredDayInfo({ day, markets: blockingMarkets.map(m => m.name) });
            }
          }}
          onMouseLeave={() => setHoveredDayInfo(null)}
        >
          {day}
          {hoveredDayInfo && hoveredDayInfo.day === day && (
            <div className="absolute z-10 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg -mt-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Mercados que se bloquean:
              {hoveredDayInfo.markets.map((name, index) => (
                <div key={index}>{name}</div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Lógica de búsqueda de transacciones
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTransactions = transactions.filter(transaction => {
    const market = markets.find(m => m.id === transaction.marketId);
    const ownerName = market ? `${market.ownerName} ${market.ownerLastName}` : '';
    const marketName = market ? market.name : '';
    const transactionDate = new Date(transaction.date).toLocaleDateString();
    
    return (
      transactionDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.operationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm.toLowerCase())
    );
  });

  // Lógica de Permisos y Roles Avanzados
  const [selectedUserForPermissions, setSelectedUserForPermissions] = useState(null);
  const [newPermissionSectionName, setNewPermissionSectionName] = useState('');

  const handleTogglePermission = async (userId, section) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    const updatedPermissions = {
      ...userToUpdate.permissions,
      [section]: !userToUpdate.permissions[section]
    };
    const updatedUser = { ...userToUpdate, permissions: updatedPermissions };

    await putData('users', updatedUser);
    // Actualizar el estado local de users
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? updatedUser : u));
    // Si el usuario seleccionado es el que se está editando, actualizar también su estado
    if (selectedUserForPermissions && selectedUserForPermissions.id === userId) {
      setSelectedUserForPermissions(updatedUser);
    }
    syncLocalStorageWithIndexedDB('users', users.map(u => u.id === userId ? updatedUser : u));
    setMessage({ type: 'success', text: `Permiso de ${section} para ${userToUpdate.username} actualizado.` });
  };

  const handleAddPermissionSection = async () => {
    if (!newPermissionSectionName.trim()) {
      setMessage({ type: 'error', text: 'El nombre de la sección no puede estar vacío.' });
      return;
    }
    const normalizedName = newPermissionSectionName.trim().toLowerCase();
    if (permissionSections.includes(normalizedName)) {
      setMessage({ type: 'error', text: `La sección "${newPermissionSectionName}" ya existe.` });
      return;
    }

    const updatedSections = [...permissionSections, normalizedName];
    // En un entorno real, esto se guardaría en la DB
    // await addData('permissionSections', normalizedName); 
    setPermissionSections(updatedSections);

    // Inicializar este nuevo permiso para todos los usuarios existentes
    const updatedUsers = users.map(user => ({
      ...user,
      permissions: {
        ...user.permissions,
        [normalizedName]: false // Por defecto, sin permisos
      }
    }));
    // Esto requeriría actualizar cada usuario en la DB, lo cual puede ser costoso.
    // Para el mock, simplemente actualizamos el estado local.
    setUsers(updatedUsers);
    // Si el usuario seleccionado es el que se está editando, actualizar también su estado
    if (selectedUserForPermissions) {
      setSelectedUserForPermissions(prevUser => ({
        ...prevUser,
        permissions: {
          ...prevUser.permissions,
          [normalizedName]: false
        }
      }));
    }

    setNewPermissionSectionName('');
    setMessage({ type: 'success', text: `Sección de permiso "${newPermissionSectionName}" agregada.` });
  };

  const handleRemovePermissionSection = async (sectionToRemove) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la sección de permiso "${sectionToRemove}"? Esto eliminará el permiso para todos los usuarios.`)) {
      const updatedSections = permissionSections.filter(s => s !== sectionToRemove);
      // En un entorno real, esto se eliminaría de la DB
      // await deleteData('permissionSections', sectionToRemove); 
      setPermissionSections(updatedSections);

      // Eliminar este permiso de todos los usuarios existentes
      const updatedUsers = users.map(user => {
        const newPermissions = { ...user.permissions };
        delete newPermissions[sectionToRemove];
        return { ...user, permissions: newPermissions };
      });
      setUsers(updatedUsers);
      // Si el usuario seleccionado es el que se está editando, actualizar también su estado
      if (selectedUserForPermissions) {
        setSelectedUserForPermissions(prevUser => {
          const newPermissions = { ...prevUser.permissions };
          delete newPermissions[sectionToRemove];
          return { ...prevUser, permissions: newPermissions };
        });
      }

      setMessage({ type: 'success', text: `Sección de permiso "${sectionToRemove}" eliminada.` });
    }
  };

  // Lógica de Configuración General
  const handleSettingsChange = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
    // En un entorno real, esto se guardaría en la DB
    // putData('settings', { ...settings, [key]: value });
    setMessage({ type: 'success', text: `Configuración de ${key} actualizada.` });
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSettingsChange(key, reader.result); // reader.result es la URL base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Lógica para horarios de apertura
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const weekendDays = ['saturday', 'sunday'];
  const dayNames = {
    monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles', thursday: 'Jueves',
    friday: 'Viernes', saturday: 'Sábado', sunday: 'Domingo'
  };

  const handleOpeningHoursChange = (day, index, field, value) => {
    setSettings(prevSettings => {
      const newOpeningHours = { ...prevSettings.openingHours };
      if (!newOpeningHours[day]) {
        newOpeningHours[day] = [];
      }
      if (!newOpeningHours[day][index]) {
        newOpeningHours[day][index] = { start: '', end: '' };
      }
      newOpeningHours[day][index][field] = value;
      return { ...prevSettings, openingHours: newOpeningHours };
    });
  };

  const addTimeSlot = (day) => {
    setSettings(prevSettings => {
      const newOpeningHours = { ...prevSettings.openingHours };
      if (!newOpeningHours[day]) {
        newOpeningHours[day] = [];
      }
      newOpeningHours[day].push({ start: '', end: '' });
      return { ...prevSettings, openingHours: newOpeningHours };
    });
  };

  const removeTimeSlot = (day, index) => {
    setSettings(prevSettings => {
      const newOpeningHours = { ...prevSettings.openingHours };
      newOpeningHours[day].splice(index, 1);
      return { ...prevSettings, openingHours: newOpeningHours };
    });
  };

  // Lógica de Suscripciones
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanPrice, setNewPlanPrice] = useState('');
  const [newPlanFeatures, setNewPlanFeatures] = useState('');
  const [newPlanMaxUsers, setNewPlanMaxUsers] = useState('');

  const handleAddSubscriptionPlan = async () => {
    if (!newPlanName.trim() || !newPlanPrice.trim() || !newPlanFeatures.trim() || !newPlanMaxUsers.trim()) {
      setMessage({ type: 'error', text: 'Todos los campos del plan son obligatorios.' });
      return;
    }
    const newPlan = {
      id: `plan${Date.now()}`,
      name: newPlanName.trim(),
      price: parseFloat(newPlanPrice),
      features: newPlanFeatures.split(',').map(f => f.trim()),
      maxUsers: parseInt(newPlanMaxUsers),
    };

    const updatedPlans = [...subscriptionPlans, newPlan];
    await addData('subscriptionPlans', newPlan);
    setSubscriptionPlans(updatedPlans);
    setNewPlanName('');
    setNewPlanPrice('');
    setNewPlanFeatures('');
    setNewPlanMaxUsers('');
    setMessage({ type: 'success', text: `Plan "${newPlan.name}" agregado con éxito.` });
  };

  const handleDeleteSubscriptionPlan = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este plan de suscripción?')) {
      await deleteData('subscriptionPlans', id);
      setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== id));
      setMessage({ type: 'success', text: 'Plan de suscripción eliminado.' });
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Panel de Administración</h2>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {currentView === 'main' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => setCurrentView('users')}
              className="flex flex-col items-center justify-center p-6 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors h-32"
            >
              <span className="text-2xl font-bold">Mercados y Usuarios</span> {/* Renombrado */}
              <span className="text-sm mt-2">Ver y gestionar usuarios existentes</span>
            </button>
            <button
              onClick={() => setCurrentView('payments')}
              className="flex flex-col items-center justify-center p-6 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors h-32"
            >
              <span className="text-2xl font-bold">Pagos</span>
              <span className="text-sm mt-2">Gestionar estados de pago de mercados</span>
            </button>
            <button
              onClick={() => setCurrentView('permissions')}
              className="flex flex-col items-center justify-center p-6 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors h-32"
            >
              <span className="text-2xl font-bold">Permisos y Roles Avanzados</span>
              <span className="text-sm mt-2">Configurar accesos y roles de usuario</span>
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className="flex flex-col items-center justify-center p-6 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors h-32"
            >
              <span className="text-2xl font-bold">Configuración General</span>
              <span className="text-sm mt-2">Personalizar el sistema</span>
            </button>
          </div>
        )}

        {currentView === 'addMarket' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Crear Nuevo Mercado</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={newMarketName}
                onChange={(e) => setNewMarketName(e.target.value)}
                placeholder="Nombre del Mercado"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="text"
                value={newMarketOwnerName}
                onChange={(e) => setNewMarketOwnerName(e.target.value)}
                placeholder="Nombre del Dueño"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="text"
                value={newMarketOwnerLastName}
                onChange={(e) => setNewMarketOwnerLastName(e.target.value)}
                placeholder="Apellido del Dueño"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="text"
                value={newMarketOwnerDNI}
                onChange={(e) => setNewMarketOwnerDNI(e.target.value)}
                placeholder="DNI del Dueño"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="tel"
                value={newMarketOwnerPhone}
                onChange={(e) => setNewMarketOwnerPhone(e.target.value)}
                placeholder="Teléfono del Dueño"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="email"
                value={newMarketOwnerEmail}
                onChange={(e) => setNewMarketOwnerEmail(e.target.value)}
                placeholder="Correo del Dueño"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="text"
                value={newMarketAddress}
                onChange={(e) => setNewMarketAddress(e.target.value)}
                placeholder="Dirección del Mercado"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <input
                type="url"
                value={newMarketMapLocation}
                onChange={(e) => setNewMarketMapLocation(e.target.value)}
                placeholder="Ubicación de Maps (URL)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <button
                onClick={handleAddMarket}
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Agregar Mercado
              </button>
              <button
                onClick={() => setCurrentView('main')}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Volver
              </button>
            </div>
          </div>
        )}

        {currentView === 'addUser' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
              {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h3>
            <div className="space-y-3">
              <select
                value={editingUser?.marketId || selectedMarketForUser}
                onChange={(e) => 
                  editingUser 
                    ? setEditingUser({...editingUser, marketId: e.target.value})
                    : setSelectedMarketForUser(e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="">Seleccionar mercado</option>
                {markets.map(market => (
                  <option key={market.id} value={market.id}>{market.name}</option>
                ))}
              </select>
              <input
                type="text"
                value={editingUser?.username || newUsername}
                onChange={(e) => 
                  editingUser
                    ? setEditingUser({...editingUser, username: e.target.value})
                    : setNewUsername(e.target.value)
                }
                placeholder="Nombre de usuario"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                disabled={!!editingUser}
              />
              <input
                type="password"
                value={editingUser?.password || newPassword}
                onChange={(e) => 
                  editingUser
                    ? setEditingUser({...editingUser, password: e.target.value})
                    : setNewPassword(e.target.value)
                }
                placeholder="Contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
              <select
                value={editingUser?.role || newUserRole}
                onChange={(e) => 
                  editingUser
                    ? setEditingUser({...editingUser, role: e.target.value})
                    : setNewUserRole(e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                {Object.keys(roles).map(roleKey => (
                  <option key={roleKey} value={roleKey}>{roleKey.charAt(0).toUpperCase() + roleKey.slice(1)}</option>
                ))}
              </select>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCancelEdit();
                    setCurrentView('users'); // Volver a la vista de usuarios
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'users' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Mercados y Usuarios</h3> {/* Renombrado */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentView('main')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Volver al Menú Principal
              </button>
              <button
                onClick={() => {
                  setNewMarketName('');
                  setNewMarketOwnerName('');
                  setNewMarketOwnerLastName('');
                  setNewMarketOwnerDNI('');
                  setNewMarketOwnerPhone('');
                  setNewMarketOwnerEmail('');
                  setNewMarketAddress('');
                  setNewMarketMapLocation('');
                  setMessage({ type: '', text: '' });
                  setCurrentView('addMarket');
                }}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Agregar Mercado
              </button>
            </div>
            <div className="overflow-x-auto">
              {markets.map(market => {
                const marketUsers = users.filter(u => u.marketId === market.id && u.role !== 'admin');
                // No ocultar el mercado si no tiene usuarios, para poder agregar
                // if (marketUsers.length === 0) return null; 

                // Obtener el estado de pago del mercado para los usuarios
                const marketSubscriptionStatus = getRemainingTime(market.subscriptionEndDate);

                return (
                  <div key={market.id} className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Mercado: {market.name} 
                        <span className={`ml-2 text-sm ${marketSubscriptionStatus.color}`}>
                          ({marketSubscriptionStatus.text})
                        </span>
                      </h4>
                      <button
                        onClick={() => {
                          setEditingUser(null);
                          resetUserForm();
                          setSelectedMarketForUser(market.id); // Preseleccionar el mercado
                          setCurrentView('addUser');
                        }}
                        className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        + Agregar Usuario
                      </button>
                    </div>
                    {marketUsers.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-600">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Última Actividad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {marketUsers.map(user => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{user.role}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  (Date.now() - user.lastActive) < (1000 * 60 * 60) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {(Date.now() - user.lastActive) < (1000 * 60 * 60) ? 'Online' : 'Offline'}
                                </span>
                                {marketSubscriptionStatus.text === 'Bloqueado' && ( // Bloqueo por mercado
                                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Bloqueado
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{getTimeDifference(user.lastActive)} sin conexión</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleEditUser(user)}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-300">No hay usuarios en este mercado.</p>
                    )}
                  </div>
                );
              })}
              {markets.length === 0 && (
                <p className="text-gray-500 dark:text-gray-300">No hay mercados registrados.</p>
              )}
            </div>
          </div>
        )}

        {currentView === 'payments' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Gestión de Pagos de Mercados</h3>
            <button
              onClick={() => setCurrentView('main')}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Volver al Menú Principal
            </button>

            {/* Calendario Dinámico */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                  &lt;
                </button>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {monthNames[currentMonth]} {currentYear}
                </h4>
                <button onClick={goToNextMonth} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                  &gt;
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                <div className="text-center">Dom</div>
                <div className="text-center">Lun</div>
                <div className="text-center">Mar</div>
                <div className="text-center">Mié</div>
                <div className="text-center">Jue</div>
                <div className="text-center">Vie</div>
                <div className="text-center">Sáb</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="inline-block w-4 h-4 bg-green-100 border-2 border-green-500 rounded-sm mr-2"></span>Días de pago (1 al 5)</p>
                <p><span className="inline-block w-4 h-4 bg-red-100 border-2 border-red-500 rounded-sm mr-2"></span>Días de bloqueo de suscripción</p>
                <p><span className="inline-block w-4 h-4 bg-blue-200 rounded-sm mr-2"></span>Día actual</p>
              </div>
            </div>

            {/* Tabla de Mercados */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Mercado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Días Restantes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Horas Restantes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Acciones de Recordatorio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Acciones de Suscripción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {markets.map(market => {
                    const remaining = getRemainingTime(market.subscriptionEndDate);
                    const isBlocked = remaining.text === 'Bloqueado';
                    const hasRecargo = isBlocked; // Simplificado: hay recargo si está bloqueado

                    return (
                      <tr key={market.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{market.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${remaining.color}`}>
                            {remaining.days}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${remaining.color}`}>
                            {remaining.hours}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => sendReminder(market, 'email', 7)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              Email (7 días)
                            </button>
                            <button
                              onClick={() => sendReminder(market, 'whatsapp', 7)}
                              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                            >
                              WhatsApp (7 días)
                            </button>
                            <button
                              onClick={() => sendReminder(market, 'email', 1)}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              Email (24 hs)
                            </button>
                            <button
                              onClick={() => sendReminder(market, 'whatsapp', 1)}
                              className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                            >
                              WhatsApp (24 hs)
                            </button>
                            {isBlocked && (
                              <>
                                <button
                                  onClick={() => sendReminder(market, 'email', null)} // General, con recargo
                                  className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                                >
                                  Email (Recargo)
                                </button>
                                <button
                                  onClick={() => sendReminder(market, 'whatsapp', null)} // General, con recargo
                                  className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                                >
                                  WhatsApp (Recargo)
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleMarketAction(market.id, 'extendDays', 30)}
                              className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
                            >
                              Sumar 30 Días
                            </button>
                            {isBlocked ? (
                              <button
                                onClick={() => handleMarketAction(market.id, 'unblockAccess')}
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                              >
                                Desbloquear
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarketAction(market.id, 'blockAccess')}
                                className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                              >
                                Bloquear
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Gestión de Planes de Suscripción */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Gestión de Planes de Suscripción</h4>
              {/* Formulario para agregar nuevo plan */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-4">
                <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Agregar Nuevo Plan</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    placeholder="Nombre del Plan (ej. Básico)"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  <input
                    type="number"
                    value={newPlanPrice}
                    onChange={(e) => setNewPlanPrice(e.target.value)}
                    placeholder="Precio (ej. 50.00)"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newPlanFeatures}
                    onChange={(e) => setNewPlanFeatures(e.target.value)}
                    placeholder="Características (separadas por coma, ej. Ventas, Reportes)"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  <input
                    type="number"
                    value={newPlanMaxUsers}
                    onChange={(e) => setNewPlanMaxUsers(e.target.value)}
                    placeholder="Máx. Usuarios (ej. 5)"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleAddSubscriptionPlan}
                  className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Agregar Plan
                </button>
              </div>

              {/* Listado de planes existentes */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Características</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Máx. Usuarios</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {subscriptionPlans.map(plan => (
                      <tr key={plan.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{plan.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">${plan.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{plan.features.join(', ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{plan.maxUsers}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteSubscriptionPlan(plan.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Historial de Transacciones */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Historial de Transacciones</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar transacción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Mercado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Dueño</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">No. Operación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredTransactions.map(transaction => {
                      const market = markets.find(m => m.id === transaction.marketId);
                      return (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {market ? market.name : 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {market ? `${market.ownerName} ${market.ownerLastName}` : 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {transaction.operationNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              ${transaction.amount.toFixed(2)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                          No se encontraron transacciones.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentView === 'permissions' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Permisos y Roles Avanzados</h3>
            <button
              onClick={() => setCurrentView('main')}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Volver al Menú Principal
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna de Selección de Usuario */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Seleccionar Usuario</h4>
                <select
                  onChange={(e) => {
                    const user = users.find(u => u.id === parseInt(e.target.value));
                    setSelectedUserForPermissions(user);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={selectedUserForPermissions ? selectedUserForPermissions.id : ''} // Controlar el valor del select
                >
                  <option value="">Selecciona un usuario</option>
                  {users.filter(u => u.role !== 'admin').map(user => ( // Excluir admin para permisos
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.role}) - {markets.find(m => m.id === user.marketId)?.name || 'Sin Mercado'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Columna de Permisos del Usuario Seleccionado */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Permisos de: {selectedUserForPermissions ? selectedUserForPermissions.username : 'Ninguno'}
                </h4>
                {selectedUserForPermissions ? (
                  <div className="space-y-2">
                    {permissionSections.map(section => (
                      <div key={section} className="flex items-center justify-between">
                        <label htmlFor={`perm-${selectedUserForPermissions.id}-${section}`} className="text-gray-700 dark:text-gray-300 capitalize">
                          {section}
                        </label>
                        <input
                          type="checkbox"
                          id={`perm-${selectedUserForPermissions.id}-${section}`}
                          checked={selectedUserForPermissions.permissions[section] || false}
                          onChange={() => handleTogglePermission(selectedUserForPermissions.id, section)}
                          className="h-5 w-5 text-black rounded border-gray-300 focus:ring-black dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Selecciona un usuario para gestionar sus permisos.</p>
                )}
              </div>
            </div>

            {/* Sección para Agregar/Editar Acciones (Permisos) */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Gestionar Secciones de Permisos</h4>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newPermissionSectionName}
                  onChange={(e) => setNewPermissionSectionName(e.target.value)}
                  placeholder="Nueva sección de permiso (ej. 'Inventario')"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                <button
                  onClick={handleAddPermissionSection}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {permissionSections.map(section => (
                  <span key={section} className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {section}
                    <button
                      onClick={() => handleRemovePermissionSection(section)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700 max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">Configuración General</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subir Logo</label>
                <input
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logoUrl')}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {settings.logoUrl && <img src={settings.logoUrl} alt="Logo Preview" className="mt-2 h-20 w-auto object-contain" />}
              </div>
              <div>
                <label htmlFor="backgroundUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subir Imagen de Fondo</label>
                <input
                  type="file"
                  id="backgroundUpload"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'backgroundUrl')}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
                {settings.backgroundUrl && <img src={settings.backgroundUrl} alt="Background Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />}
              </div>
              <div>
                <label htmlFor="commerceName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Comercio</label>
                <input
                  type="text"
                  id="commerceName"
                  value={settings.commerceName || ''}
                  onChange={(e) => handleSettingsChange('commerceName', e.target.value)}
                  placeholder="Nombre del comercio"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>

              {/* Horarios de Apertura */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Horarios de Apertura</h4>
                
                {/* Días de semana (Lunes a Viernes) */}
                <div className="mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h5 className="font-medium text-gray-800 dark:text-white mb-2">Lunes a Viernes</h5>
                  {weekDays.map(day => (
                    <div key={day} className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 w-20">{dayNames[day]}:</span>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {(settings.openingHours[day] || []).map((slot, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => handleOpeningHoursChange(day, index, 'start', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white w-24"
                            />
                            <span>-</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => handleOpeningHoursChange(day, index, 'end', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white w-24"
                            />
                            <button
                              onClick={() => removeTimeSlot(day, index)}
                              className="px-2 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addTimeSlot(day)}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fin de semana (Sábado y Domingo) */}
                <div className="mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h5 className="font-medium text-gray-800 dark:text-white mb-2">Sábado y Domingo</h5>
                  {weekendDays.map(day => (
                    <div key={day} className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 w-20">{dayNames[day]}:</span>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {(settings.openingHours[day] || []).map((slot, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => handleOpeningHoursChange(day, index, 'start', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white w-24"
                            />
                            <span>-</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => handleOpeningHoursChange(day, index, 'end', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition dark:bg-gray-600 dark:border-gray-500 dark:text-white w-24"
                            />
                            <button
                              onClick={() => removeTimeSlot(day, index)}
                              className="px-2 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addTimeSlot(day)}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentView('main')}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
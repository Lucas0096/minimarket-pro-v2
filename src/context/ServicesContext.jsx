import { createContext, useState } from 'react';

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [activeServices, setActiveServices] = useState([]);

  const toggleService = (serviceId) => {
    setActiveServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  return (
    <ServicesContext.Provider value={{ activeServices, toggleService }}>
      {children}
    </ServicesContext.Provider>
  );
};
import { useState } from 'react';

export const useServices = (initialServices) => {
  const [services, setServices] = useState(initialServices);

  const toggleService = (serviceId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, isActive: !service.isActive } 
          : service
      )
    );
  };

  return { services, toggleService };
};
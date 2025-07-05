import React from 'react';
import PropTypes from 'prop-types';

const MicroServiceCard = ({ title, description, icon, isActive, onClick }) => {
  const baseClasses = "relative overflow-hidden rounded-xl border p-6 transition-all duration-200 cursor-pointer";
  const activeClasses = "border-black bg-black text-white";
  const inactiveClasses = "border-gray-200 bg-white hover:border-gray-300";

  return (
    <div 
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-lg p-2 ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

MicroServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default MicroServiceCard;
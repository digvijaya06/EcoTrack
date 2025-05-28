import React from 'react';
import { ArrowRight, Droplet, Zap, Trash2, Car } from 'lucide-react';


const ActionCard = ({ action, onViewDetails }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'ENERGY':
        return <Zap className="h-5 w-5 text-orange-500" />;
      case 'WATER':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'TRANSPORTATION':
        return <Car className="h-5 w-5 text-green-600" />;
      case 'WASTE':
        return <Trash2 className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ENERGY':
        return 'bg-orange-50 text-orange-700';
      case 'WATER':
        return 'bg-blue-50 text-blue-700';
      case 'TRANSPORTATION':
        return 'bg-green-50 text-green-700';
      case 'WASTE':
        return 'bg-yellow-50 text-yellow-700';
      case 'FOOD':
        return 'bg-lime-50 text-lime-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:translate-y-[-4px] transition-transform duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(action.category)}`}>
                {getCategoryIcon(action.category)}
                <span className="ml-1 capitalize">{action.category}</span>
              </span>
              <span className="text-sm text-gray-500">{formatDate(action.date)}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{action.type}</h3>
            <p className="mt-1 text-gray-600 line-clamp-2">{action.description}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {action.impact.co2Saved > 0 && (
            <div className="bg-lime-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600">CO2 Saved</p>
              <p className="font-semibold text-lime-700">{action.impact.co2Saved} kg</p>
            </div>
          )}

          {action.impact.waterSaved > 0 && (
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600">Water Saved</p>
              <p className="font-semibold text-blue-700">{action.impact.waterSaved} L</p>
            </div>
          )}

          {action.impact.energySaved > 0 && (
            <div className="bg-orange-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600">Energy Saved</p>
              <p className="font-semibold text-orange-700">{action.impact.energySaved} kWh</p>
            </div>
          )}

          {action.impact.wasteDiverted > 0 && (
            <div className="bg-yellow-50 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600">Waste Diverted</p>
              <p className="font-semibold text-yellow-700">{action.impact.wasteDiverted} kg</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end">
        <button
          onClick={() => onViewDetails(action.id)}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          View Details <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ActionCard;

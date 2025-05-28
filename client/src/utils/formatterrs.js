export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatCO2 = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} t`;
  }
  return `${value.toFixed(2)} kg`;
};

export const formatWater = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} m³`;
  }
  return `${value.toFixed(2)} L`;
};

export const formatEnergy = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} MWh`;
  }
  return `${value.toFixed(2)} kWh`;
};

export const formatWaste = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} t`;
  }
  return `${value.toFixed(2)} kg`;
};
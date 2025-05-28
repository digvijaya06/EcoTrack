// Using Vite's env variables
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ACTION_CATEGORIES = [
  { id: 'energy', name: 'Energy', icon: 'Zap', color: 'text-yellow-500' },
  { id: 'water', name: 'Water', icon: 'Droplets', color: 'text-blue-500' },
  { id: 'waste', name: 'Waste', icon: 'Trash2', color: 'text-purple-500' },
  { id: 'transport', name: 'Transport', icon: 'Car', color: 'text-teal-500' },
  { id: 'food', name: 'Food', icon: 'Apple', color: 'text-red-500' },
  { id: 'other', name: 'Other', icon: 'Leaf', color: 'text-green-500' }
];

export const LEVEL_THRESHOLDS = [
  { level: 1, points: 0, title: 'Eco Beginner' },
  { level: 2, points: 100, title: 'Green Enthusiast' },
  { level: 3, points: 300, title: 'Eco Warrior' },
  { level: 4, points: 700, title: 'Sustainability Hero' },
  { level: 5, points: 1500, title: 'Planet Guardian' },
  { level: 6, points: 3000, title: 'Earth Champion' },
  { level: 7, points: 6000, title: 'Climate Leader' },
  { level: 8, points: 10000, title: 'Environmental Master' }
];

export const BADGES = [
  { id: 'first-action', name: 'First Step', description: 'Log your first eco action', icon: 'Award' },
  { id: 'energy-saver', name: 'Energy Saver', description: 'Log 10 energy-saving actions', icon: 'Lightbulb' },
  { id: 'water-guardian', name: 'Water Guardian', description: 'Log 10 water-saving actions', icon: 'Droplet' },
  { id: 'waste-reducer', name: 'Waste Reducer', description: 'Log 10 waste reduction actions', icon: 'Recycle' },
  { id: 'green-traveler', name: 'Green Traveler', description: 'Log 10 eco-friendly transport actions', icon: 'Bike' },
  { id: 'consistent-logger', name: 'Consistency Champion', description: 'Log actions for 7 days in a row', icon: 'Calendar' }
];

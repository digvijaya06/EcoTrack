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

export const ECO_ACTION_DETAILS = [
  {
    category: "Tree & Nature Care",
    title: "Tree & Nature Care",
    actionType: "Plant a sapling / Adopt a tree",
    impactMetric: "Trees Planted",
    gamification: "\"Green Thumb\" badge",
    inspiration: "Inspired by the Big Tree Movement"
  },
  {
    category: "Water Conservation",
    title: "Water Conservation",
    actionType: "Use buckets, fix leaks, rainwater harvesting",
    impactMetric: "Litres Saved",
    gamification: "\"Water Warrior\" badge",
    inspiration: "Inspired by local river conservation efforts"
  },
  {
    category: "Plastic-Free Lifestyle",
    title: "Plastic-Free Lifestyle",
    actionType: "Say no to plastic bags / Use steel bottles",
    impactMetric: "Plastic Items Avoided",
    gamification: "\"Plastic Buster\" badge",
    inspiration: "Live a Plastic-Free Lifestyle"
  },
  {
    category: "Eco-Friendly Fashion",
    title: "Eco-Friendly Fashion",
    actionType: "Donate clothes / Upcycle old clothes",
    impactMetric: "Items Reused",
    gamification: "\"Style with Purpose\" badge",
    inspiration: "Inspired by the Legacy of Clothing"
  },
  {
    category: "E-Waste Recycling",
    title: "E-Waste Recycling",
    actionType: "Submit old phones/laptops at authorized centers",
    impactMetric: "KG Recycled",
    gamification: "\"Tech Recycler\" badge",
    inspiration: "Modern Sustainability through E-Waste Recycling"
  },
  {
    category: "Waste Management",
    title: "Waste Management",
    actionType: "Composting / Proper garbage sorting",
    impactMetric: "KG Waste Diverted from Landfills",
    gamification: "\"Compost Champ\" badge",
    inspiration: "Promoting Responsible Waste Habits"
  },
  {
    category: "Eco Transport",
    title: "Eco Transport",
    actionType: "Public transport / Carpool / Cycling",
    impactMetric: "CO₂ Saved (kg)",
    gamification: "\"Green Commuter\" badge",
    inspiration: "Choose Greener Ways to Travel"
  },
  {
    category: "Awareness Actions",
    title: "Awareness Actions",
    actionType: "Attend clean-up events / Campaign posts",
    impactMetric: "Actions Logged",
    gamification: "\"Eco Advocate\" badge",
    inspiration: "Raise Your Voice for the Earth"
  },
  {
    category: "Wellness with Nature",
    title: "Wellness with Nature",
    actionType: "Yoga in nature / Tree hugging / mindful walks",
    impactMetric: "Self-Care Sessions",
    gamification: "\"Nature Soul\" badge",
    inspiration: "Meditate and Heal with Nature"
  },
  {
    category: "Natural Living",
    title: "Natural Living",
    actionType: "Herbal gardening / Ayurvedic habits / Earthenware use",
    impactMetric: "Days Sustained",
    gamification: "\"Sattvik Star\" badge",
    inspiration: "Let Nature Smile Through Your Lifestyle"
  }
];

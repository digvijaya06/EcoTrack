const express = require('express');
const router = express.Router();

// Dummy data for now — replace with real DB queries later
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user-id'; // from auth middleware if you use JWT

    // Simulated data
    const data = {
      recentActions: [
        {
          _id: '1',
          title: 'Used public transport',
          category: 'transport',
          points: 25,
          createdAt: new Date().toISOString(),
          notes: 'Took the bus to work instead of driving'
        },
        {
          _id: '2',
          title: 'Reduced water usage',
          category: 'water',
          points: 15,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '3',
          title: 'Used reusable bag',
          category: 'waste',
          points: 10,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ],
      actionsByCategory: [
        { category: 'energy', count: 12 },
        { category: 'water', count: 8 },
        { category: 'waste', count: 15 },
        { category: 'transport', count: 10 },
        { category: 'food', count: 5 }
      ],
      streak: 7,
      actionsCount: 50
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;

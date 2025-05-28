import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import {AuthContext} from '../context/AuthContext';
import { formatCO2, formatEnergy, formatWaste, formatWater} from '../utils/formatterrs';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);

        // Demo fallback data
        setDashboardData({
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
        });
      }
    };

    loadData();
  }, []);

  if (!user || !dashboardData) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <p className="text-lg text-secondary fw-semibold">Loading your eco dashboard...</p>
        <div className="spinner-border mt-4" style={{width: '4rem', height: '4rem'}} role="status"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className="p-3 p-md-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-0">
        <div>
          <h1 className="h3 fw-bold text-dark">Welcome, {user.name} 👋</h1>
          <p className="text-secondary small">Here’s your environmental impact summary</p>
        </div>
        <span className="badge bg-success bg-opacity-25 text-success px-3 py-1 rounded-pill small fw-medium">
          🌿 Eco Level: {user.level}
        </span>
      </div>

      <motion.div variants={itemVariants}>
        <PointsOverview
          points={user.points}
          level={user.level}
          streak={dashboardData.streak}
          actionsCount={dashboardData.actionsCount}
        />
      </motion.div>

      <div className="row g-4">
        <motion.div variants={itemVariants} className="col-lg-8">
          <RecentActions actions={dashboardData.recentActions} />
        </motion.div>

        <motion.div variants={itemVariants} className="col-lg-4">
          <ActionsByCategory actionCounts={dashboardData.actionsByCategory} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

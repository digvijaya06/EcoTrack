import React, { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../../context/AuthContext';
import { getAdminDashboardData } from '../../api/dashboard';

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardData(token);
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching admin stats', error);
        setError('Failed to load admin dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchStats();
    }
  }, [user, token]);

  if (!user || !user.isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  if (loading) {
    return <div className="text-center py-20">Loading admin dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  const kpiData = [
    { name: 'Total Users', value: stats.totalUsers || 0 },
    { name: 'Total Actions Logged', value: stats.totalActions || 0 },
    { name: 'Goals Created', value: stats.totalGoals || 0 },
    { name: 'Goals Completed', value: stats.completedGoals || 0 },
    { name: 'Carbon Saved (kg)', value: stats.totalCo2Saved || 0 },
    { name: 'Energy Saved (KWh)', value: stats.totalEnergySaved || 0 },
    { name: 'Waste Reduced (kg)', value: stats.totalWasteReduced || 0 },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard KPIs</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={kpiData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} />
          <YAxis label={{ value: 'Count / Units', angle: -90, position: 'insideLeft', dy: 60 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#2e7d32" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getGlobalImpact, getPlatformUsage, getMostActiveUsers } from '../../api/analytics';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const [impact, setImpact] = useState({});
  const [usageData, setUsageData] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      const globalImpact = await getGlobalImpact();
      const platformUsage = await getPlatformUsage();
      const mostActiveUsers = await getMostActiveUsers();
      setImpact(globalImpact);
      setUsageData(platformUsage);
      setActiveUsers(mostActiveUsers);
    }
    fetchAnalytics();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Platform Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Global Impact</h2>
            <p>Carbon Saved: {impact.carbonSaved || 0} kg</p>
            <p>Water Saved: {impact.waterSaved || 0} liters</p>
            <p>Energy Saved: {impact.energySaved || 0} kWh</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Platform Usage (Monthly)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={usageData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#4ade80" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Most Active Users</h2>
            <BarChart width={300} height={200} data={activeUsers}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actions" fill="#4ade80" />
            </BarChart>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;

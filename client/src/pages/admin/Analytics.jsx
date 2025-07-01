import React, { useEffect, useState } from 'react';
import { getAuthHeader } from '../../api/api';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import ImpactTrendsChart from '../../components/admin/ImpactTrendsChart';
import TopUsersTable from '../../components/admin/TopUsersTable';
import CategoryEngagementHeatmap from '../../components/admin/CategoryEngagementHeatmap';
import FilterBar from '../../components/admin/FilterBar';

const Analytics = () => {
  const [impactTrends, setImpactTrends] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [filters, setFilters] = useState({
    timeRange: 'this_month',
    category: null,
    userType: 'all',
  });

  useEffect(() => {
    fetchImpactTrends(filters);
    fetchTopUsers(filters);
    fetchCategorySummary();
  }, [filters]);

  const fetchImpactTrends = async (filters) => {
    try {
      const params = {};
      if (filters.timeRange) params.timeRange = filters.timeRange;
      if (filters.category) params.category = filters.category;
      const res = await axios.get('/admin/analytics/impact', { params, headers: getAuthHeader() });
      console.log('Impact Trends Data:', res.data);
      setImpactTrends(res.data);
    } catch (error) {
      console.error('Failed to fetch impact trends:', error);
    }
  };

  const fetchTopUsers = async (filters) => {
    try {
      const params = {};
      if (filters.timeRange) params.timeRange = filters.timeRange;
      if (filters.userType) params.userType = filters.userType;
      const res = await axios.get('/admin/analytics/top-users', { params, headers: getAuthHeader() });
      console.log('Top Users Data:', res.data);
      setTopUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch top users:', error);
    }
  };

  const fetchCategorySummary = async () => {
    try {
      const res = await axios.get('/admin/analytics/category-summary', { headers: getAuthHeader() });
      console.log('Category Summary Data:', res.data);
      setCategorySummary(res.data);
    } catch (error) {
      console.error('Failed to fetch category summary:', error);
    }
  };

  const handleExport = () => {
    alert('Export functionality not implemented yet.');
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>

        <FilterBar filters={filters} setFilters={setFilters} />

        <section>
          <ImpactTrendsChart data={impactTrends} onExport={handleExport} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <TopUsersTable users={topUsers} />
          </div>
          <div>
            <CategoryEngagementHeatmap />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Analytics;

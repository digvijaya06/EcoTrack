import React, { useEffect, useState } from 'react';
import { getAuthHeader } from '../../api/api';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import ImpactTrendsChart from '../../components/admin/ImpactTrendsChart';
import TopUsersTable from '../../components/admin/TopUsersTable';
import CategoryEngagementHeatmap from '../../components/admin/CategoryEngagementHeatmap';
import FilterBar from '../../components/admin/FilterBar';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import GoalsCategoryPieChart from '../../components/admin/GoalsCategoryPieChart'; // New import

const Analytics = () => {
  const location = useLocation();
  const [impactTrends, setImpactTrends] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [filters, setFilters] = useState({
    timeRange: 'this_month',
    category: null,
    userType: 'all',
  });

  // Mock fallback data for impact trends
  const mockImpactTrends = [
    { year: 2024, month: 1, carbonSaved: 100, energySaved: 200, waterSaved: 300, wasteReduced: 50 },
    { year: 2024, month: 2, carbonSaved: 150, energySaved: 250, waterSaved: 350, wasteReduced: 60 },
    { year: 2024, month: 3, carbonSaved: 200, energySaved: 300, waterSaved: 400, wasteReduced: 70 },
  ];

  // Mock fallback data for top users
  const mockTopUsers = [
    { userId: '1', name: 'Alice', actionCount: 10, totalCarbonSaved: 500 },
    { userId: '2', name: 'Bob', actionCount: 8, totalCarbonSaved: 400 },
    { userId: '3', name: 'Charlie', actionCount: 6, totalCarbonSaved: 300 },
  ];

  useEffect(() => {
    fetchImpactTrends(filters);
    fetchTopUsers(filters);
    fetchCategorySummary();
  }, [filters]);

  const fetchImpactTrends = async (filters) => {
    try {
      const params = {};
      if (filters.timeRange) params.timeRange = filters.timeRange;
      if (filters.category) params.category = filters.category.toUpperCase();  // Normalize category to uppercase
      const res = await axios.get('/admin/analytics/impact', { params, headers: getAuthHeader() });
      console.log('Impact Trends Data:', res.data);
      if (res.data && res.data.length > 0) {
        setImpactTrends(res.data);
      } else {
        setImpactTrends(mockImpactTrends);
      }
    } catch (error) {
      console.error('Failed to fetch impact trends:', error);
      setImpactTrends(mockImpactTrends);
    }
  };

  const fetchTopUsers = async (filters) => {
    try {
      const params = {};
      if (filters.timeRange) params.timeRange = filters.timeRange;
      if (filters.userType) params.userType = filters.userType;
      const res = await axios.get('/admin/analytics/top-users', { params, headers: getAuthHeader() });
      console.log('Top Users Data:', res.data);
      if (res.data && res.data.length > 0) {
        setTopUsers(res.data);
      } else {
        setTopUsers(mockTopUsers);
      }
    } catch (error) {
      console.error('Failed to fetch top users:', error);
      setTopUsers(mockTopUsers);
    }
  };

  const fetchCategorySummary = async () => {
    try {
      const res = await axios.get('/admin/analytics/category-summary', { headers: getAuthHeader() });
      console.log('Category Summary Data:', res.data);
      // Defensive check to ensure data is an array
      if (Array.isArray(res.data)) {
        setCategorySummary(res.data);
      } else if (res.data && Array.isArray(res.data.categoryStats)) {
        setCategorySummary(res.data.categoryStats);
      } else {
        setCategorySummary([]);
      }
    } catch (error) {
      console.error('Failed to fetch category summary:', error);
      setCategorySummary([]);
    }
  };

  return (
    <AdminLayout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>

            <FilterBar filters={filters} setFilters={setFilters} />

            <section>
              <ImpactTrendsChart data={impactTrends} />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <TopUsersTable users={topUsers} />
              </div>
              <div>
                <CategoryEngagementHeatmap data={categorySummary} />
                <GoalsCategoryPieChart data={categorySummary} /> {/* New pie chart component */}
              </div>
            </section>
          </div>
        } />
        
      </Routes>
      {/* Removed Outlet to prevent duplicate rendering of nested routes */}
      {/* <Outlet /> */}
    </AdminLayout>
  );
};

export default Analytics;

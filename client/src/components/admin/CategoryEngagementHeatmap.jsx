import React, { useEffect, useState } from 'react';
import { getGoals } from '../../api/analytics';

const CategoryEngagementHeatmap = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryStats() {
      try {
        const data = await getGoals();
        console.log('Category Engagement Heatmap data:', data);
        setCategoryStats(data.categoryStats || []);
      } catch (error) {
        console.error('Failed to fetch category stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryStats();
  }, []);

  if (loading) {
    return <div>Loading Category Engagement Heatmap...</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Category Engagement Heatmap</h3>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300 text-left">Category</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Goals Created</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Goals Completed</th>
            <th className="py-2 px-4 border-b border-gray-300 text-right">Completion Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {categoryStats.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            categoryStats.map(({ category, total, completed, completionRate }) => (
              <tr key={category} className="text-right">
                <td className="text-left py-2 px-4 border-b border-gray-300">{category}</td>
                <td className="py-2 px-4 border-b border-gray-300">{total}</td>
                <td className="py-2 px-4 border-b border-gray-300">{completed}</td>
                <td className="py-2 px-4 border-b border-gray-300">{completionRate.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryEngagementHeatmap;

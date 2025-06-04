import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, Calendar } from 'lucide-react';

import ActionCard from '../components/actions/ActionCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

// import your backend API utility 
import axios from 'axios';

const Actions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [actionsData, setActionsData] = useState([]);
  
  // Fetch actions from backend on component mount
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get('/api/actions'); 
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setActionsData(response.data);
        } else if (response.data && Array.isArray(response.data.actions)) {
          setActionsData(response.data.actions);
        } else {
          console.warn('Unexpected API response format for actions:', response.data);
          setActionsData([]);
        }
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    fetchActions();
  }, []);

  // Filtering Logic
  const filteredActions = actionsData.filter(action => {
    const matchesSearch =
      action.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || action.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Log Actions</h1>
          <Button variant="primary" leftIcon={<Plus />}>
            Add Action
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="energy">Energy</option>
              <option value="transportation">Transportation</option>
              <option value="waste">Waste</option>
              <option value="water">Water</option>
             
             
            </select>
          </div>
          <div className="relative rounded-md shadow-sm flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))
          ) : (
            <p className="text-gray-500">No actions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;

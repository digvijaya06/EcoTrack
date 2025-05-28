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
    <div className="bg-light min-vh-100 pb-4">
      <div className="container pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold text-dark">Log Actions</h1>
          <Button variant="primary" leftIcon={<Plus />}>
            Add Action
          </Button>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
          <div className="d-flex align-items-center mb-3 mb-sm-0">
            <Filter className="me-2 text-secondary" size={16} />
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="energy">Energy</option>
              <option value="transportation">Transportation</option>
              <option value="waste">Waste</option>
              <option value="water">Water</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="position-relative flex-grow-1">
            <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pointer-events-none">
              <Search className="text-muted" size={16} />
            </div>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))
          ) : (
            <p className="text-secondary">No actions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;

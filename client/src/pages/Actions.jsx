import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Calendar,
  MapPin,
  Trash2,
  Edit,
  CheckCircle,
  Zap,
  Droplet,
  Car,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { fetchUserActions, addAction, deleteAction, updateAction } from '../api/userActions';

const Actions = () => {
  const { user } = useAuth();
  const { updatePoints } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddAction, setShowAddAction] = useState(false);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Actions', icon: CheckCircle, color: 'gray' },
    { id: 'recycling', name: 'Recycling', icon: CheckCircle, color: 'eco' },
    { id: 'energy', name: 'Energy', icon: CheckCircle, color: 'yellow' },
    { id: 'transportation', name: 'Transport', icon: CheckCircle, color: 'blue' },
    { id: 'water', name: 'Water', icon: CheckCircle, color: 'cyan' },
    { id: 'nature', name: 'Nature', icon: CheckCircle, color: 'green' },
    { id: 'home', name: 'Home', icon: CheckCircle, color: 'purple' }
  ];

  const types = [
    'Tree Plantation',
    'Bicycle Commute',
    'Carpool',
    'Energy Saving',
    'Water Conservation',
    'Recycling'
  ];

  const [newAction, setNewAction] = useState({
    title: '',
    category: 'recycling',
    type: types[0],
    notes: '',
    energySaved: 0,
    wasteReduced: 0
  });

  useEffect(() => {
    const loadActions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchUserActions();
        setActions(data);
      } catch (error) {
        console.error('Failed to fetch user actions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadActions();
  }, [user]);

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddAction = async (e) => {
    e.preventDefault();
    // Prepare payload as per backend expectations
    const actionToAdd = {
      title: newAction.title,
      content: newAction.notes,
      tags: newAction.category ? [newAction.category.toLowerCase()] : [],
      energySaved: newAction.energySaved,
      wasteReduced: newAction.wasteReduced
    };
    console.log('handleAddAction called with newAction:', actionToAdd);
    try {
      const addedAction = await addAction(actionToAdd);
      console.log('Action added:', addedAction);
      setActions([addedAction, ...actions]);
      try {
        updatePoints(addedAction.points || 0);
      } catch (err) {
        console.error('Error updating points:', err);
      }
      setNewAction({
        title: '',
        category: 'recycling',
        type: types[0],
        notes: '',
        energySaved: 0,
        wasteReduced: 0
      });
      alert('Action added successfully!');
      setTimeout(() => setShowAddAction(false), 100);
    } catch (error) {
      console.error('Failed to add action:', error);
      const message = error.response?.data?.message || 'Failed to add action.';
      alert(message);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      await deleteAction(id);
      setActions(actions.filter(action => action.id !== id));
    } catch (error) {
      console.error('Failed to delete action:', error);
    }
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading actions...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view and add your actions.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Environmental Actions</h1>
            <p className="text-gray-600">Track and manage your eco-friendly activities</p>
          </div>
          <button
            onClick={() => setShowAddAction(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green
            -800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Action
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? 'inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-' + category.color + '-100 text-' + category.color + '-700 border-2 border-' + category.color + '-300'
                      : 'inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions Grid */}
        <div className="grid gap-6">
          {filteredActions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No actions found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            filteredActions.map((action, index) => {
              const color = getCategoryColor(action.category);
              return (
                <motion.div
                  key={action._id || action.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                  <div className={'w-12 h-12 bg-' + color + '-100 rounded-lg flex items-center justify-center flex-shrink-0'}>
                    {(() => {
                      switch (action.category) {
                        case 'energy':
                          return <Zap className={'w-6 h-6 text-' + color + '-600'} />;
                        case 'water':
                          return <Droplet className={'w-6 h-6 text-' + color + '-600'} />;
                        case 'transportation':
                          return <Car className={'w-6 h-6 text-' + color + '-600'} />;
                        case 'recycling':
                          return <Trash2 className={'w-6 h-6 text-' + color + '-600'} />;
                        default:
                          return <CheckCircle className={'w-6 h-6 text-' + color + '-600'} />;
                      }
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-1">
                        <span>{action.title}</span>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
<span>{new Date(action.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{action.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-eco-600">+{action.points}</div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAction(action.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Add Action Modal */}
        {showAddAction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Action</h2>
                <button
                  onClick={() => setShowAddAction(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddAction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newAction.title}
                    onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                    placeholder="e.g., Recycled plastic bottles"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newAction.category}
                    onChange={(e) => setNewAction({ ...newAction, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newAction.notes}
                    onChange={(e) => setNewAction({ ...newAction, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                    rows="3"
                    placeholder="Additional details about your action..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newAction.type}
                    onChange={(e) => setNewAction({ ...newAction, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                  >
                    {types.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Removed Energy Saved and Waste Reduced input fields as these are calculated automatically in backend */}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                  >
                    Add Action
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAction(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actions;

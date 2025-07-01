import React from 'react';
import Select from 'react-select';

const timeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_30_days', label: 'Last 30 Days' },
];

const categoryOptions = [
  { value: 'carbon', label: 'Carbon' },
  { value: 'water', label: 'Water' },
  { value: 'waste', label: 'Waste' },
  { value: 'energy', label: 'Energy' },
];

const userTypeOptions = [
  { value: 'all', label: 'All Users' },
  { value: 'top', label: 'Top Users' },
];

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (selectedOption, action) => {
    setFilters(prev => ({
      ...prev,
      [action.name]: selectedOption ? selectedOption.value : null,
    }));
  };

  return (
    <div className="flex space-x-4 mb-6">
      <div className="w-1/3">
        <label className="block mb-1 font-semibold">Time Range</label>
        <Select
          name="timeRange"
          options={timeOptions}
          value={timeOptions.find(opt => opt.value === filters.timeRange)}
          onChange={handleChange}
          isClearable
        />
      </div>
      <div className="w-1/3">
        <label className="block mb-1 font-semibold">Category</label>
        <Select
          name="category"
          options={categoryOptions}
          value={categoryOptions.find(opt => opt.value === filters.category)}
          onChange={handleChange}
          isClearable
        />
      </div>
      <div className="w-1/3">
        <label className="block mb-1 font-semibold">User Type</label>
        <Select
          name="userType"
          options={userTypeOptions}
          value={userTypeOptions.find(opt => opt.value === filters.userType)}
          onChange={handleChange}
          isClearable
        />
      </div>
    </div>
  );
};

export default FilterBar;

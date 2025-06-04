import React, { useState } from 'react';
import Button from '../ui/Button';
import { ECO_ACTION_DETAILS } from '../../config/constants';

const ActionForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [form, setForm] = useState({
    title: '',
    type: initialData.type || '',
    category: initialData.category || '',
    notes: initialData.notes || '',
    points: initialData.points || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const selected = ECO_ACTION_DETAILS.find(cat => cat.category === value);
      setForm(prev => ({
        ...prev,
        category: value,
        points: selected?.defaultPoints || 10,
        type: selected?.actionType || '',
      }));
    } else if (name === 'points') {
      return;
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const selectedCategoryDetails = ECO_ACTION_DETAILS.find(cat => cat.category === form.category);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (!form.title || !form.category || !form.type) return alert('Please fill required fields');
      onSubmit(form);
    }} className="space-y-4">

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">-- Select Category --</option>
          {ECO_ACTION_DETAILS.map(cat => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />
      </div>

      
      {selectedCategoryDetails && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Action Type</label>
          <input
            type="text"
            name="type"
            value={selectedCategoryDetails.actionType}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />

          
          <div className="mt-2 p-2 bg-green-50 rounded border border-green-200 text-sm text-green-800">
            <p><strong>Impact Metric:</strong> {selectedCategoryDetails.impactMetric}</p>
            <p><strong>Gamification:</strong> {selectedCategoryDetails.gamification}</p>
            <p><strong>Inspiration:</strong> {selectedCategoryDetails.inspiration}</p>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Points */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Points</label>
        <input
          type="number"
          name="points"
          value={form.points}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          readOnly
        />
      </div>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Logging...' : 'Submit Action'}
      </Button>
    </form>
  );
};

export default ActionForm;

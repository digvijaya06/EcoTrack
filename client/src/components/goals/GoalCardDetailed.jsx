import React, { useState } from 'react';
import { Edit, Trash2, Leaf, Zap, Droplets, Recycle, Truck } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const categoryIcons = {
  carbon: Leaf,
  energy: Zap,
  water: Droplets,
  waste: Recycle,
  transportation: Truck,
  food: Leaf, // fallback icon
};

const priorityColors = {
  low: 'bg-green-200 text-green-800',
  medium: 'bg-yellow-200 text-yellow-800',
  high: 'bg-red-200 text-red-800',
};

const GoalCardDetailed = ({ goal, updateProgress, onEdit, onDelete }) => {
  const [progressInput, setProgressInput] = useState(goal.currentValue || 0);
  const Icon = categoryIcons[goal.category] || Leaf;

  const safeTargetValue = goal.targetValue > 0 ? goal.targetValue : 100;
  const progressPercent = Math.min(
    100,
    Math.round((progressInput / safeTargetValue) * 100)
  );

  const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && goal.status !== 'completed';

  const handleProgressChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setProgressInput('');
      return;
    }
    value = Math.max(0, Math.min(Number(value), safeTargetValue));
    setProgressInput(value);
    updateProgress(goal._id, value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded">
            <Icon className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <span>{goal.title}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[goal.priority]}`}>
                {goal.priority}
              </span>
            </h3>
            {goal.description && (
              <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              {goal.deadline && (
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              )}
              {isOverdue && (
                <span className="text-red-600 font-semibold">Overdue</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => onEdit(goal)} aria-label="Edit Goal" className="text-gray-500 hover:text-gray-700">
            <Edit size={20} />
          </button>
          <button onClick={() => onDelete(goal)} aria-label="Delete Goal" className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div style={{ width: 80, height: 80 }}>
          <CircularProgressbar
            value={progressPercent}
            text={`${progressPercent}%`}
            styles={buildStyles({
              pathColor: '#f59e0b',
              textColor: '#111827',
              trailColor: '#d1d5db',
            })}
          />
        </div>
        <div>
          <div className="text-xl font-bold mb-2">
            {progressInput}/{safeTargetValue} {goal.unit}
          </div>
          <input
            type="number"
            min={0}
            max={safeTargetValue}
            value={progressInput}
            onChange={handleProgressChange}
            className="border rounded p-1 w-24"
            aria-label="Update progress"
          />
        </div>
      </div>

      {goal.milestones && goal.milestones.length > 0 && (
        <div className="flex space-x-4">
          {goal.milestones.map((ms, idx) => (
            <div
              key={idx}
              className={`flex-1 p-3 rounded border ${
                ms.completed ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div className="font-semibold">{ms.value} {goal.unit}</div>
              <div className="text-xs text-gray-600">{ms.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalCardDetailed;


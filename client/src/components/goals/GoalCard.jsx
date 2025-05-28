import React from 'react';
import { Target, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { formatDate } from '../../utils/formatters';

const GoalCard = ({ goal, onClick }) => {
  const progressPercentage = Math.min(
    Math.round((goal.currentValue / goal.targetValue) * 100),
    100
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ENERGY':
        return 'bg-accent-50 text-accent-700 border-accent-200';
      case 'WATER':
        return 'bg-secondary-50 text-secondary-700 border-secondary-200';
      case 'TRANSPORTATION':
        return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'WASTE':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      case 'FOOD':
        return 'bg-success-50 text-success-700 border-success-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-success-500';
    if (percentage >= 70) return 'bg-primary-500';
    if (percentage >= 30) return 'bg-accent-500';
    return 'bg-warning-500';
  };

  return (
    <Card 
      className="h-full hover:shadow-md transition-shadow duration-300"
      interactive={!!onClick}
      onClick={() => onClick && onClick(goal.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span 
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(goal.category)}`}
          >
            <Target size={14} className="mr-1" />
            <span className="capitalize">{goal.category.toLowerCase()}</span>
          </span>

          {goal.completed ? (
            <span className="inline-flex items-center text-success-600 text-sm">
              <CheckCircle size={16} className="mr-1" />
              Completed
            </span>
          ) : goal.deadline ? (
            <span className="inline-flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-1" />
              Due {formatDate(goal.deadline)}
            </span>
          ) : null}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>

        {goal.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{goal.description}</p>
        )}

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getProgressColor(progressPercentage)}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{goal.currentValue} {goal.unit}</span>
            <span>Target: {goal.targetValue} {goal.unit}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
        Created on {formatDate(goal.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default GoalCard;

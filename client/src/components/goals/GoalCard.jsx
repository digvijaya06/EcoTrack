import React, { useState } from "react";
import { Target, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { formatDate } from "../../utils/formatterrs";

const GoalCard = ({ goal, onClick, updateProgress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progressInput, setProgressInput] = useState(goal.currentValue || 0);

  // Parse targetValue as number with fallback to 0
  const targetValue = Number(goal.targetValue) || 0;

  const progressPercentage = Math.min(
    Math.round((goal.currentValue / targetValue) * 100),
    100
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case "ENERGY":
        return "bg-accent-50 text-accent-700 border-accent-200";
      case "WATER":
        return "bg-secondary-50 text-secondary-700 border-secondary-200";
      case "TRANSPORTATION":
        return "bg-primary-50 text-primary-700 border-primary-200";
      case "WASTE":
        return "bg-warning-50 text-warning-700 border-warning-200";
      case "FOOD":
        return "bg-success-50 text-success-700 border-success-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return "bg-success-500";
    if (percentage >= 70) return "bg-primary-500";
    if (percentage >= 30) return "bg-accent-500";
    return "bg-warning-500";
  };

  const openModal = (e) => {
    e.stopPropagation();
    setProgressInput(goal.currentValue || 0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProgressChange = (e) => {
    setProgressInput(e.target.value);
  };

  const handleSubmit = () => {
    const numericProgress = Number(progressInput);
    if (
      !isNaN(numericProgress) &&
      numericProgress >= 0 &&
      (targetValue === 0 || numericProgress <= targetValue)
    ) {
      updateProgress(goal._id, numericProgress);
      closeModal();
    } else {
      alert(
        targetValue === 0
          ? 'Please enter a valid non-negative number'
          : `Please enter a valid number between 0 and ${targetValue}`
      );
    }
  };

  // Calculate days remaining if deadline exists and goal not completed
  const calculateDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const daysRemaining = !goal.completed ? calculateDaysRemaining(goal.deadline) : null;

  return (
    <>
      <Card
        className="h-full hover:shadow-md transition-shadow duration-300"
        interactive={!!onClick}
        onClick={() => onClick && onClick(goal._id)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(
                goal.category
              )}`}
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
              <span className="inline-flex items-center text-gray-500 text-sm space-x-2">
                <Clock size={16} className="mr-1" />
                <span>Due {formatDate(goal.deadline)}</span>
                {daysRemaining !== null && (
                  <span>({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left)</span>
                )}
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
              <span>
                {goal.currentValue} {goal.unit}
              </span>
              <span>
                Target: {goal.targetValue} {goal.unit}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
          Created on {formatDate(goal.createdAt)}
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
          >
            Update Progress
          </button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Update Progress</h2>
            <input
              type="number"
              min="0"
              max={targetValue === 0 ? undefined : targetValue}
              value={progressInput}
              onChange={handleProgressChange}
              className="border px-3 py-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoalCard;

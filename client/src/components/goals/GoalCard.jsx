import React, { useState, useEffect, useContext } from "react";
import { Target, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { formatDate } from "../../utils/formatterrs";
import { AuthContext } from "../../context/AuthContext";

const GoalCard = ({ goal, onClick, updateProgress }) => {
  const { user } = useContext(AuthContext);
  const [progressHistory, setProgressHistory] = useState(goal.progressHistory || []);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    setProgressHistory(goal.progressHistory || []);
  }, [goal.progressHistory]);

  useEffect(() => {
    if (goal.startDate && goal.deadline) {
      const start = new Date(goal.startDate);
      const end = new Date(goal.deadline);
      const dates = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      setDateRange(dates);
    }
  }, [goal.startDate, goal.deadline]);

  const toggleCheckbox = (date) => {
    // Only allow logged-in non-admin members to toggle
    if (!user || user.isAdmin) return;

    const dateStr = date.toISOString().split("T")[0];
    const updatedHistory = [...progressHistory];
    const index = updatedHistory.findIndex((ph) => ph.date === dateStr);

    if (index >= 0) {
      updatedHistory[index].checked = !updatedHistory[index].checked;
    } else {
      updatedHistory.push({ date: dateStr, checked: true });
    }

    setProgressHistory(updatedHistory);

    const checkedCount = updatedHistory.filter((ph) => ph.checked).length;
    updateProgress(goal._id, checkedCount, updatedHistory);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "ENERGY": return "bg-accent-50 text-accent-700 border-accent-200";
      case "WATER": return "bg-secondary-50 text-secondary-700 border-secondary-200";
      case "TRANSPORTATION": return "bg-primary-50 text-primary-700 border-primary-200";
      case "WASTE": return "bg-warning-50 text-warning-700 border-warning-200";
      case "FOOD": return "bg-success-50 text-success-700 border-success-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const calculateDaysRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? days : 0;
  };

  const daysRemaining = !goal.completed ? calculateDaysRemaining(goal.deadline) : null;

  const handleCompletionToggle = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(goal._id);
    }
  };

  return (
    <Card
      className="h-full hover:shadow-md transition-shadow duration-300"
      interactive={!!onClick}
      onClick={() => onClick && onClick(goal._id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(goal.category)}`}>
            <Target size={14} className="mr-1" />
            <span className="capitalize">{goal.category.toLowerCase()}</span>
          </span>

          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={handleCompletionToggle}
              className="form-checkbox h-5 w-5 text-green-600"
              aria-label="Mark goal as completed"
            />
            <span className={goal.completed ? "text-success-600 text-sm" : "text-gray-500 text-sm"}>
              {goal.completed ? (
                <>
                  <CheckCircle size={16} className="inline mr-1" />
                  Completed
                </>
              ) : (
                "Mark as Completed"
              )}
            </span>
          </label>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>

        {goal.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{goal.description}</p>
        )}

        {/* Calendar Checkboxes */}
        <div className="mt-4 grid grid-cols-7 gap-1 max-w-full overflow-x-auto">
          {dateRange.map((date) => {
            const dateStr = date.toISOString().split("T")[0];
            const isChecked = progressHistory.find((ph) => ph.date === dateStr && ph.checked);
            return (
              <label
                key={dateStr}
                className="flex flex-col items-center text-xs cursor-pointer select-none"
                title={`Progress for ${dateStr}`}
              >
                <input
                  type="checkbox"
                  checked={!!isChecked}
                  disabled={!user || user.isAdmin}
                  onChange={() => toggleCheckbox(date)}
                  className="mb-1"
                  aria-label={`Progress for ${dateStr}`}
                  title={`Progress for ${dateStr}`}
                />
                <span>{date.getDate()}</span>
              </label>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
        Created on {formatDate(goal.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default GoalCard;

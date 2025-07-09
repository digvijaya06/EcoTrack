import React, { useState, useEffect, useContext } from "react";
import { Target, CheckCircle } from "lucide-react";
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
      case "ENERGY": return "bg-gradient-to-r from-green-300 to-green-500 text-white shadow-md";
      case "WATER": return "bg-gradient-to-r from-blue-300 to-blue-500 text-white shadow-md";
      case "TRANSPORTATION": return "bg-gradient-to-r from-purple-300 to-purple-500 text-white shadow-md";
      case "WASTE": return "bg-gradient-to-r from-yellow-300 to-yellow-500 text-white shadow-md";
      case "FOOD": return "bg-gradient-to-r from-pink-300 to-pink-500 text-white shadow-md";
      default: return "bg-gray-100 text-gray-800 border border-gray-300";
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
      className="h-full transform transition duration-500 hover:scale-105 hover:shadow-lg"
      interactive={!!onClick}
      onClick={() => onClick && onClick(goal._id)}
      style={{ animation: "fadeInScale 0.5s ease forwards" }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${getCategoryColor(goal.category)}`}>
            <Target size={14} className="mr-1" />
            <span className="capitalize">{goal.category.toLowerCase()}</span>
          </span>

          <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={handleCompletionToggle}
              className="form-checkbox h-5 w-5 text-green-600 transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Mark goal as completed"
            />
            <span className={goal.completed ? "text-green-600 text-sm font-semibold transition-colors duration-300" : "text-gray-500 text-sm"}>
              {goal.completed ? (
                <>
                  <CheckCircle size={16} className="inline mr-1 transition-transform duration-300" />
                  Completed
                </>
              ) : (
                "Mark as Completed"
              )}
            </span>
          </label>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>

        {goal.completed && (
          <p className="text-green-600 text-sm font-semibold mb-2">Completed</p>
        )}

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
                className="flex flex-col items-center text-xs cursor-pointer select-none transition-colors duration-300 hover:text-green-600"
                title={`Progress for ${dateStr}`}
              >
                <input
                  type="checkbox"
                  checked={!!isChecked}
                  disabled={!user || user.isAdmin}
                  onChange={() => toggleCheckbox(date)}
                  className="mb-1 cursor-pointer"
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

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Card>
  );
};

export default GoalCard;

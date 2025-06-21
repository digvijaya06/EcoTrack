const Action = require("../models/Action");
const User = require("../models/User");
const { calculateBadges } = require("../utils/badgeCalculator");

// Get all actions (user accessible)
exports.getActions = async (req, res) => {
  try {
    const actions = await Action.find({ user: req.user._id });
    res.json(actions);
  } catch (error) {
    console.error("Get Actions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get action by ID (user accessible)
exports.getActionById = async (req, res) => {
  try {
    const action = await Action.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!action) return res.status(404).json({ message: "Action not found" });
    res.json(action);
  } catch (error) {
    console.error("Get Action Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new action (user accessible)
exports.createAction = async (req, res) => {
  try {
    console.log("Create Action Request Body:", req.body);
    const { content, tags } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Infer category and type from tags (simple example)
    let category = "plantation";
    let type = "Tree Plantation";

    if (tags && Array.isArray(tags)) {
      if (tags.includes("bicycle")) {
        category = "transport";
        type = "Bicycle Commute";
      } else if (tags.includes("carpool")) {
        category = "transport";
        type = "Carpool";
      } else if (tags.includes("energy")) {
        category = "energy";
        type = "Energy Saving";
      } else if (tags.includes("water")) {
        category = "water";
        type = "Water Conservation";
      } else if (tags.includes("recycling")) {
        category = "recycling";
        type = "Recycling";
      }
    }

    // Points mapping based on action type
    const pointsMapping = {
      "Tree Plantation": 20,
      "Bicycle Commute": 10,
      Carpool: 15,
      "Energy Saving": 5,
      "Water Conservation": 5,
      Recycling: 10,
    };

    // CO2 saved mapping based on category (in kg)
    const co2SavedMapping = {
      plantation: 50,
      energy: 15,
      "plastic-free lifestyle": 10,
      "tree & nature care": 20,
      recycling: 10,
      nature: 20, // Mapped to same as 'tree & nature care'
    };

    // Normalize category for aggregation
    let normalizedCategory = category.toLowerCase();
    if (normalizedCategory === "nature") {
      normalizedCategory = "tree & nature care";
    }

    const points = pointsMapping[type] || 0;
    const co2Saved = co2SavedMapping[normalizedCategory] || 0;

    console.log(`Calculated co2Saved: ${co2Saved} for category: ${category}`);

    const newAction = new Action({
      user: userId,
      title: type,
      category,
      type,
      points,
      co2Saved,
      notes: content,
    });

    await newAction.save();

    // Update user points
    const user = await User.findById(userId);
    if (user) {
      user.points += points;

      // Calculate badges based on updated user data
      const badges = calculateBadges(user);

      // Update user's badges array with new badges (avoid duplicates)
      const badgeNames = badges.map((b) => b.name);
      user.badges = Array.from(new Set([...user.badges, ...badgeNames]));

      await user.save();
    }

    res.status(201).json(newAction);
  } catch (error) {
    console.error("Create Action Error:", error);
    res.status(500).json({ message: "Server error while creating action" });
  }
};

// Update action (user accessible)
exports.updateAction = async (req, res) => {
  try {
    const action = await Action.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!action) return res.status(404).json({ message: "Action not found" });
    res.json(action);
  } catch (error) {
    console.error("Update Action Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete action (user accessible)
exports.deleteAction = async (req, res) => {
  try {
    const action = await Action.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!action) return res.status(404).json({ message: "Action not found" });
    res.json({ message: "Action deleted" });
  } catch (error) {
    console.error("Delete Action Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get available types and categories for dropdowns
exports.getActionMeta = async (req, res) => {
  try {
    const types = [
      "Tree Plantation",
      "Bicycle Commute",
      "Carpool",
      "Energy Saving",
      "Water Conservation",
      "Recycling",
    ];

    const categories = [
      "plantation",
      "transport",
      "energy",
      "water",
      "waste",
      "food",
    ];

    res.json({ types, categories });
  } catch (error) {
    console.error("Get Meta Error:", error);
    res.status(500).json({ message: "Failed to fetch action metadata" });
  }
};

// GET /api/actions/stats/categories
// Returns count of actions grouped by category for pie chart
exports.getStatsByCategory = async (req, res) => {
  try {
    const stats = await Action.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    console.error("Get Stats By Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/actions/stats/weekly
// Returns count of actions grouped by week for bar chart
exports.getStatsWeekly = async (req, res) => {
  try {
    const stats = await Action.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
    ]);
    res.json(stats);
  } catch (error) {
    console.error("Get Stats Weekly Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// New controller method to get user achievements (badges)
exports.getUserAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return badges as array of badge names
    res.json({ badges: user.badges || [] });
  } catch (error) {
    console.error("Get User Achievements Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

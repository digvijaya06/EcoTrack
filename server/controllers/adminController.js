const Event = require('../models/Event'); 
const Reward = require('../models/Reward'); 

// --- Events ---
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Get Events Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Get Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Create Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Update Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- Rewards ---
exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    console.error('Get Rewards Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (error) {
    console.error('Get Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createReward = async (req, res) => {
  try {
    const newReward = new Reward(req.body);
    await newReward.save();
    res.status(201).json(newReward);
  } catch (error) {
    console.error('Create Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (error) {
    console.error('Update Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted' });
  } catch (error) {
    console.error('Delete Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

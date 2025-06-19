const Resource = require('../models/Resource');

// Public method to get all resources with pagination
exports.getResourcesPublic = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Resource.countDocuments();
    const resources = await Resource.find().skip(skip).limit(limit);

    res.json({
      data: resources,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error('Get Resources Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin method to create a resource
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error('Create Resource Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin method to update a resource
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Update Resource Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin method to delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Delete Resource Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

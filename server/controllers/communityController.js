const CommunityPost = require('../models/CommunityPost');

const getCommunityPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate('user', 'name avatar location');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching community posts' });
  }
};

const createCommunityPost = async (req, res) => {
  try {
    const newPost = new CommunityPost({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags || [],
    });
    const savedPost = await newPost.save();
    const populatedPost = await savedPost.populate('user', 'name avatar location');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating community post' });
  }
};

// Like a community post
const likeCommunityPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error liking community post' });
  }
};

module.exports = {
  getCommunityPosts,
  createCommunityPost,
  likeCommunityPost,
};

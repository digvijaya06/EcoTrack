const Blog = require('../models/Blog');
const nodemailer = require('nodemailer');
const slugify = require('slugify');

// GET / - fetch all approved blogs with pagination, filtering, search
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const query = { approved: true };

    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in getBlogs:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
};

// GET /:slug - fetch single blog by slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, approved: true }).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog.' });
  }
};

// POST / - create new blog (admin only)
const createBlog = async (req, res) => {
  try {
    const { title, summary, content, image, tags, category } = req.body;

    const generateUniqueSlug = async (title) => {
      let slug = slugify(title, { lower: true, strict: true });
      let slugExists = await Blog.findOne({ slug });
      let suffix = 1;
      while (slugExists) {
        slug = slugify(title, { lower: true, strict: true }) + '-' + suffix;
        slugExists = await Blog.findOne({ slug });
        suffix++;
      }
      return slug;
    };

    const slug = await generateUniqueSlug(title);

    const newBlog = new Blog({
      title,
      slug,
      summary,
      content,
      image,
      tags,
      category,
      author: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      approved: false,
    });

    await newBlog.save();

    // Email sending temporarily disabled due to SMTP auth issues
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Blog Submission on EcoLog',
      html: `
        <h3>${title}</h3>
        <p><strong>Author:</strong> ${req.user.name}</p>
        <p><strong>Summary:</strong> ${summary}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Tags:</strong> ${tags.join(', ')}</p>
      `,
    });
    */

    res.status(201).json({ message: 'Blog submitted successfully for review.', blog: newBlog });
  } catch (error) {
    console.error('Error in createBlog:', error);
    res.status(500).json({ error: 'Failed to submit blog.' });
  }
};

// PUT /:id - update blog (admin only)
const updateBlog = async (req, res) => {
  try {
    const { title, summary, content, image, tags, category, approved } = req.body;

    if (!title || !summary || !content || !image || !tags || !category) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const generateUniqueSlug = async (title, currentId) => {
      let slug = slugify(title, { lower: true, strict: true });
      let slugExists = await Blog.findOne({ slug, _id: { $ne: currentId } });
      let suffix = 1;
      while (slugExists) {
        slug = slugify(title, { lower: true, strict: true }) + '-' + suffix;
        slugExists = await Blog.findOne({ slug, _id: { $ne: currentId } });
        suffix++;
      }
      return slug;
    };

    const slug = await generateUniqueSlug(title, req.params.id);

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        summary,
        content,
        image,
        tags,
        category,
        approved,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.json({ message: 'Blog updated successfully.', blog: updatedBlog });
  } catch (error) {
    console.error('Error in updateBlog:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to update blog.' });
  }
};

// DELETE /:id - delete blog (admin only)
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog.' });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // You’ll create this model
const nodemailer = require('nodemailer');
const authenticate = require('../middleware/auth'); // JWT middleware

router.post('/submit', authenticate, async (req, res) => {
  const { title, summary, tag, image } = req.body;

  try {
    const newBlog = new Blog({
      title,
      summary,
      tag,
      image,
      author: req.user.name, // from JWT payload
      date: new Date(),
    });

    await newBlog.save();

    // send email to admin
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
        <p><strong>Tag:</strong> ${tag}</p>
      `,
    });

    res.status(200).json({ message: 'Blog submitted successfully for review.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit blog.' });
  }
});

module.exports = router;

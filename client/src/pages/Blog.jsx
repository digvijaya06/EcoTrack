import React from 'react';

const blogPosts = [
  {
    title: '5 Simple Eco-Friendly Habits to Start Today',
    summary: 'From carrying a reusable water bottle to switching off unused lights — discover tiny actions that create big impact.',
    author: 'Team EcoLog',
    date: 'May 18, 2025',
    tag: 'Beginner Tips',
    image: 'https://images.pexels.com/photos/8989430/pexels-photo-8989430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'How Tracking My Green Goals Changed My Life',
    summary: 'A community member shares how using EcoLog for 30 days helped build discipline and environmental awareness.',
    author: 'Riya Shah',
    date: 'May 11, 2025',
    tag: 'Stories',
    image: 'https://images.pexels.com/photos/9034665/pexels-photo-9034665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Top 10 Rewards You Can Unlock on EcoLog',
    summary: 'Earn badges, certificates, and real-world gifts while saving the planet. See what’s waiting for you!',
    author: 'EcoLog Team',
    date: 'April 29, 2025',
    tag: 'Rewards',
    image: 'http://images.pexels.com/photos/6120397/pexels-photo-6120397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Blog = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '72rem' }}>
      <h1 className="display-4 fw-bold text-center mb-4">🌱 EcoLog Blog</h1>
      <p className="text-center text-secondary mx-auto mb-5" style={{ maxWidth: '40rem' }}>
        Read real stories, tips, and ideas from people building a greener world — one action at a time.
      </p>

      <div className="row g-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="card rounded shadow-sm overflow-hidden">
            <img src={post.image} alt={post.title} className="card-img-top" style={{ height: '12rem', objectFit: 'cover' }} />
            <div className="card-body">
              <span className="badge bg-success bg-opacity-25 text-success small px-2 py-1 mb-2 d-inline-block">
                {post.tag}
              </span>
              <h2 className="h5 fw-semibold text-dark mb-2">{post.title}</h2>
              <p className="text-secondary small mb-3">{post.summary}</p>
              <div className="small text-secondary">
                By <span className="fw-medium">{post.author}</span> • {post.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5 text-secondary">
        Want to contribute your own blog? ✍️ <br />
        Email us at <a href="mailto:ecolog@yourwebsite.com" className="text-success text-decoration-underline">ecolog@yourwebsite.com</a> or share your journey in our community!
      </div>
    </div>
  );
};

export default Blog;

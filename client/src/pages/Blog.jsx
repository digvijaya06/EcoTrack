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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">🌱 EcoLog Blog</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Read real stories, tips, and ideas from people building a greener world — one action at a time.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mb-2">
                {post.tag}
              </span>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{post.summary}</p>
              <div className="text-sm text-gray-500">
                By <span className="font-medium">{post.author}</span> • {post.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-600">
        Want to contribute your own blog? ✍️ <br />
        Email us at <a href="mailto:ecolog@yourwebsite.com" className="text-green-600 underline">ecolog@yourwebsite.com</a> or share your journey in our community!
      </div>
    </div>
  );
};

export default Blog;

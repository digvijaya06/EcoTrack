import React, { useState, useEffect } from 'react';
import BlogList from '../components/blog/BlogList';
// import staticBlogs from '../data/staticBlogs.json';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category);
        if (tag) queryParams.append('tag', tag);
        if (search) queryParams.append('search', search);

        const response = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, [category, tag, search]);

  const filteredBlogs = blogs;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">🌱 EcoLog Blog</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Read real stories, tips, and ideas from people building a greener world — one action at a time.
      </p>

      <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 mb-8 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
        >
          <option value="">All Categories</option>
          <option value="Environment">Environment</option>
          <option value="Events">Events</option>
          <option value="Recycling">Recycling</option>
        </select>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-48"
        >
          <option value="">All Tags</option>
          <option value="EcoTips">EcoTips</option>
          <option value="Sustainability">Sustainability</option>
          <option value="ZeroWaste">ZeroWaste</option>
        </select>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 text-gray-600">No blogs available at the moment.</div>
      ) : (
        <BlogList blogs={filteredBlogs} />
      )}

      <div className="text-center mt-12 text-gray-600">
        Want to contribute your own blog? ✍️ <br />
        Email us at <a href="mailto:ecolog@yourwebsite.com" className="text-green-600 underline">ecolog@yourwebsite.com</a> or share your journey in our community!
      </div>
    </div>
  );
};

export default Blog;

import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      <Link to={`/blog/${blog.slug}`}>
        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-5">
        <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mb-2">
          {blog.category}
        </span>
        <Link to={`/blog/${blog.slug}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600">{blog.title}</h2>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{blog.summary}</p>
        <div className="text-sm text-gray-500">
          By <span className="font-medium">{blog.author?.name || 'Unknown'}</span> • {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

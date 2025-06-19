import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-gray-600">No blogs available at the moment.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

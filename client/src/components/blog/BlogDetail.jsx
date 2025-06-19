import React from 'react';

const BlogDetail = ({ blog }) => {
  return (
    <article className="prose max-w-none">
      <h1 className="mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        By <span className="font-medium">{blog.author?.name || 'Unknown'}</span> • {new Date(blog.createdAt).toLocaleDateString()}
      </div>
      {blog.image && <img src={blog.image} alt={blog.title} className="w-full mb-6 rounded" />}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <div className="mt-8 text-sm text-gray-600">
        Category: <span className="font-medium">{blog.category}</span> | Tags: {blog.tags?.join(', ')}
      </div>
    </article>
  );
};

export default BlogDetail;

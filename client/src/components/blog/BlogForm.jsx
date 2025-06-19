import React, { useState, useEffect } from 'react';

const BlogForm = ({ blog = null, onSubmit }) => {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [summary, setSummary] = useState(blog ? blog.summary : '');
  const [content, setContent] = useState(blog ? blog.content : '');
  const [image, setImage] = useState(blog ? blog.image : '');
  const [category, setCategory] = useState(blog ? blog.category : '');
  const [tags, setTags] = useState(blog ? blog.tags.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    onSubmit({
      title,
      summary,
      content,
      image,
      category,
      tags: tagsArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-6">{blog ? 'Edit Blog' : 'New Blog'}</h2>

      <label className="block mb-4">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Summary</span>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Content (HTML)</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 font-mono"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Image URL</span>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Category</span>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700">Tags (comma separated)</span>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {blog ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  );
};

export default BlogForm;

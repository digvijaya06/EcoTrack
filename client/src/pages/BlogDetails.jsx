import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetail from '../components/blog/BlogDetail';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-12">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-12 text-gray-600">Blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BlogDetail blog={blog} />
    </div>
  );
};

export default BlogDetails;

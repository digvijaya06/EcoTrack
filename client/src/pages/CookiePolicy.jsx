import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-6">
        This Cookie Policy explains how we use cookies and similar technologies to enhance your experience on our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve performance.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies to:
        <ul className="list-disc list-inside mt-2 ml-4">
          <li>Remember user settings and preferences</li>
          <li>Analyze traffic and user behavior (e.g. via Google Analytics)</li>
          <li>Improve site speed and functionality</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Managing Cookies</h2>
      <p className="mb-4">
        You can control or disable cookies through your browser settings. However, disabling cookies may impact your experience on our site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Contact Us</h2>
      <p>
        If you have any questions regarding this policy, email us at <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">EcoTrack@gmail.com</a>.
      </p>
    </div>
  );
};

export default CookiePolicy;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const roles = [
  {
    title: 'Eco Action Ambassador',
    type: 'Volunteer Role',
    location: 'Remote / Your City',
    description:
      'Promote sustainable actions in your college, society, or city. Encourage people to set and complete eco-goals. You’ll get certificates, recognition, and exciting rewards.',
  },
  {
    title: 'Community Growth Partner',
    type: 'Part-time | Contribution-based',
    location: 'Remote',
    description:
      'Help us grow our action-based community. Share your ideas, bring in new members, and organize virtual eco-events. Build your network and leadership skills.',
  },
  {
    title: 'Eco-Content Creator',
    type: 'Freelance',
    location: 'Remote',
    description:
      'Love writing, video creation, or reels? Help us spread eco-awareness and positive change through creative content. Great for building your portfolio and getting visibility.',
  },
  {
    title: 'Goal Mentor',
    type: 'Volunteer / Certification Based',
    location: 'Remote',
    description:
      'If you’ve completed several goals on our platform and want to guide new members, become a mentor. Earn badges, experience letters, and inspire others.',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80 } }
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } }
};

const Careers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: selectedRole?.title }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Opportunities with <span className="text-eco-600">EcoLog</span>
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        We're not just building a platform — we're building a movement. If you're passionate about sustainability, growth, and purpose-driven work, we have exciting ways for you to be part of our mission.
      </motion.p>

      <motion.div
        className="bg-eco-50 p-6 rounded-xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-3">Why Join Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Be a changemaker in your community and beyond.</li>
          <li>Get recognized through certificates, rewards, and public mentions.</li>
          <li>Grow your network with like-minded people across India.</li>
          <li>Sharpen your skills — leadership, content creation, social outreach.</li>
        </ul>
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Current Opportunities
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {roles.map((role, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(34,197,94,0.4)" }}
            onClick={() => openModal(role)}
          >
            <h3 className="text-xl font-bold text-eco-700">{role.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{role.location} • {role.type}</p>
            <p className="text-gray-700 mb-4">{role.description}</p>
            <button
              className="inline-block bg-eco-600 text-white px-4 py-2 rounded hover:bg-eco-700 transition"
              onClick={(e) => { e.stopPropagation(); openModal(role); }}
            >
              Apply / Join
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-14 text-center text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Don’t see your perfect role? <br />
        Share your ideas at <a href="mailto:ecolog@yourwebsite.com" className="text-eco-600 underline">ecolog@yourwebsite.com</a> — we’d love to hear how you want to contribute.
      </motion.div>

      {modalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Apply for {selectedRole?.title}</h3>
            {submitted ? (
              <p className="text-green-600 font-semibold">Thank you for your application! We will get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-eco-600 text-white px-4 py-2 rounded hover:bg-eco-700 transition font-semibold"
                >
                  Submit Application
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Careers;

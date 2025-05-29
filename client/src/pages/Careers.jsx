import React from 'react';

const Careers = () => {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Opportunities with <span className="text-green-600">EcoLog</span></h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        We're not just building a platform — we're building a movement. If you're passionate about sustainability, growth, and purpose-driven work, we have exciting ways for you to be part of our mission.
      </p>

      <div className="bg-green-50 p-6 rounded-xl mb-12">
        <h2 className="text-2xl font-semibold mb-3">Why Join Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Be a changemaker in your community and beyond.</li>
          <li>Get recognized through certificates, rewards, and public mentions.</li>
          <li>Grow your network with like-minded people across India.</li>
          <li>Sharpen your skills — leadership, content creation, social outreach.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Current Opportunities</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <div key={index} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-green-700">{role.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{role.location} • {role.type}</p>
            <p className="text-gray-700 mb-4">{role.description}</p>
            <a
              href="mailto:ecolog@yourwebsite.com?subject=I want to contribute"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Apply / Join
            </a>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center text-gray-600">
        Don’t see your perfect role? <br />
        Share your ideas at <a href="mailto:ecolog@yourwebsite.com" className="text-green-600 underline">ecolog@yourwebsite.com</a> — we’d love to hear how you want to contribute.
      </div>
    </div>
  );
};

export default Careers;

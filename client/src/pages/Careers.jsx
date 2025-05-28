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
    <div className="container py-5" style={{ maxWidth: '72rem' }}>
      <h1 className="display-4 fw-bold text-center mb-4">
        Opportunities with <span className="text-success">EcoLog</span>
      </h1>
      <p className="text-center text-secondary mx-auto mb-5" style={{ maxWidth: '40rem' }}>
        We're not just building a platform — we're building a movement. If you're passionate about sustainability, growth, and purpose-driven work, we have exciting ways for you to be part of our mission.
      </p>

      <div className="bg-success bg-opacity-10 p-3 rounded mb-5">
        <h2 className="h4 fw-semibold mb-3">Why Join Us?</h2>
        <ul className="list-unstyled ps-3 text-secondary mb-0">
          <li className="mb-2">Be a changemaker in your community and beyond.</li>
          <li className="mb-2">Get recognized through certificates, rewards, and public mentions.</li>
          <li className="mb-2">Grow your network with like-minded people across India.</li>
          <li>Sharpen your skills — leadership, content creation, social outreach.</li>
        </ul>
      </div>

      <h2 className="h4 fw-semibold mb-4">Current Opportunities</h2>
      <div className="row g-4">
        {roles.map((role, index) => (
          <div key={index} className="card border shadow-sm rounded hover-shadow">
            <div className="card-body">
              <h3 className="h5 fw-bold text-success">{role.title}</h3>
              <p className="small text-secondary mb-2">{role.location} • {role.type}</p>
              <p className="text-secondary mb-3">{role.description}</p>
              <a
                href="mailto:ecolog@yourwebsite.com?subject=I want to contribute"
                className="btn btn-success"
              >
                Apply / Join
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center text-secondary">
        Don’t see your perfect role? <br />
        Share your ideas at <a href="mailto:ecolog@yourwebsite.com" className="text-success text-decoration-underline">ecolog@yourwebsite.com</a> — we’d love to hear how you want to contribute.
      </div>
    </div>
  );
};

export default Careers;

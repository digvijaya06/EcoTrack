import React from 'react';
import { Link } from 'react-router-dom';

const VisitorHome = () => {
  return (
    <div className="min-vh-100 bg-white">
      {/* Hero Section */}
      <section className="position-relative text-white" style={{background: 'linear-gradient(to bottom, #22c55e, #166534)'}}>
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
        <div className="container py-5 py-md-8 position-relative" style={{zIndex: 10}}>
          <div className="text-center text-md-start mx-auto" style={{maxWidth: '32rem'}}>
            <h1 className="display-4 fw-bold">
              Track Your Impact, Earn Green Points
            </h1>
            <p className="mt-3 fs-5 text-success">
              Join thousands making a difference through everyday eco-friendly actions. Track, earn points, and see your positive impact on the planet.
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
              <Link to="/register" className="btn btn-light text-success fw-semibold px-4 py-2 rounded">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-outline-light fw-medium px-3 py-2 rounded">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 end-0" style={{height: '4rem', backgroundColor: '#fff'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h2 fw-bold text-dark">How It Works</h2>
            <p className="mt-3 fs-5 text-secondary mx-auto" style={{maxWidth: '48rem'}}>
              Track your eco-friendly actions, earn points, and make a real difference - all while seeing your impact grow.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">

            {/* Feature 1 */}
            <div className="text-center p-4 border border-light rounded shadow-sm h-100">
              <div className="w-16 h-16 mx-auto rounded-circle bg-success bg-opacity-25 d-flex align-items-center justify-content-center mb-3 fs-2 text-success">
                🌿
              </div>
              <h3 className="h5 fw-semibold text-dark">Log Actions</h3>
              <p className="mt-3 text-secondary">
                Record your daily eco-friendly actions from reducing water usage to taking public transport.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-4 border border-light rounded shadow-sm h-100">
              <div className="w-16 h-16 mx-auto rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mb-3 fs-2 text-warning">
                🏆
              </div>
              <h3 className="h5 fw-semibold text-dark">Earn Points</h3>
              <p className="mt-3 text-secondary">
                Each action earns you points based on its environmental impact. Level up as your points grow.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-4 border border-light rounded shadow-sm h-100">
              <div className="w-16 h-16 mx-auto rounded-circle bg-primary bg-opacity-25 d-flex align-items-center justify-content-center mb-3 fs-2 text-primary">
                📊
              </div>
              <h3 className="h5 fw-semibold text-dark">Track Progress</h3>
              <p className="mt-3 text-secondary">
                See your impact grow through beautiful visualizations and earn badges for your achievements.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-4 border border-light rounded shadow-sm h-100">
              <div className="w-16 h-16 mx-auto rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mb-3 fs-2 text-warning">
                🏆
              </div>
              <h3 className="h5 fw-semibold text-dark">Join Community</h3>
              <p className="mt-3 text-secondary">
               Connect with like-minded individuals and participate in community challenges.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-4 border border-light rounded shadow-sm h-100">
              <div className="w-16 h-16 mx-auto rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mb-3 fs-2 text-warning">
                🏆
              </div>
              <h3 className="h5 fw-semibold text-dark">Share Progress</h3>
              <p className="mt-3 text-secondary">
               Inspire others by sharing your achievements and impact on social media.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.pexels.com/photos/5831003/pexels-photo-5831003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Person planting a tree"
                className="rounded shadow-lg img-fluid"
              />
            </div>

            <div className="col-md-6">
              <h2 className="h2 fw-bold text-dark mb-4">Why Use GreenPoints?</h2>
              <ul className="list-unstyled">
                {[
                  { title: 'Make a Real Impact', description: 'Small actions add up to create significant environmental change when we all work together.' },
                  { title: 'Stay Motivated', description: 'Our gamified approach helps you stay consistent with your eco-friendly habits.' },
                  { title: 'Learn New Habits', description: 'Discover new ways to reduce your environmental footprint through our resources and community.' },
                  { title: 'Join a Community', description: 'Connect with like-minded individuals all working toward a more sustainable future.' },
                ].map((item, index) => (
                  <li key={index} className="d-flex mb-3">
                    <span className="text-success me-3 fs-4">✅</span>
                    <div>
                      <h3 className="h5 fw-semibold text-dark">{item.title}</h3>
                      <p className="text-secondary mb-0">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="h2 fw-bold text-dark mb-4">Live Impact Stats</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[
              { label: 'Eco Actions Logged', value: '2,48,000+' },
              { label: 'Green Points Earned', value: '5,50,000+' },
              { label: 'CO₂ Saved (kg)', value: '13,200+' },
            ].map((stat, index) => (
              <div key={index} className="bg-success bg-opacity-10 p-4 rounded shadow text-center h-100">
                <div className="display-4 fw-bold text-success">{stat.value}</div>
                <div className="mt-2 text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="h2 fw-bold text-dark mb-4">What Our Users Say</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[
              { name: 'Ayesha', text: 'GreenPoints made me aware of my habits and now I feel proud to take small steps daily!' },
              { name: 'Ravi', text: 'I love earning points while doing good. It’s motivating and fun!' },
              { name: 'Neha', text: 'The community here is so positive. It’s the most rewarding app I’ve used!' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow border h-100">
                <p className="fst-italic text-secondary">“{item.text}”</p>
                <div className="mt-3 text-success fw-semibold">- {item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorHome;

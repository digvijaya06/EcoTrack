import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="text-center md:text-left md:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Track Your Impact, Earn Green Points
            </h1>
            <p className="mt-6 text-xl text-green-100">
              Join thousands making a difference through everyday eco-friendly actions. Track, earn points, and see your positive impact on the planet.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/about" className="bg-white text-green-700 hover:bg-gray-100 font-semibold text-lg px-8 py-3 rounded-md">
                Learn More
              </Link>
              <Link to="/login" className="border border-white text-white hover:bg-green-700 font-medium text-lg px-6 py-3 rounded-md">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-white"></div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Track your eco-friendly actions, earn points, and make a real difference - all while seeing your impact grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-100 hover:shadow-md transition-shadow rounded-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600 text-2xl">
                🌿
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Log Actions</h3>
              <p className="mt-4 text-gray-600">
                Record your daily eco-friendly actions from reducing water usage to taking public transport.
              </p>
            </div>

            <div className="text-center p-8 border border-gray-100 hover:shadow-md transition-shadow rounded-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-6 text-yellow-600 text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Earn Points</h3>
              <p className="mt-4 text-gray-600">
                Each action earns you points based on its environmental impact. Level up as your points grow.
              </p>
            </div>

            <div className="text-center p-8 border border-gray-100 hover:shadow-md transition-shadow rounded-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Track Progress</h3>
              <p className="mt-4 text-gray-600">
                See your impact grow through beautiful visualizations and earn badges for your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div className="mb-12 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/5831003/pexels-photo-5831003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Person planting a tree"
                className="rounded-xl shadow-xl max-w-full h-auto"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Use GreenPoints?</h2>
              <ul className="space-y-6">
                {[
                  { title: 'Make a Real Impact', description: 'Small actions add up to create significant environmental change when we all work together.' },
                  { title: 'Stay Motivated', description: 'Our gamified approach helps you stay consistent with your eco-friendly habits.' },
                  { title: 'Learn New Habits', description: 'Discover new ways to reduce your environmental footprint through our resources and community.' },
                  { title: 'Join a Community', description: 'Connect with like-minded individuals all working toward a more sustainable future.' },
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-green-600 mr-3 mt-1 text-xl">✅</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 lg:p-16 md:max-w-2xl">
              <h2 className="text-3xl font-bold text-white">Ready to make a difference?</h2>
              <p className="mt-4 text-xl text-green-100">
                Join thousands of others tracking their eco-friendly actions and making a positive impact on our planet.
              </p>
              <div className="mt-8">
                <Link to="/register" className="bg-white text-green-700 hover:bg-gray-100 inline-flex items-center px-6 py-3 rounded-md font-semibold">
                  Get Started Today <span className="ml-2">➡️</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <span className="text-green-600 text-2xl mr-2">🌿</span>
              <span className="text-xl font-bold text-green-800">GreenPoints</span>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} GreenPoints. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

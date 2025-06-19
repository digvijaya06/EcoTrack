import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  ArrowRight, 
  Leaf, 
  Target, 
  Users, 
  TrendingUp, 
  Award,
  Globe,
  Recycle,
  Zap,
  TreePine
} from 'lucide-react';

import Testimonial from '../components/ui/Testimonial';

const Home = () => {
  const features = [
    {
      icon: Target,
      title: 'Track Actions',
      description: 'Monitor your daily eco-friendly activities and measure your environmental impact',
      color: 'from-eco-500 to-eco-600'
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Visualize your progress with detailed charts and personalized insights',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded individuals and participate in global challenges',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Earn badges and climb leaderboards as you build sustainable habits',
      color: 'from-earth-500 to-earth-600'
    }
  ];

  const stats = [
    { number: 50, suffix: 'K+', label: 'Active Users', icon: Users },
    { number: 200, suffix: 'M+', label: 'Actions Tracked', icon: Target },
    { number: 15000, suffix: 'K', label: 'CO₂ Saved (kg)', icon: Leaf },
    { number: 95, suffix: '%', label: 'User Satisfaction', icon: Award }
  ];

  const actionTypes = [
    { icon: Recycle, label: 'Recycling', count: '12.5K actions' },
    { icon: Zap, label: 'Energy Saving', count: '8.2K actions' },
    { icon: TreePine, label: 'Tree Planting', count: '5.7K actions' },
    { icon: Globe, label: 'Transportation', count: '15.3K actions' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 via-white to-earth-50">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-gradient-to-r from-eco-500 to-eco-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Leaf className="w-10 h-10 text-white" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Track Your{' '}
                <span className="bg-gradient-to-r from-eco-600 to-eco-700 bg-clip-text text-transparent">
                  Environmental
                </span>
                <br />
                Impact Daily
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join thousands of eco-warriors building sustainable habits. Track actions, 
                measure impact, and contribute to a greener future with our comprehensive 
                environmental action tracker.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-eco-600 to-eco-700 hover:from-eco-700 hover:to-eco-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/analytics"
                className="inline-flex items-center px-8 py-4 border-2 border-eco-600 text-lg font-medium rounded-lg text-eco-600 bg-white hover:bg-eco-50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View Demo
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-8 h-8 text-eco-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      <CountUp 
                        start={0}
                        end={stat.number} 
                        suffix={stat.suffix} 
                        duration={2} 
                        separator="," 
                        redraw={true}
                        enableScrollSpy={true}
                      />
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 bg-eco-200 rounded-full flex items-center justify-center"
          >
            <Recycle className="w-8 h-8 text-eco-600" />
          </motion.div>
        </div>
        
        <div className="absolute top-40 right-20 opacity-20">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="w-12 h-12 bg-earth-200 rounded-full flex items-center justify-center"
          >
            <TreePine className="w-6 h-6 text-earth-600" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for{' '}
              <span className="text-eco-600">Sustainable Living</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to track, analyze, and improve your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-eco-200 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Types Section */}
      <section className="py-20 bg-gradient-to-br from-eco-50 to-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Multiple{' '}
              <span className="text-eco-600">Action Categories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Monitor various aspects of your environmental journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:bg-eco-50"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-eco-500 to-eco-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.label}
                  </h3>
                  <p className="text-eco-600 font-medium">{type.count}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-eco-600 to-eco-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-eco-100 mb-8 leading-relaxed">
              Join our community of environmental champions and start tracking 
              your impact today. Every action counts towards a sustainable future.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-eco-600 font-semibold rounded-lg hover:bg-eco-50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Testimonial />
    </div>
  );
};

export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Users, Globe, Activity, CheckCircle2, Award, BookOpen } from 'lucide-react';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-primary-500" />
           <span className="ml-2 text-5xl font-display font-extrabold bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
  GreenPoint
</span>

          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Making Sustainable Living <span className="text-primary-600">Measurable & Rewarding</span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            GreenPoint helps you track and measure your environmental impact through everyday sustainable actions, 
            making eco-friendly living more engaging, rewarding, and impactful.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-8 border border-neutral-100"
        >
          <img 
            src="https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Sustainable living" 
            className="w-full h-100 object-cover rounded-lg mb-8"
          />
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
              Our Mission
            </h2>
            <p className="text-neutral-700 mb-4">
              At GreenPoint, we believe that small, consistent actions can lead to significant environmental change 
              when adopted by many. Our mission is to empower individuals to make eco-friendly choices by providing 
              tools that make sustainable living measurable, engaging, and rewarding.
            </p>
            <p className="text-neutral-700 mb-4">
              We aim to build a global community of environmentally conscious individuals who inspire each other to 
              take action, creating a ripple effect of positive impact on our planet.
            </p>
            <p className="text-neutral-700">
              Through gamification, education, and community building, we're transforming how people approach 
              sustainability—from a daunting challenge to an achievable, rewarding journey.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            How GreenPoint Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our platform makes it easy to incorporate sustainability into your daily life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Track Actions</h3>
            <p className="text-neutral-600 mb-4">
              Complete eco-friendly actions from our curated list, from recycling to reducing energy consumption.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Daily, weekly, and one-time actions
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Various difficulty levels
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Earn points for each completed action
              </li>
            </ul>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-full mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Measure Impact</h3>
            <p className="text-neutral-600 mb-4">
              See the real environmental effect of your actions with precise impact metrics.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <span className="mr-2 text-secondary-500">•</span>
                CO2 emissions reduction
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-secondary-500">•</span>
                Water conservation
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-secondary-500">•</span>
                Energy savings
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-secondary-500">•</span>
                Waste diverted from landfills
              </li>
            </ul>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-accent-100 text-accent-600 rounded-full mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Grow & Connect</h3>
            <p className="text-neutral-600 mb-4">
              Level up, earn achievements, and join a community of eco-conscious individuals.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <span className="mr-2 text-accent-500">•</span>
                Progress through levels
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent-500">•</span>
                Unlock achievements and badges
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent-500">•</span>
                Compare your impact on leaderboards
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent-500">•</span>
                Learn with educational resources
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Our Collective Impact
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Together, GreenPoint users are making a significant difference
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-primary-600 text-white rounded-xl shadow-md p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-primary-100">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">250,000+</h3>
              <p className="text-primary-100">Actions Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">125,000 kg</h3>
              <p className="text-primary-100">CO2 Saved</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">1.5M L</h3>
              <p className="text-primary-100">Water Conserved</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            The Team Behind GreenPoint
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Passionate environmentalists, developers, and data scientists working for a better planet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-200 mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Sarah Johnson" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Sarah Johnson</h3>
            <p className="text-primary-600 mb-3">Founder & CEO</p>
            <p className="text-neutral-600 mb-4">
              Environmental scientist with 10+ years of experience in sustainability initiatives.
            </p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-200 mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Michael Chen" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Michael Chen</h3>
            <p className="text-primary-600 mb-3">CTO</p>
            <p className="text-neutral-600 mb-4">
              Software engineer with expertise in building ethical tech solutions for environmental challenges.
            </p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-200 mx-auto mb-4 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Emma Rodriguez" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Emma Rodriguez</h3>
            <p className="text-primary-600 mb-3">Head of Content</p>
            <p className="text-neutral-600 mb-4">
              Environmental educator specializing in engaging sustainability content and community building.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQs Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Everything you need to know about GreenPoint
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 space-y-6"
        >
          {/* FAQ Item 1 */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Is GreenPoint free to use?
            </h3>
            <p className="text-neutral-600">
              Yes, GreenPoint is completely free! We believe that access to tools that promote sustainable living 
              should be available to everyone. In the future, we may introduce premium features, but the core 
              functionality will always remain free.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              How do you calculate environmental impact?
            </h3>
            <p className="text-neutral-600">
              We work with environmental scientists to calculate the average impact of each action based on 
              scientific data and research. These calculations consider factors like average resource usage, 
              emissions data, and regional variations where applicable.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Can I suggest new actions or features?
            </h3>
            <p className="text-neutral-600">
              Absolutely! We welcome community input. You can submit suggestions through your account settings 
              or by contacting our support team. We regularly review user feedback to improve the platform.
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              How does the verification system work?
            </h3>
            <p className="text-neutral-600">
              Our verification system varies by action. Some actions use the honor system, while others might 
              request photo verification or location data. We've designed the system to be easy to use while 
              maintaining the integrity of impact reporting.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white p-10 text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of users already taking small steps toward a more sustainable future. 
            Every action counts!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors shadow-md"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;
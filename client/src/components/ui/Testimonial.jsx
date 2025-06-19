import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Eco Warrior',
    image: '/testimonials/p2.jpeg',
    text: 'This platform has completely transformed how I track my environmental impact. Highly recommend to everyone!',
    bgColor: 'from-eco-400 to-eco-600',
    textColor: 'text-eco-900',
  },
  {
    id: 2,
    name: 'Michael Smith',
    role: 'Sustainability Advocate',
    image: '/testimonials/p3.jpg',
    text: 'The analytics and community features keep me motivated to stay green every day.',
    bgColor: 'from-eco-400 to-eco-600',
    textColor: 'text-eco-900',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    role: 'Green Enthusiast',
    image: '/testimonials/p1.webp',
    text: 'I love how easy it is to monitor my eco-friendly actions and see real progress.',
    bgColor: 'from-eco-400 to-eco-600',
    textColor: 'text-eco-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80 } }
};

const Testimonial = () => {
  return (
    <section className="bg-gradient-to-r from-eco-50 to-earth-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          What Our Users Say
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Real feedback from our community of environmental champions.
        </p>
      </div>

      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {testimonials.map(({ id, name, role, image, text, bgColor, textColor }) => (
          <motion.div
            key={id}
            className={`bg-gradient-to-r ${bgColor} rounded-xl shadow-md p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
            variants={itemVariants}
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white shadow-sm"
            />
            <p className={`italic mb-4 font-semibold ${textColor}`}>“{text}”</p>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-700">{role}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonial;

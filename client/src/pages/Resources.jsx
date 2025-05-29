import React from 'react';
import { ExternalLink, BookOpen, Film, Calendar, Award, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Resources = () => {
  const resources = [
    {
      id: '1',
      title: "Reducing Your Carbon Footprint: A Beginner's Guide",
      description: 'Learn simple steps to reduce your environmental impact in everyday life.',
      type: 'article',
      imageUrl: 'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=600',
      url: '#',
      tags: ['carbon footprint', 'beginners', 'sustainable living']
    },
    {
      id: '2',
      title: 'How to Start Composting at Home',
      description: 'A comprehensive guide to turning food waste into valuable garden compost.',
      type: 'guide',
      imageUrl: 'https://images.pexels.com/photos/4503798/pexels-photo-4503798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: '#',
      tags: ['composting', 'gardening', 'waste reduction']
    },
    {
      id: '3',
      title: 'The Truth About Plastic Pollution',
      description: 'An eye-opening documentary exploring the global plastic crisis and solutions.',
      type: 'video',
      imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: '#',
      tags: ['plastic pollution', 'documentary', 'oceans']
    },
    {
      id: '4',
      title: 'Annual Sustainability Summit 2025',
      description: 'Join environmental leaders for discussions on climate action and policy.',
      type: 'event',
      imageUrl: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: '#',
      date: '2025-06-15',
      tags: ['event', 'summit', 'networking']
    },
    {
      id: '5',
      title: 'Energy-Saving Tips for Your Home',
      description: 'Practical advice for reducing energy consumption and lowering utility bills.',
      type: 'guide',
      imageUrl: 'https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: '#',
      tags: ['energy efficiency', 'home', 'cost savings']
    },
    {
      id: '6',
      title: 'Sustainable Fashion: Beyond the Trends',
      description: 'Explore the environmental impact of fast fashion and discover ethical alternatives.',
      type: 'article',
      imageUrl: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: '#',
      tags: ['fashion', 'ethical consumption', 'sustainability']
    }
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article':
        return <BookOpen size={16} className="text-primary-600" />;
      case 'video':
        return <Film size={16} className="text-accent-600" />;
      case 'event':
        return <Calendar size={16} className="text-secondary-600" />;
      case 'guide':
        return <Award size={16} className="text-success-600" />;
      default:
        return null;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case 'article':
        return 'bg-primary-50 text-primary-700';
      case 'video':
        return 'bg-accent-50 text-accent-700';
      case 'event':
        return 'bg-secondary-50 text-secondary-700';
      case 'guide':
        return 'bg-success-50 text-success-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-5 border-b border-gray-200 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Educational Resources</h1>
          <p className="mt-1 text-sm text-gray-500">
            Discover articles, guides, videos, and events to help you live more sustainably
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search for resources..."
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className={`${getResourceTypeColor('article')} border-0`}>
              Articles
            </Button>
            <Button variant="outline" size="sm" className={`${getResourceTypeColor('guide')} border-0`}>
              Guides
            </Button>
            <Button variant="outline" size="sm" className={`${getResourceTypeColor('video')} border-0`}>
              Videos
            </Button>
            <Button variant="outline" size="sm" className={`${getResourceTypeColor('event')} border-0`}>
              Events
            </Button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <span
                    className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getResourceTypeColor(resource.type)}`}
                  >
                    {getResourceIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </span>

                  {resource.date && (
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(resource.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  <span className="mr-1">Read more</span>
                  <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with the Latest Resources</h2>
              <p className="mb-6">
                Join our newsletter to receive curated sustainability resources, tips, and updates directly to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input flex-1 text-gray-800"
                />
                <Button className="bg-white text-primary-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>

              <p className="mt-4 text-sm text-primary-100">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;

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
        return <BookOpen size={16} className="text-primary" />;
      case 'video':
        return <Film size={16} className="text-info" />;
      case 'event':
        return <Calendar size={16} className="text-secondary" />;
      case 'guide':
        return <Award size={16} className="text-success" />;
      default:
        return null;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case 'article':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'video':
        return 'bg-info bg-opacity-10 text-info';
      case 'event':
        return 'bg-secondary bg-opacity-10 text-secondary';
      case 'guide':
        return 'bg-success bg-opacity-10 text-success';
      default:
        return 'bg-light text-secondary';
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-4">
      <div className="container pt-4">
        <div className="pb-3 border-bottom mb-4">
          <h1 className="h3 fw-bold text-dark">Educational Resources</h1>
          <p className="mt-1 text-muted">
            Discover articles, guides, videos, and events to help you live more sustainably
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-4">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ps-3 pointer-events-none">
              <Search size={18} className="text-muted" />
            </div>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search for resources..."
            />
          </div>

          <div className="mt-3 d-flex flex-wrap gap-2">
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden shadow-sm h-100">
              <div className="overflow-hidden" style={{height: '12rem'}}>
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-100 h-100 object-fit-cover"
                  style={{transition: 'transform 0.3s'}}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <CardContent className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <span
                    className={`d-inline-flex align-items-center px-2 py-1 rounded-pill fs-7 fw-medium ${getResourceTypeColor(resource.type)}`}
                  >
                    {getResourceIcon(resource.type)}
                    <span className="ms-1 text-capitalize">{resource.type}</span>
                  </span>

                  {resource.date && (
                    <span className="ms-2 fs-7 text-muted">
                      {new Date(resource.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                <h3 className="h5 fw-semibold text-dark mb-2">{resource.title}</h3>
                <p className="text-secondary fs-7 mb-3">{resource.description}</p>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-secondary rounded-pill px-3 py-1 fs-7"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex align-items-center text-primary text-decoration-none"
                >
                  <span className="me-1">Read more</span>
                  <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-4 bg-primary text-white">
          <CardContent className="p-4">
            <div className="mx-auto text-center" style={{maxWidth: '36rem'}}>
              <h2 className="h4 fw-bold mb-3">Stay Updated with the Latest Resources</h2>
              <p className="mb-3">
                Join our newsletter to receive curated sustainability resources, tips, and updates directly to your inbox.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-control flex-grow-1 text-dark"
                />
                <Button className="btn btn-light text-primary">
                  Subscribe
                </Button>
              </div>

              <p className="mt-3 fs-7 text-primary-opacity-75">
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

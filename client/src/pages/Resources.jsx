import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../components/ui/Button';
import ResourceList from '../components/resources/ResourceList';
import EventsSection from '../components/resources/EventsSection';
import { fetchResources, fetchEvents } from '../api/fetchResources';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const loadResources = async () => {
      try {
        const res = await fetchResources(filterType);
        // Ensure res is an array before setting state
        setResources(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      }
    };

    const loadEvents = async () => {
      try {
        const evs = await fetchEvents();
        setEvents(evs);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    loadResources();
    loadEvents();
  }, [filterType]);

  useEffect(() => {
    let filtered = [...resources];

    // Filter by search term in title or description
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowerSearch) ||
        (item.description && item.description.toLowerCase().includes(lowerSearch))
      );
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm]);

  // Filter events for workshops type
  const filteredEvents = filterType === 'workshop' || filterType === 'event' ? events : [];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-5 border-b border-gray-200 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Educational Resources</h1>
          <p className="mt-1 text-sm text-gray-500">
            Discover guides, downloads, links, and workshops to help you live more sustainably
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setFilterType('guide')}
              aria-pressed={filterType === 'guide'}
            >
              Guides
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setFilterType('download')}
              aria-pressed={filterType === 'download'}
            >
              Downloads
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setFilterType('link')}
              aria-pressed={filterType === 'link'}
            >
              Links
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setFilterType('workshop')}
              aria-pressed={filterType === 'workshop'}
            >
              Workshops
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-0"
              onClick={() => setFilterType('')}
              aria-pressed={filterType === ''}
            >
              All
            </Button>
          </div>
        </div>

        {/* Resources Grid */}
        {filterType !== 'workshop' && (
          <ResourceList resources={filteredResources} />
        )}

        {/* Events Section */}
        {(filterType === 'workshop' || filterType === 'event' || filterType === '') && (
          <EventsSection events={events} />
        )}

        {/* Newsletter Signup */}
        <div className="mt-12">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-8">
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
        </div>
      </div>
    </div>
  );
};

export default Resources;

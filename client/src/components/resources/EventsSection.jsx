import React from 'react';
import ResourceCard from './ResourceCard';

const EventsSection = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-gray-500">No upcoming events.</p>;
  }

  // Sort events by date ascending
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Workshops & Events</h2>
      <div className="space-y-6">
        {sortedEvents.map((event) => (
          <ResourceCard key={event.id || event._id} resource={{ ...event, type: 'event' }} />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;

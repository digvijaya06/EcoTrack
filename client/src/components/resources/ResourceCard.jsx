import React from 'react';
import { ExternalLink, Download, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const ResourceCard = ({ resource }) => {
  const { title, type, description, tags, date, url } = resource;

  const getIcon = () => {
    switch (type) {
      case 'guide':
        return <Download size={16} className="text-green-600" />;
      case 'download':
        return <Download size={16} className="text-blue-600" />;
      case 'link':
        return <ExternalLink size={16} className="text-purple-600" />;
      case 'workshop':
      case 'event':
        return <Calendar size={16} className="text-orange-600" />;
      default:
        return null;
    }
  };

  const getCTAButton = () => {
    if (type === 'download' || type === 'guide') {
      return (
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          className="mt-4"
        >
          Download
        </Button>
      );
    } else if (type === 'link') {
      return (
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          className="mt-4"
        >
          Visit Link
        </Button>
      );
    } else if (type === 'workshop' || type === 'event') {
      return (
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          className="mt-4"
        >
          Register
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          {getIcon()}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {date && (
          <p className="text-xs text-gray-500 mb-3">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
        {getCTAButton()}
      </div>
    </div>
  );
};

export default ResourceCard;

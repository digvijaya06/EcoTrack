import React from 'react';
import PropTypes from 'prop-types';
import { Users, Award, MapPin, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

import { formatDate } from '../utils/formatterrs';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';


// PropTypes definitions for your data shapes
const CommunityPostPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const LeaderboardUserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  impactScore: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  badges: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const Community = () => {
  const posts = [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Jordan Rivera',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Portland, OR',
      },
      content: 'Just installed solar panels on my roof!...',
      images: ['https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      likes: 42,
      comments: 8,
      shares: 5,
      date: '2025-04-05T14:23:00Z',
      tags: ['solar', 'renewable energy', 'home improvement'],
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'Morgan Zhang',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Austin, TX',
      },
      content: 'Started a community garden in my neighborhood...',
      images: ['https://images.pexels.com/photos/7728027/pexels-photo-7728027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      likes: 87,
      comments: 14,
      shares: 9,
      date: '2025-04-03T09:15:00Z',
      tags: ['gardening', 'community', 'food'],
    },
  ];

  const leaderboard = [
    {
      id: '1',
      name: 'Aisha Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      impactScore: 1250,
      rank: 1,
      badges: ['🌟', '🌱', '♻️'],
    },
    {
      id: '2',
      name: 'Ravi Patel',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      impactScore: 1120,
      rank: 2,
      badges: ['🌱', '🚲', '💧'],
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      impactScore: 980,
      rank: 3,
      badges: ['♻️', '🌱', '🔋'],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-5 border-b border-gray-200 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect with like-minded individuals committed to sustainability
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex space-x-3">
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                    alt="Your profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea className="input min-h-[80px]" placeholder="Share your eco-friendly actions and ideas..." />
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Add Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          Tag Action
                        </Button>
                      </div>
                      <Button variant="primary">Share Post</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <img src={post.user.avatar} alt={post.user.name} className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin size={14} className="mr-1" />
                          {post.user.location}
                        </p>
                        <p className="mt-3 text-gray-700">{post.content}</p>
                        {post.images && (
                          <div className="mt-4">
                            <img src={post.images[0]} alt="Post content" className="rounded-lg max-h-96 w-full object-cover" />
                          </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                          <Button variant="ghost" size="sm" className="text-gray-600" leftIcon={<ThumbsUp size={16} />}>
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600" leftIcon={<MessageSquare size={16} />}>
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600" leftIcon={<Share2 size={16} />}>
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold">Top Contributors</h2>
                </div>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-600">#{user.rank}</span>
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.impactScore} impact points</p>
                      </div>
                      <div className="flex space-x-1">
                        {user.badges.map((badge, i) => (
                          <span key={i} title="Badge">{badge}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-lg font-semibold">Community Stats</h2>
                </div>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    <strong>Users:</strong> 5,000+
                  </li>
                  <li>
                    <strong>Posts:</strong> 2,300+
                  </li>
                  <li>
                    <strong>Actions Tagged:</strong> 1,200+
                  </li>
                  <li>
                    <strong>Events:</strong> 150+
                  </li>
                </ul>
              </CardContent>
            </Card>
            <div className="mt-8">
              <LeaderboardTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Community.propTypes = {
  posts: PropTypes.arrayOf(CommunityPostPropType),
  leaderboard: PropTypes.arrayOf(LeaderboardUserPropType),
};

export default Community;

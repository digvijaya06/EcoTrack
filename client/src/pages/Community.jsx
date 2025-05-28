import React from 'react';
import PropTypes from 'prop-types';
import { Users, Award, MapPin, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

import { formatDate } from '../utils/formatterrs';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

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
    <div className="bg-light min-vh-100 pb-4">
      <div className="container pt-4">
        <div className="pb-3 border-bottom mb-4">
          <h1 className="h3 fw-bold text-dark">Community</h1>
          <p className="mt-1 text-muted">
            Connect with like-minded individuals committed to sustainability
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-8">
            <Card className="mb-4">
              <CardContent className="p-3">
                <div className="d-flex align-items-start gap-3">
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                    alt="Your profile"
                    className="rounded-circle"
                    style={{width: '40px', height: '40px', objectFit: 'cover'}}
                  />
                  <div className="flex-grow-1">
                    <textarea className="form-control" style={{minHeight: '80px'}} placeholder="Share your eco-friendly actions and ideas..." />
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
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

            <div className="d-flex flex-column gap-3">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-3">
                    <div className="d-flex align-items-start gap-3">
                      <img src={post.user.avatar} alt={post.user.name} className="rounded-circle" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center">
                          <h3 className="fw-semibold text-dark mb-0">{post.user.name}</h3>
                          <span className="mx-2 text-muted">•</span>
                          <span className="small text-muted">{formatDate(post.date)}</span>
                        </div>
                        <p className="small text-muted d-flex align-items-center mt-1 mb-2">
                          <MapPin size={14} className="me-1" />
                          {post.user.location}
                        </p>
                        <p className="mt-2 text-secondary">{post.content}</p>
                        {post.images && (
                          <div className="mt-3">
                            <img src={post.images[0]} alt="Post content" className="rounded shadow-sm w-100" style={{maxHeight: '24rem', objectFit: 'cover'}} />
                          </div>
                        )}
                        <div className="mt-3 d-flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-secondary rounded-pill px-3 py-1 small"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-top d-flex justify-content-between">
                          <Button variant="ghost" size="sm" className="text-secondary d-flex align-items-center" leftIcon={<ThumbsUp size={16} />}>
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-secondary d-flex align-items-center" leftIcon={<MessageSquare size={16} />}>
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-secondary d-flex align-items-center" leftIcon={<Share2 size={16} />}>
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
          <div className="col-lg-4">
            <Card className="mb-4">
              <CardContent className="p-3">
                <div className="d-flex align-items-center mb-3">
                  <Award size={20} className="text-primary me-2" />
                  <h2 className="h5 fw-semibold mb-0">Top Contributors</h2>
                </div>
                <div className="d-flex flex-column gap-3">
                  {leaderboard.map((user) => (
                    <div key={user.id} className="d-flex align-items-center gap-3">
                      <span className="fw-semibold text-secondary">#{user.rank}</span>
                      <img src={user.avatar} alt={user.name} className="rounded-circle" style={{width: '32px', height: '32px', objectFit: 'cover'}} />
                      <div className="flex-grow-1">
                        <p className="fw-semibold mb-0">{user.name}</p>
                        <p className="small text-muted mb-0">{user.impactScore} impact points</p>
                      </div>
                      <div className="d-flex gap-1">
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
              <CardContent className="p-3">
                <div className="d-flex align-items-center mb-3">
                  <Users size={20} className="text-primary me-2" />
                  <h2 className="h5 fw-semibold mb-0">Community Stats</h2>
                </div>
                <ul className="text-secondary list-unstyled">
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
            <div className="mt-4">
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

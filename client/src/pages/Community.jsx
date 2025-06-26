import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Users,
  Award,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react";

import { formatDate } from "../utils/formatterrs";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import { fetchCommunityPosts, addCommunityPost } from "../api/community";
import { AuthContext } from "../context/AuthContext";

const Community = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState([]);
  const [newPostMedia, setNewPostMedia] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchCommunityPosts();
        const filteredData = data.filter(
          (post) => post.content && post.content.trim() !== ""
        );
        setPosts(filteredData);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPostContent.trim() || !newPostTitle.trim()) return;
    setSubmitting(true);
    try {
      const postData = {
        title: newPostTitle,
        content: newPostContent,
        tags: newPostTags,
        media: newPostMedia,
      };
      const createdPost = await addCommunityPost(postData);
      setPosts([createdPost, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostTags([]);
      setNewPostMedia([]);
    } catch (err) {
      setError("Failed to submit post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/community/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) throw new Error("Failed to like post");
      const data = await response.json();
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: data.likes } : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const leaderboard = [];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Community Page Header */}
        <div className="border-b pb-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">🌿 Community Hub</h1>
          <p className="mt-2 text-gray-600">
            Connect with like-minded individuals committed to sustainability and
            action.
          </p>
        </div>

        <div>
          {/* Tabs for Posts and Leaderboard */}
          <div className="bg-white rounded-xl p-2 shadow-xl mb-8 max-w-md">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("posts")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "posts"
                    ? "bg-eco-200 text-eco-800 shadow-md"
                    : "text-gray-700 hover:text-eco-700 hover:bg-eco-100"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Activity Feed</span>
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "leaderboard"
                    ? "bg-eco-200 text-eco-800 shadow-md"
                    : "text-gray-700 hover:text-eco-700 hover:bg-eco-100"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "groups"
                    ? "bg-eco-200 text-eco-800 shadow-md"
                    : "text-gray-700 hover:text-eco-700 hover:bg-eco-100"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Groups</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === "posts" && (
                <>
                  {/* Share Post */}
                  {isAuthenticated && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                          Share Your Post
                        </h2>
                        <div className="flex space-x-3">
                          <img
                            src={user?.avatar}
                            alt="Your profile"
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Title of your action"
                              className="input mb-2"
                              value={newPostTitle}
                              onChange={(e) => setNewPostTitle(e.target.value)}
                              disabled={!isAuthenticated}
                            />
                            <textarea
                              placeholder="Share your eco-friendly actions..."
                              className="input min-h-[80px]"
                              value={newPostContent}
                              onChange={(e) =>
                                setNewPostContent(e.target.value)
                              }
                              disabled={!isAuthenticated}
                            />
                            <div className="mt-2 flex space-x-2">
                              <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                className="input text-sm"
                                value={newPostTags.join(", ")}
                                onChange={(e) =>
                                  setNewPostTags(
                                    e.target.value
                                      .split(",")
                                      .map((tag) => tag.trim())
                                  )
                                }
                                disabled={!isAuthenticated}
                              />
                              <label className="text-sm text-gray-700">
                                <input
                                  type="file"
                                  multiple
                                  onChange={(e) =>
                                    setNewPostMedia(Array.from(e.target.files))
                                  }
                                  className="hidden"
                                />
                                <span className="cursor-pointer hover:underline">
                                  📷 Add Photo
                                </span>
                              </label>
                            </div>
                            <div className="mt-4 text-right">
                              <Button
                                onClick={handlePostSubmit}
                                disabled={
                                  submitting ||
                                  !newPostContent.trim() ||
                                  !newPostTitle.trim()
                                }
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {submitting ? "Sharing..." : "Share Post"}
                              </Button>
                              {error && (
                                <p className="text-red-600 mt-2">{error}</p>
                              )}
                              {!isAuthenticated && (
                                <p className="text-gray-500 mt-2">
                                  Please login to post.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Community Activity Section */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        🌍 Community Activity
                      </h2>
                      {loading ? (
                        <p>Loading posts...</p>
                      ) : error ? (
                        <p className="text-red-500">{error}</p>
                      ) : posts.length === 0 ? (
                        <p>No posts yet. Be the first to share!</p>
                      ) : (
                        posts.map((post) => (
                          <div
                            key={post._id}
                            className="border border-gray-300 rounded-lg p-4 mb-4 hover:bg-eco-50 transition-colors duration-300 cursor-pointer"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <img
                                src={post.user.avatar}
                                alt={post.user.name}
                                className="h-10 w-10 rounded-full"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {post.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    post.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{post.content}</p>
                            <div className="flex space-x-2 text-sm text-gray-600">
                              <button
                                onClick={() => handleLike(post._id)}
                                className="flex items-center space-x-1 hover:text-eco-700"
                              >
                                <ThumbsUp size={16} /> <span>{post.likes}</span>
                              </button>
                              <button
                                disabled
                                className="flex items-center space-x-1 opacity-50 cursor-not-allowed"
                              >
                                <MessageSquare size={16} />{" "}
                                <span>{post.commentsCount}</span>
                              </button>
                              <button
                                disabled
                                className="flex items-center space-x-1 opacity-50 cursor-not-allowed"
                              >
                                <Share2 size={16} /> <span>{post.shares}</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Leaderboard Tab */}
              {activeTab === "leaderboard" && (
                <>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                        <Award size={20} className="mr-2 text-eco-600" />{" "}
                        Community Leaderboard
                      </h2>
                      <LeaderboardTable />
                    </CardContent>
                  </Card>
                </>
              )}
              {activeTab === "groups" && (
                <>
                  <div className="space-y-8">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-semibold mb-6">
                        Interest Groups
                      </h2>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
                                alt="Urban Gardeners"
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">
                                  Urban Gardeners
                                </h3>
                                <p className="text-gray-600">
                                  Growing food in the city
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                  <Users className="w-4 h-4" />
                                  <span>1,547 members</span>
                                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                                    Gardening
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Join Group
                            </button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=80&q=80"
                                alt="Zero Waste Warriors"
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">
                                  Zero Waste Warriors
                                </h3>
                                <p className="text-gray-600">
                                  Living waste-free lives
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                  <Users className="w-4 h-4" />
                                  <span>2,341 members</span>
                                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                                    Waste Reduction
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Join Group
                            </button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=80&q=80"
                                alt="Clean Energy Advocates"
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">
                                  Clean Energy Advocates
                                </h3>
                                <p className="text-gray-600">
                                  Promoting renewable energy
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                  <Users className="w-4 h-4" />
                                  <span>1,120 members</span>
                                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                                    Renewable Energy
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Join Group
                            </button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="max-w-md mx-auto space-y-6"></div>
                  </div>
                </>
              )}
            </div>
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      Create Challenge
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      Start Group
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      Share Achievement
                    </button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-4">
                    Trending Topics
                  </h3>
                  <ul className="space-y-1 text-green-700">
                    <li>
                      #ZeroWaste{" "}
                      <span className="text-gray-500 text-sm">234 posts</span>
                    </li>
                    <li>
                      #PlantBased{" "}
                      <span className="text-gray-500 text-sm">189 posts</span>
                    </li>
                    <li>
                      #RenewableEnergy{" "}
                      <span className="text-gray-500 text-sm">156 posts</span>
                    </li>
                    <li>
                      #SustainableFashion{" "}
                      <span className="text-gray-500 text-sm">98 posts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

import { useState, useEffect } from 'react';
import { Calendar, User, MessageCircle, ArrowRight, Tag, Star, TrendingUp, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-nelis-website.onrender.com/api/v1/';


const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const events = [
    {
      id: '1',
      title: 'Nellis Boulevard Auto Show',
      date: '2025-07-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Nellis AFB Community Center',
      description: 'Annual showcase of classic cars, hot rods, and modern vehicles from local enthusiasts.',
      featured: true,
    },
    {
      id: '2',
      title: 'First-Time Buyer Workshop',
      date: '2025-06-20',
      time: '6:00 PM - 8:00 PM',
      location: 'Vegas Premier Auto',
      description: 'Free workshop covering financing, insurance, and what to look for when buying your first car.',
      featured: false,
    },
    {
      id: '3',
      title: 'Military Appreciation Day',
      date: '2025-06-10',
      time: '9:00 AM - 6:00 PM',
      location: 'Thunderbird Motors',
      description: 'Special deals and recognition for active duty and veteran families.',
      featured: false,
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching posts from:', `${API_BASE_URL}posts`);
        const response = await axios.get(`${API_BASE_URL}posts`, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        });
        console.log('API response:', response.data);

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Invalid response format: Expected an array in response.data.data');
        }

        const fetchedPosts = response.data.data.map((post) => {
          if (!post._id || !post.title || !post.content || !post.author) {
            console.warn('Invalid post data:', post);
            return null;
          }
          return {
            id: post._id,
            title: post.title,
            excerpt: post.content.replace(/<[^>]+>/g, '').substring(0, 100) + (post.content.length > 100 ? '...' : ''),
            author: post.author,
            date: post.publishDate || post.createdAt || new Date().toISOString(),
            category: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'General',
            image: post.image || 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
            readTime: `${Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 200)} min read`,
            featured: post.status === 'Published' && Array.isArray(post.tags) && post.tags.includes('featured'),
          };
        }).filter(post => post !== null);

        setPosts(fetchedPosts);
        if (fetchedPosts.length === 0) {
          setError('No published posts found.');
          toast.error('No published posts found.');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to load posts';
        console.error('Error fetching posts:', err.response?.data || err.message);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Buying Tips': 'bg-blue-100 text-blue-800',
      'Events': 'bg-green-100 text-green-800',
      'Maintenance': 'bg-purple-100 text-purple-800',
      'News': 'bg-red-100 text-red-800',
      'Financing': 'bg-orange-100 text-orange-800',
      'General': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleReadMore = async (id) => {
    setModalLoading(true);
    try {
      console.log('Fetching post details from:', `${API_BASE_URL}posts/${id}`);
      const response = await axios.get(`${API_BASE_URL}posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      console.log('Post details response:', response.data);

      if (!response.data || !response.data.data) {
        throw new Error('Invalid post details response');
      }

      const post = response.data.data;
      setSelectedPost({
        id: post._id,
        title: post.title,
        content: post.content,
        author: post.author,
        date: post.publishDate || post.createdAt || new Date().toISOString(),
        category: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'General',
        image: post.image || 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
        readTime: `${Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 200)} min read`,
        featured: post.status === 'Published' && Array.isArray(post.tags) && post.tags.includes('featured'),
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load post details';
      console.error('Error fetching post details:', err.response?.data || err.message);
      toast.error(errorMessage);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Community</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Stay connected with the Nellis Boulevard automotive community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-10 text-gray-900">Latest News & Articles</h2>
            <div className="space-y-10">
              {posts.length === 0 ? (
                <div className="text-center text-gray-600">No posts available.</div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${post.featured ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">{post.readTime}</span>
                        </div>
                        <h3
                          className="text-2xl font-bold mb-4 hover:text-blue-600 cursor-pointer transition-colors duration-300 group-hover:text-blue-600"
                          onClick={() => handleReadMore(post.id)}
                        >
                          {post.title}
                        </h3>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <button
                            className="text-blue-600 hover:text-blue-800 flex items-center font-semibold transition-all duration-300 group-hover:translate-x-1"
                            onClick={() => handleReadMore(post.id)}
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-900">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                Upcoming Events
              </h3>
              <div className="space-y-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`border-l-4 border-blue-600 pl-6 py-4 ${event.featured ? 'bg-blue-50 rounded-r-xl pr-4' : ''}`}
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    <p className="text-sm text-gray-600 mb-3 font-medium">{event.location}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                    {event.featured && (
                      <div className="mt-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          FEATURED EVENT
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-900">
                <Tag className="h-6 w-6 text-blue-600 mr-3" />
                Categories
              </h3>
              <div className="space-y-3">
                {['Buying Tips', 'Events', 'Maintenance', 'News', 'Financing', 'General'].map((category) => {
                  const count = posts.filter((post) => post.category === category).length;
                  return (
                    <div
                      key={category}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-300"
                    >
                      <span className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium">{category}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6 leading-relaxed">Get the latest news and updates from the Nellis Boulevard auto community.</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-blue-900 hover:bg-gray-100 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-900">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
                Community Stats
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Active Dealerships</span>
                  <span className="font-bold text-2xl text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Vehicles Available</span>
                  <span className="font-bold text-2xl text-green-600">150+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Service Centers</span>
                  <span className="font-bold text-2xl text-purple-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Happy Customers</span>
                  <span className="font-bold text-2xl text-red-600">2,500+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Respectful Communication</h3>
              <p className="text-gray-600 leading-relaxed">Maintain a professional and respectful tone in all interactions with community members</p>
            </div>
            <div className="text-center group">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Authentic Reviews</h3>
              <p className="text-gray-600 leading-relaxed">Share honest experiences to help fellow community members make informed decisions</p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Tag className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Relevant Content</h3>
              <p className="text-gray-600 leading-relaxed">Keep discussions focused on automotive topics and local community interests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Post Details */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {modalLoading ? (
              <div className="p-8 text-center">
                <div className="text-xl font-semibold text-gray-700">Loading post...</div>
              </div>
            ) : (
              <>
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="p-8">
                  {selectedPost.image && (
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-48 object-cover rounded-xl mb-6"
                    />
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(selectedPost.category)}`}>
                      {selectedPost.category}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{selectedPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">{selectedPost.title}</h2>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div
                    className="text-gray-700 leading-relaxed text-lg prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;

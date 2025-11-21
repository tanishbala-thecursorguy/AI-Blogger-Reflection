import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { BookOpen, Calendar, User, Search, Tag, ArrowRight, TrendingUp } from 'lucide-react';

const articles = [
  {
    id: '1',
    title: 'The Power of Surrender: Letting Go and Letting God',
    excerpt: 'Discover how true freedom comes when we surrender our will to God\'s perfect plan. Learn practical steps to living a life of holy surrender.',
    image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=600',
    category: 'Spiritual Growth',
    author: 'Fr. James Divine',
    date: 'November 15, 2024',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Experiencing Divine Mercy in Your Brokenness',
    excerpt: 'No matter how broken you feel, God\'s mercy is greater. Learn how to receive His healing touch and walk in complete forgiveness.',
    image: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=600',
    category: 'Healing',
    author: 'Sr. Mary Grace',
    date: 'November 12, 2024',
    readTime: '10 min read',
  },
  {
    id: '3',
    title: 'Prayer That Moves Mountains: Biblical Intercession',
    excerpt: 'Unlock the power of effective prayer through biblical principles. Discover how to pray with faith and see God move in mighty ways.',
    image: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=600',
    category: 'Prayer',
    author: 'Br. Michael Hope',
    date: 'November 8, 2024',
    readTime: '12 min read',
  },
  {
    id: '4',
    title: 'Finding God in the Midst of Suffering',
    excerpt: 'When life brings pain and hardship, where is God? Explore how suffering can become a place of deep encounter with Christ.',
    image: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=600',
    category: 'Faith',
    author: 'Sr. Sarah Light',
    date: 'November 5, 2024',
    readTime: '9 min read',
  },
  {
    id: '5',
    title: 'The Eucharist: Source and Summit of Christian Life',
    excerpt: 'Rediscover the profound mystery and power of the Eucharist. Learn how to receive Holy Communion with greater devotion and fruit.',
    image: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=600',
    category: 'Sacraments',
    author: 'Fr. James Divine',
    date: 'November 1, 2024',
    readTime: '11 min read',
  },
  {
    id: '6',
    title: 'Breaking Free from Generational Bondage',
    excerpt: 'Discover how to identify and break free from generational curses and patterns through the power of Christ\'s redemption.',
    image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=600',
    category: 'Deliverance',
    author: 'Br. Michael Hope',
    date: 'October 28, 2024',
    readTime: '13 min read',
  },
];

const categories = ['All', 'Spiritual Growth', 'Healing', 'Prayer', 'Faith', 'Sacraments', 'Deliverance', 'Family'];

const featuredArticle = articles[0];

export function SoulFood() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A937]/90 to-[#A7C7E7]/90" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-white">Soul Food</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Spiritual nourishment for your journey. Biblical teachings, reflections, and insights to help you grow deeper in your faith.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#D4A937] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-[#D4A937]" />
            <h3 className="text-gray-900">Featured Article</h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/soul-food/${featuredArticle.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative h-[400px] lg:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#D4A937] text-white rounded-full text-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </div>
                  </div>

                  <h2 className="mb-4 text-gray-900 group-hover:text-[#D4A937] transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {featuredArticle.author}
                    </div>

                    <span className="text-[#D4A937] inline-flex items-center group-hover:gap-2 transition-all">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title={selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            subtitle={`${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'} found`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/soul-food/${article.id}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#D4A937] text-white text-xs rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>

                      <h3 className="mb-3 text-gray-900 group-hover:text-[#D4A937] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{article.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span className="text-xs">{article.author}</span>
                        </div>

                        <span className="text-[#D4A937] text-sm inline-flex items-center group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No articles found matching your search.</p>
            </div>
          )}

          {filteredArticles.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="hover:bg-[#D4A937] hover:text-white hover:border-[#D4A937]">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-[#D4A937] to-[#A7C7E7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="mb-6 text-white">Get Soul Food Delivered to Your Inbox</h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe to receive our latest articles, teachings, and spiritual insights directly in your email.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white"
                />
                <Button className="bg-white text-[#D4A937] hover:bg-gray-100 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

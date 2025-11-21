import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { VideoGrid } from '../components/VideoGrid';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Play, Radio, Video, Music, Book, Podcast, Youtube, Tv } from 'lucide-react';

const livePrograms = [
  { id: '1', title: 'Sunday Holy Mass', time: 'Every Sunday, 9:00 AM', status: 'Live Now' },
  { id: '2', title: 'Daily Rosary', time: 'Every Day, 6:00 PM', status: 'Upcoming' },
  { id: '3', title: 'Saturday Prayer Meeting', time: 'Every Saturday, 7:00 PM', status: 'Upcoming' },
  { id: '4', title: 'Divine Mercy Chaplet', time: 'Every Day, 3:00 PM', status: 'Upcoming' },
];

const videoCategories = {
  all: [
    { id: '1', title: 'Sunday Holy Mass - Nov 17', thumbnail: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400', duration: '1:15:20', category: 'Mass' },
    { id: '2', title: 'The Power of Forgiveness', thumbnail: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400', duration: '45:30', category: 'Teaching' },
    { id: '3', title: 'Healing Worship Night', thumbnail: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400', duration: '1:32:15', category: 'Worship' },
    { id: '4', title: 'Miracle Testimonies', thumbnail: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=400', duration: '28:40', category: 'Testimony' },
    { id: '5', title: 'Holy Rosary Meditation', thumbnail: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=400', duration: '52:10', category: 'Prayer' },
    { id: '6', title: 'Youth Revival Conference', thumbnail: 'https://images.unsplash.com/photo-1759860708866-fd6464a7788f?w=400', duration: '2:05:25', category: 'Youth' },
    { id: '7', title: 'Breaking Generational Curses', thumbnail: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400', duration: '55:12', category: 'Deliverance' },
    { id: '8', title: 'Family Blessing Service', thumbnail: 'https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=400', duration: '38:45', category: 'Family' },
  ],
  masses: [
    { id: '1', title: 'Sunday Holy Mass - Nov 17', thumbnail: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400', duration: '1:15:20', category: 'Mass' },
    { id: '9', title: 'Daily Mass - Nov 16', thumbnail: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400', duration: '45:10', category: 'Mass' },
  ],
  teachings: [
    { id: '2', title: 'The Power of Forgiveness', thumbnail: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400', duration: '45:30', category: 'Teaching' },
    { id: '7', title: 'Breaking Generational Curses', thumbnail: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400', duration: '55:12', category: 'Deliverance' },
  ],
  worship: [
    { id: '3', title: 'Healing Worship Night', thumbnail: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400', duration: '1:32:15', category: 'Worship' },
  ],
  prayer: [
    { id: '5', title: 'Holy Rosary Meditation', thumbnail: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=400', duration: '52:10', category: 'Prayer' },
  ],
};

const podcasts = [
  { title: 'Faith Conversations', episodes: 52, image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=300' },
  { title: 'Daily Devotional', episodes: 365, image: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=300' },
  { title: 'Healing Stories', episodes: 28, image: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=300' },
  { title: 'Bible Study Series', episodes: 104, image: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=300' },
];

export function Media() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1572510351551-116302e7b118?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-purple-600/90" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-white">Broadcasting Live</span>
            </div>
            <h1 className="mb-6 text-white">Media Ministry</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Spreading the Gospel to every nation through television, internet, and digital media
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Streaming Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Watch Live"
            subtitle="Join our services and prayer meetings from anywhere in the world"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Play className="w-12 h-12" fill="white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full mb-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm">LIVE NOW</span>
                  </div>
                  <h3 className="mb-2">Sunday Holy Mass</h3>
                  <p className="text-white/80">Click to join the live stream</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {livePrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center flex-shrink-0">
                        <Radio className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 group-hover:text-[#D4A937] transition-colors">
                          {program.title}
                        </h4>
                        <p className="text-sm text-gray-600">{program.time}</p>
                      </div>
                    </div>
                    <div>
                      {program.status === 'Live Now' ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Live
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">{program.status}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white">
              <Radio className="w-4 h-4 mr-2" />
              View Full Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* Video Library */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Video Library"
            subtitle="Browse our collection of masses, teachings, worship, and more"
            centered
          />

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 max-w-3xl mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="masses">Masses</TabsTrigger>
              <TabsTrigger value="teachings">Teachings</TabsTrigger>
              <TabsTrigger value="worship">Worship</TabsTrigger>
              <TabsTrigger value="prayer">Prayer</TabsTrigger>
            </TabsList>

            {Object.entries(videoCategories).map(([category, videos]) => (
              <TabsContent key={category} value={category}>
                <VideoGrid videos={videos} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* TV & Broadcast */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="TV & Broadcast Partners"
            subtitle="Watch us on television and streaming platforms worldwide"
            centered
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'YouTube', icon: Youtube, subscribers: '2.5M' },
              { name: 'Cable TV', icon: Tv, subscribers: 'Channel 25' },
              { name: 'Faith Network', icon: Video, subscribers: 'Daily' },
              { name: 'Roku TV', icon: Tv, subscribers: 'Live' },
              { name: 'Apple TV', icon: Video, subscribers: 'On Demand' },
              { name: 'Streaming', icon: Radio, subscribers: '24/7' },
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-3">
                  <platform.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-gray-900 mb-1">{platform.name}</h4>
                <p className="text-sm text-gray-600">{platform.subscribers}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Podcasts"
            subtitle="Listen to our audio content anytime, anywhere"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {podcasts.map((podcast, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 aspect-square">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4A937] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Podcast className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="text-gray-900 mb-1 group-hover:text-[#D4A937] transition-colors">
                  {podcast.title}
                </h4>
                <p className="text-sm text-gray-600">{podcast.episodes} Episodes</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-white">Never Miss a Broadcast</h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe to our channel and enable notifications to stay connected with our live streams, new teachings, and special programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Music className="w-5 h-5 mr-2" />
                Follow Podcast
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

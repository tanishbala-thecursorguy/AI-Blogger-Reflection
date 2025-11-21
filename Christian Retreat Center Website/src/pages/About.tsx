import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Heart, Users, Globe, BookOpen, Award, Target } from 'lucide-react';

const leaders = [
  {
    name: 'Fr. James Divine',
    role: 'Founder & Director',
    image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400',
    bio: 'Called to ministry over 30 years ago, Fr. James has led thousands to Christ through powerful preaching and healing ministry.',
  },
  {
    name: 'Sr. Mary Grace',
    role: 'Retreat Coordinator',
    image: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=400',
    bio: 'With a heart for souls and gift of intercession, Sr. Mary oversees all retreat programs with love and dedication.',
  },
  {
    name: 'Br. Michael Hope',
    role: 'Media Ministry Head',
    image: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400',
    bio: 'Leading our digital outreach, Br. Michael ensures the Gospel reaches millions through modern media platforms.',
  },
  {
    name: 'Sr. Sarah Light',
    role: 'Charitable Works Director',
    image: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=400',
    bio: 'Compassionate servant of the poor, Sr. Sarah coordinates all our charitable initiatives with Christ-like love.',
  },
];

const timeline = [
  { year: '1990', event: 'Foundation', description: 'Small prayer group begins meeting weekly in a humble chapel.' },
  { year: '1995', event: 'First Retreat', description: 'Successfully hosted our first weekend retreat with 50 attendees.' },
  { year: '2000', event: 'Centre Expansion', description: 'Purchased land and built the main retreat center building.' },
  { year: '2005', event: 'Media Ministry Launch', description: 'Started broadcasting Sunday Mass on local television.' },
  { year: '2010', event: 'International Reach', description: 'Began hosting international retreats and global broadcasts.' },
  { year: '2015', event: 'Charitable Works', description: 'Opened our first home for the elderly and orphanage.' },
  { year: '2020', event: 'Digital Transformation', description: 'Launched online retreats and 24/7 streaming services.' },
  { year: '2024', event: 'Touching Millions', description: 'Now reaching over 5 million viewers monthly worldwide.' },
];

const stats = [
  { icon: Users, number: '50,000+', label: 'Retreat Attendees Annually' },
  { icon: Globe, number: '5M+', label: 'Monthly Viewers Worldwide' },
  { icon: Heart, number: '2,000+', label: 'Families Supported' },
  { icon: BookOpen, number: '10,000+', label: 'Lives Transformed' },
];

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-4 text-white">About Divine Retreat Centre</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              A sanctuary where souls encounter God's transforming love and experience divine healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#D4A937]/10 to-[#A7C7E7]/10 rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4A937] flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To lead souls to Jesus Christ through the power of the Holy Spirit, bringing healing, deliverance, and transformation to all who seek God's face.
              </p>
              <p className="text-gray-700">
                We are committed to proclaiming the Gospel with boldness, serving the poor with compassion, and creating spaces where people can encounter God's presence in powerful ways.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#D4A937]/10 rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-full bg-[#A7C7E7] flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-4 text-gray-900">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                To be a beacon of hope and healing, touching millions of lives worldwide through Spirit-filled ministry, media outreach, and charitable works.
              </p>
              <p className="text-gray-700">
                We envision a world where every person has the opportunity to experience God's unconditional love, where the Gospel transforms communities, and where the Church rises in power and unity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Impact"
            subtitle="By God's grace, we've been privileged to serve His people in remarkable ways"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-gray-900">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Journey"
            subtitle="From humble beginnings to global ministry - God's faithfulness through the years"
            centered
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4A937] to-[#A7C7E7]" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
                    <div className="inline-block px-4 py-2 bg-[#D4A937] text-white rounded-full mb-3">
                      {item.year}
                    </div>
                    <h3 className="mb-2 text-gray-900">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4A937] border-4 border-white shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Leaders */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Spiritual Leaders"
            subtitle="Servants of God called to shepherd and guide His people"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <ImageWithFallback
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="mb-1 text-gray-900">{leader.name}</h4>
                  <p className="text-sm text-[#D4A937] mb-3">{leader.role}</p>
                  <p className="text-sm text-gray-600">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Centers & Branches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Centers & Branches"
            subtitle="Serving communities across the globe"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-6 text-gray-900">Global Presence</h3>
              <div className="space-y-4">
                {[
                  { location: 'Main Center - Holy City', details: '123 Divine Way, HC 12345' },
                  { location: 'North Branch - Grace Valley', details: '456 Faith Street, GV 67890' },
                  { location: 'South Center - Hope Springs', details: '789 Prayer Road, HS 13579' },
                  { location: 'International Hub - New Light', details: '321 Mercy Ave, NL 24680' },
                ].map((center, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-[#A7C7E7] flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">{center.location}</h4>
                      <p className="text-sm text-gray-600">{center.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-200 rounded-2xl overflow-hidden h-[500px] flex items-center justify-center"
            >
              <p className="text-gray-500">[Interactive Map Placeholder]</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Photo Gallery"
            subtitle="Glimpses of God's work in our midst"
            centered
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400',
              'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400',
              'https://images.unsplash.com/photo-1649610047527-583571186f50?w=400',
              'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=400',
              'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400',
              'https://images.unsplash.com/photo-1759860708866-fd6464a7788f?w=400',
              'https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=400',
              'https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=400',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

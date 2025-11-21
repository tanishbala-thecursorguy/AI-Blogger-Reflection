import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Home, 
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const retreats = [
  {
    id: 'inner-healing',
    title: 'Inner Healing Retreat',
    description: 'Experience deep emotional and spiritual healing as God touches the wounded places of your heart.',
    image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=600',
    duration: '5 Days',
    nextDate: 'Dec 15-19, 2024',
    icon: Heart,
    highlights: ['Healing Prayer', 'Deliverance Ministry', 'Counseling Sessions', 'Mass & Adoration'],
  },
  {
    id: 'youth',
    title: 'Youth Retreat',
    description: 'A powerful encounter with God designed specifically for young adults seeking purpose and direction.',
    image: 'https://images.unsplash.com/photo-1759860708866-fd6464a7788f?w=600',
    duration: '3 Days',
    nextDate: 'Dec 20-22, 2024',
    icon: Users,
    highlights: ['Dynamic Worship', 'Youth Talks', 'Small Groups', 'Adventure Activities'],
  },
  {
    id: 'couples',
    title: 'Couples Retreat',
    description: 'Strengthen your marriage and rediscover the love that brought you together through God\'s grace.',
    image: 'https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=600',
    duration: '4 Days',
    nextDate: 'Jan 10-13, 2025',
    icon: Heart,
    highlights: ['Marriage Enrichment', 'Communication Skills', 'Prayer Together', 'Romantic Renewal'],
  },
  {
    id: 'family',
    title: 'Family Renewal Retreat',
    description: 'Bring your entire family for a transformative experience that strengthens family bonds.',
    image: 'https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=600',
    duration: '3 Days',
    nextDate: 'Jan 25-27, 2025',
    icon: Home,
    highlights: ['Family Prayer', 'Kids Programs', 'Parenting Sessions', 'Recreation Time'],
  },
  {
    id: 'bible-study',
    title: 'Bible Study Retreat',
    description: 'Dive deep into God\'s Word with guided study, teaching, and Spirit-led revelation.',
    image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=600',
    duration: '7 Days',
    nextDate: 'Feb 5-11, 2025',
    icon: BookOpen,
    highlights: ['Scripture Study', 'Teaching Sessions', 'Group Discussion', 'Personal Reflection'],
  },
  {
    id: 'one-day',
    title: 'One-Day Retreat',
    description: 'A mini retreat perfect for busy schedules - experience refreshment in just one day.',
    image: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=600',
    duration: '1 Day',
    nextDate: 'Every Saturday',
    icon: Clock,
    highlights: ['Morning Prayer', 'Teaching', 'Holy Mass', 'Fellowship'],
  },
];

const benefits = [
  { icon: Heart, title: 'Spiritual Renewal', description: 'Experience fresh encounter with God\'s presence' },
  { icon: Users, title: 'Community', description: 'Build lasting friendships with fellow believers' },
  { icon: BookOpen, title: 'Biblical Teaching', description: 'Receive sound doctrine and spiritual nourishment' },
  { icon: CheckCircle, title: 'Personal Growth', description: 'Grow in faith, character, and purpose' },
];

export function Retreats() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900">
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
            className="max-w-4xl"
          >
            <h1 className="mb-6 text-white">Spiritual Retreats</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 italic">
              "Come to me, all you who are weary and burdened, and I will give you rest."
            </p>
            <p className="text-[#D4A937]">— Matthew 11:28</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-gray-900">Step Away From the Noise</h2>
            <p className="text-lg text-gray-700 mb-4">
              In our busy, distracted world, taking time to retreat with God is not a luxury—it's a necessity. Our retreats provide a sacred space where you can disconnect from the chaos and reconnect with your Creator.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're seeking healing, direction, restoration, or simply a deeper relationship with God, we have a retreat designed for your journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="What You'll Experience"
            subtitle="Every retreat is designed to bring transformation and renewal"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="mb-2 text-gray-900">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreats Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Retreat Programs"
            subtitle="Find the perfect retreat for your spiritual needs"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {retreats.map((retreat, index) => (
              <motion.div
                key={retreat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/retreats/${retreat.id}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={retreat.image}
                        alt={retreat.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white text-sm mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{retreat.nextDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{retreat.duration}</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#D4A937] flex items-center justify-center">
                        <retreat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-3 text-gray-900 group-hover:text-[#D4A937] transition-colors">
                        {retreat.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{retreat.description}</p>

                      <div className="space-y-2 mb-6">
                        {retreat.highlights.slice(0, 3).map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-[#D4A937] flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#D4A937] inline-flex items-center group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-gray-900">Our Retreat Center</h2>
              <p className="text-gray-700 mb-6">
                Nestled in peaceful surroundings, our retreat center offers comfortable accommodations, beautiful prayer spaces, and all the amenities needed for a transformative spiritual experience.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-[#D4A937] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">123 Divine Way, Holy City, HC 12345</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Home className="w-6 h-6 text-[#D4A937] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-gray-900 mb-1">Facilities</h4>
                    <p className="text-gray-600">
                      Private rooms, chapel, dining hall, conference rooms, prayer garden, bookstore
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-[#D4A937] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-gray-900 mb-1">Includes</h4>
                    <p className="text-gray-600">
                      Accommodation, all meals, teaching materials, prayer ministry
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                View Virtual Tour
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=800"
                alt="Retreat Center"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D4A937] to-[#A7C7E7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-white">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-white/90 mb-8">
              Don't wait another day to experience the transformation you've been longing for. Register for a retreat today and prepare to encounter God in a powerful new way.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#D4A937] hover:bg-gray-100">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#D4A937]"
              >
                Contact Us for Questions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

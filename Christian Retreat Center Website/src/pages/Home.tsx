import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { MinistryCard } from '../components/MinistryCard';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { VideoGrid } from '../components/VideoGrid';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  Heart, 
  Users, 
  Video, 
  HandHeart, 
  Calendar,
  ArrowRight,
  Play,
  BookOpen,
  Clock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldWNoYXJpc3QlMjBob2x5JTIwY29tbXVuaW9ufGVufDF8fHx8MTc2MzY1ODAyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Come and Rest in His Presence',
    quote: 'The Spirit of the Lord is upon me… He anointed me to preach the gospel to the poor.',
    verse: 'Luke 4:18',
  },
  {
    image: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwcHJheWVyfGVufDF8fHx8MTc2MzU2MzI5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Experience Divine Healing',
    quote: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    verse: 'Matthew 11:28',
  },
  {
    image: 'https://images.unsplash.com/photo-1649610047527-583571186f50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBjcm9zcyUyMGxpZ2h0fGVufDF8fHx8MTc2MzY1ODAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Walk in His Light',
    quote: 'I am the light of the world. Whoever follows me will never walk in darkness.',
    verse: 'John 8:12',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'California, USA',
    text: 'The retreat completely transformed my spiritual life. I experienced healing I never thought possible. The love and peace I felt was overwhelming.',
    retreat: 'Inner Healing Retreat 2024',
  },
  {
    name: 'Michael Chen',
    location: 'New York, USA',
    text: 'God touched my heart in ways I cannot describe. The prayers, worship, and teachings opened my eyes to His infinite mercy and grace.',
    retreat: 'Family Renewal Retreat 2024',
  },
  {
    name: 'Maria Rodriguez',
    location: 'Texas, USA',
    text: 'I came broken and left whole. The power of the Holy Spirit moved through every session. This retreat saved my marriage and restored my faith.',
    retreat: 'Couples Retreat 2024',
  },
];

const videos = [
  { id: '1', title: 'Sunday Holy Mass - Live', thumbnail: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400', duration: '1:15:20', category: 'Live' },
  { id: '2', title: 'Power of Prayer & Fasting', thumbnail: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400', duration: '45:30', category: 'Teaching' },
  { id: '3', title: 'Healing Through Worship', thumbnail: 'https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400', duration: '32:15', category: 'Worship' },
  { id: '4', title: 'Testimonies of Miracles', thumbnail: 'https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=400', duration: '28:40', category: 'Testimony' },
  { id: '5', title: 'Holy Rosary Meditation', thumbnail: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=400', duration: '52:10', category: 'Prayer' },
  { id: '6', title: 'Youth Revival Night', thumbnail: 'https://images.unsplash.com/photo-1759860708866-fd6464a7788f?w=400', duration: '1:05:25', category: 'Youth' },
  { id: '7', title: 'Divine Mercy Chaplet', thumbnail: 'https://images.unsplash.com/photo-1640578196942-4f9496cdb80c?w=400', duration: '15:30', category: 'Prayer' },
  { id: '8', title: 'Family Blessing Service', thumbnail: 'https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=400', duration: '38:45', category: 'Family' },
];

export function Home() {
  const [activeDay, setActiveDay] = useState('monday');

  const dailyPromises = {
    monday: {
      title: 'Promise of Provision',
      verse: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.',
      reference: 'Philippians 4:19',
      teaching: 'God\'s Abundant Provision',
    },
    tuesday: {
      title: 'Promise of Peace',
      verse: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.',
      reference: 'John 14:27',
      teaching: 'Walking in Divine Peace',
    },
    wednesday: {
      title: 'Promise of Strength',
      verse: 'I can do all things through Christ who strengthens me.',
      reference: 'Philippians 4:13',
      teaching: 'Supernatural Strength',
    },
    thursday: {
      title: 'Promise of Healing',
      verse: 'He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.',
      reference: '1 Peter 2:24',
      teaching: 'Healing and Restoration',
    },
    friday: {
      title: 'Promise of Victory',
      verse: 'But thanks be to God! He gives us the victory through our Lord Jesus Christ.',
      reference: '1 Corinthians 15:57',
      teaching: 'Living in Victory',
    },
    saturday: {
      title: 'Promise of Guidance',
      verse: 'Trust in the LORD with all your heart and lean not on your own understanding.',
      reference: 'Proverbs 3:5',
      teaching: 'Following His Lead',
    },
    sunday: {
      title: 'Promise of Love',
      verse: 'For God so loved the world that he gave his one and only Son.',
      reference: 'John 3:16',
      teaching: 'The Heart of the Gospel',
    },
  };

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Quick CTA Buttons */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/media" className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F4F6F8] transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <h4 className="text-gray-900 group-hover:text-[#D4A937] transition-colors">Watch Live</h4>
                  <p className="text-sm text-gray-600">Join our services online</p>
                </div>
              </div>
            </Link>

            <Link to="/retreats" className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F4F6F8] transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A937] to-[#B88F2E] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 group-hover:text-[#D4A937] transition-colors">Book Retreat</h4>
                  <p className="text-sm text-gray-600">Find your next spiritual journey</p>
                </div>
              </div>
            </Link>

            <Link to="/donate" className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F4F6F8] transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A7C7E7] to-[#7BA7D7] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 group-hover:text-[#D4A937] transition-colors">Support Us</h4>
                  <p className="text-sm text-gray-600">Partner with our mission</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Ministries"
            subtitle="Discover the different ways we serve God and His people through prayer, retreats, charity, and media outreach."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MinistryCard
              title="Retreats"
              description="Experience spiritual renewal through our life-changing retreat programs designed for individuals, couples, and families."
              image="https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=400"
              icon={Users}
              link="/retreats"
            />
            <MinistryCard
              title="Charities"
              description="Reaching out to the poor, elderly, and marginalized with Christ's love through our various charitable initiatives."
              image="https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=400"
              icon={HandHeart}
              link="/charities"
            />
            <MinistryCard
              title="Media Ministry"
              description="Spreading the Gospel worldwide through live telecasts, teachings, worship music, and digital content."
              image="https://images.unsplash.com/photo-1572510351551-116302e7b118?w=400"
              icon={Video}
              link="/media"
            />
            <MinistryCard
              title="Support Us"
              description="Join us in our mission by becoming a partner through prayer, volunteering, or financial support."
              image="https://images.unsplash.com/photo-1624448445915-97154f5e688c?w=400"
              icon={Heart}
              link="/support"
            />
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=800"
                  alt="Journey of Divine Retreat"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-gray-900">The Journey of Our Retreat Centre</h2>
              <p className="text-gray-700 mb-4">
                What began as a small prayer gathering has blossomed into a worldwide ministry touching millions of lives. Our Divine Retreat Centre was founded on the simple belief that every person deserves to experience the transforming love of Jesus Christ.
              </p>
              <p className="text-gray-700 mb-4">
                Through the power of the Holy Spirit, we've witnessed countless miracles of healing, restoration, and salvation. From broken marriages restored to physical healings, from addictions broken to families reunited - God continues to move powerfully in our midst.
              </p>
              <p className="text-gray-700 mb-6">
                Today, we host thousands of retreatants annually, broadcast to millions worldwide, and serve the poor and needy through our charitable works. Yet our mission remains the same: to lead souls to Christ and to help them experience His infinite mercy and love.
              </p>
              <Link to="/about">
                <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                  Read Our Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonies Section */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Lives Transformed"
            subtitle="Hear from those who have experienced God's miraculous touch through our ministry."
            centered
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Live Updates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#A7C7E7] to-[#7BA7D7] rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <p className="text-sm text-white">Live Event</p>
              </div>
              <h2 className="mb-4 text-white">Join Our Weekly Prayer Meeting</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Experience the power of communal prayer every Saturday from 7:00 PM to 8:00 PM. Join us online from anywhere in the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#A7C7E7] hover:bg-gray-100">
                  <Play className="w-5 h-5 mr-2" />
                  Join on Zoom
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#A7C7E7]">
                  <Clock className="w-5 h-5 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Word Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            title="Promise of the Day"
            subtitle="Receive God's daily promise for your life. Select a day to read the promise and watch the teaching."
            centered
          />

          <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="monday">Mon</TabsTrigger>
              <TabsTrigger value="tuesday">Tue</TabsTrigger>
              <TabsTrigger value="wednesday">Wed</TabsTrigger>
              <TabsTrigger value="thursday">Thu</TabsTrigger>
              <TabsTrigger value="friday">Fri</TabsTrigger>
              <TabsTrigger value="saturday">Sat</TabsTrigger>
              <TabsTrigger value="sunday">Sun</TabsTrigger>
            </TabsList>

            {Object.entries(dailyPromises).map(([day, promise]) => (
              <TabsContent key={day} value={day}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <h3 className="mb-4 text-gray-900">{promise.title}</h3>
                    <p className="text-lg text-gray-700 italic mb-2">"{promise.verse}"</p>
                    <p className="text-[#D4A937]">— {promise.reference}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video cursor-pointer group">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=500"
                        alt="Teaching thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-7 h-7 text-[#D4A937] ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <h4 className="mb-3 text-gray-900">{promise.teaching}</h4>
                      <p className="text-gray-600 mb-4">
                        Watch today's teaching and discover how God's promise applies to your life. Let His word transform your heart and renew your faith.
                      </p>
                      <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white w-full md:w-auto">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Watch Teaching
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Soul Food Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <SectionHeader title="Soul Food" subtitle="Spiritual nourishment for your journey" />
            <Link to="/soul-food">
              <Button variant="outline" className="hidden md:flex">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'The Power of Surrender: Letting Go and Letting God',
                excerpt: 'Discover how true freedom comes when we surrender our will to God\'s perfect plan...',
                image: 'https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=600',
                category: 'Spiritual Growth',
                date: 'November 15, 2024',
              },
              {
                title: 'Experiencing Divine Mercy in Your Brokenness',
                excerpt: 'No matter how broken you feel, God\'s mercy is greater. Learn how to receive His healing touch...',
                image: 'https://images.unsplash.com/photo-1649610047527-583571186f50?w=600',
                category: 'Healing',
                date: 'November 12, 2024',
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to="/soul-food/article" className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#D4A937] text-white text-xs rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                      <h3 className="mb-3 text-gray-900 group-hover:text-[#D4A937] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <span className="text-[#D4A937] inline-flex items-center group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/soul-food">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TV Productions / Videos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <SectionHeader title="Watch Our Programs" subtitle="Explore our TV productions and spiritual content" />
            <Link to="/media">
              <Button variant="outline" className="hidden md:flex">
                View All Videos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <VideoGrid videos={videos} />

          <div className="text-center mt-8">
            <Link to="/media">
              <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                <Video className="w-4 h-4 mr-2" />
                Visit Media Centre
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Begin Your Spiritual Journey Today"
        description="Experience the transforming power of God's love. Join us for a retreat, watch our programs, or support our mission."
        primaryButtonText="Book a Retreat"
        primaryButtonLink="/retreats"
        secondaryButtonText="Support Our Mission"
        secondaryButtonLink="/donate"
        backgroundImage="https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=1200"
      />
    </div>
  );
}

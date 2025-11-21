import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { Button } from '../components/ui/button';
import { Heart, Users, DollarSign, Calendar, Gift, TrendingUp, ArrowRight } from 'lucide-react';

const supportOptions = [
  {
    title: 'Monthly Partner',
    description: 'Join our faithful supporters who give monthly to sustain our ongoing ministry and operations.',
    icon: Calendar,
    amount: 'From $25/month',
    benefits: ['Consistent impact', 'Monthly updates', 'Prayer partner', 'Special events access'],
  },
  {
    title: 'One-Time Gift',
    description: 'Make a single donation to support our general ministry or a specific program of your choice.',
    icon: Heart,
    amount: 'Any amount',
    benefits: ['Immediate impact', 'Tax deductible', 'Choose program', 'Donation receipt'],
  },
  {
    title: 'Sponsor a Retreat',
    description: 'Cover the cost of a retreat for someone who cannot afford it and change their life forever.',
    icon: Users,
    amount: '$450 per person',
    benefits: ['Transform a life', 'Meet beneficiary', 'Personal testimony', 'Eternal impact'],
  },
  {
    title: 'Sponsor a Meal',
    description: 'Provide nutritious meals for our retreat attendees or feed the hungry in our charitable programs.',
    icon: Gift,
    amount: '$10-$100',
    benefits: ['Feed many', 'Practical help', 'Tangible impact', 'Photo updates'],
  },
];

const impactStats = [
  { amount: '$25', impact: 'Feeds 10 families for a day', icon: Gift },
  { amount: '$100', impact: 'Provides medical care for 5 patients', icon: Heart },
  { amount: '$250', impact: 'Sponsors a child\'s education for a term', icon: TrendingUp },
  { amount: '$500', impact: 'Fully sponsors a retreat for someone in need', icon: Users },
];

const testimonials = [
  {
    name: 'Robert Martinez',
    location: 'Texas, USA',
    text: 'Becoming a monthly partner has been one of the best decisions I\'ve made. Knowing that my giving is making a consistent difference in lives around the world fills me with joy.',
    retreat: 'Monthly Partner since 2022',
  },
  {
    name: 'Linda Thompson',
    location: 'California, USA',
    text: 'I sponsored a retreat for a struggling single mother, and seeing her transformation was incredible. She sent me a thank you letter that brought tears to my eyes. Worth every penny!',
    retreat: 'Retreat Sponsor',
  },
];

export function Support() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A937]/90 to-[#A7C7E7]/90" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-white">Support Our Mission</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
              Your generous support enables us to continue spreading the Gospel, healing the broken, and serving the poor. Together, we can reach more souls for Christ.
            </p>
            <p className="text-white/80 italic">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-gray-900">Why Your Support Matters</h2>
            <p className="text-lg text-gray-700 mb-4">
              We are completely supported by the generosity of believers like you. We receive no government funding, no corporate sponsorships—just faithful giving from those who believe in this ministry.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Every dollar you give goes directly toward: hosting life-changing retreats, broadcasting the Gospel worldwide, caring for the poor and marginalized, training leaders, and building God's Kingdom.
            </p>
            <p className="text-lg text-gray-700">
              When you support this ministry, you're not just giving money—you're investing in eternity. You're partnering with us to see lives transformed, families restored, and souls saved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Ways to Support"
            subtitle="Choose the giving option that best fits your heart and budget"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-gray-900">{option.title}</h3>
                    <p className="text-[#D4A937]">{option.amount}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{option.description}</p>

                <div className="space-y-2 mb-6">
                  {option.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A937]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link to="/donate">
                  <Button className="w-full bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                    Choose This Option
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Your Donation at Work"
            subtitle="See the tangible impact of your generosity"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F4F6F8] to-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-gray-900">{stat.amount}</h3>
                <p className="text-gray-700">{stat.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Ministry Statistics 2024"
            subtitle="Your support has helped us achieve incredible impact"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '50,000+', label: 'Retreat Attendees', growth: '+15% from 2023' },
              { number: '5M+', label: 'Monthly Viewers', growth: '+25% from 2023' },
              { number: '2,000+', label: 'Families Helped', growth: '+20% from 2023' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <h2 className="mb-2 text-gray-900">{stat.number}</h2>
                <p className="mb-3 text-gray-700">{stat.label}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  {stat.growth}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-[#D4A937]/10 to-[#A7C7E7]/10 p-8 rounded-xl"
          >
            <h3 className="text-center mb-6 text-gray-900">Financial Transparency</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl mb-2 text-gray-900">75%</div>
                <p className="text-sm text-gray-600">Direct Ministry Programs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2 text-gray-900">15%</div>
                <p className="text-sm text-gray-600">Operations & Administration</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2 text-gray-900">10%</div>
                <p className="text-sm text-gray-600">Fundraising & Development</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="From Our Partners"
            subtitle="Hear from those who support this ministry"
            centered
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Other Ways to Support"
            subtitle="Additional opportunities to partner with us"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Legacy Giving', description: 'Include us in your will or estate planning to leave a lasting impact.' },
              { title: 'Stock Donations', description: 'Donate appreciated stocks for maximum tax benefits.' },
              { title: 'Corporate Matching', description: 'Double your impact through your employer\'s matching program.' },
              { title: 'In-Kind Donations', description: 'Donate goods, services, or property to support our work.' },
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="mb-2 text-gray-900">{option.title}</h4>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <button className="text-[#D4A937] hover:underline text-sm inline-flex items-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4A937] to-[#A7C7E7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-white">Start Making a Difference Today</h2>
            <p className="text-lg text-white/90 mb-8">
              Your gift—no matter the size—makes an eternal difference. Join thousands of partners who are helping us change lives and advance God's Kingdom.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-[#D4A937] hover:bg-gray-100">
                  <Heart className="w-5 h-5 mr-2" />
                  Give Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#D4A937]"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

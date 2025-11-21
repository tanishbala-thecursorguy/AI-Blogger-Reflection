import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Heart, Calendar, Clock, Users, CheckCircle, MapPin } from 'lucide-react';

const schedule = [
  { time: '8:00 AM', activity: 'Morning Prayer & Meditation', description: 'Begin the day in God\'s presence' },
  { time: '9:00 AM', activity: 'Breakfast & Fellowship', description: 'Share meals together in community' },
  { time: '10:30 AM', activity: 'Teaching Session', description: 'Biblical foundations for inner healing' },
  { time: '12:30 PM', activity: 'Holy Mass', description: 'Encounter Christ in the Eucharist' },
  { time: '1:30 PM', activity: 'Lunch & Rest', description: 'Time for personal reflection' },
  { time: '3:30 PM', activity: 'Prayer Ministry', description: 'Individual healing prayer sessions' },
  { time: '6:00 PM', activity: 'Praise & Worship', description: 'Corporate worship and intercession' },
  { time: '7:00 PM', activity: 'Dinner', description: 'Evening meal together' },
  { time: '8:30 PM', activity: 'Night Adoration', description: 'Quiet time before the Blessed Sacrament' },
];

const benefits = [
  'Deep emotional and spiritual healing',
  'Freedom from past wounds and trauma',
  'Restoration of broken relationships',
  'Deliverance from bondage and addiction',
  'Renewed sense of identity in Christ',
  'Tools for ongoing spiritual growth',
  'Personal prayer ministry sessions',
  'Community support and fellowship',
];

const testimonials = [
  {
    name: 'Jennifer Williams',
    location: 'Florida, USA',
    text: 'I arrived broken and hurting from years of abuse. Through this retreat, God healed wounds I didn\'t even know I had. I left a completely different person—free, whole, and filled with joy.',
    retreat: 'Inner Healing Retreat, March 2024',
  },
  {
    name: 'David Thompson',
    location: 'Ohio, USA',
    text: 'The healing I experienced was beyond anything I could have imagined. God touched the deepest parts of my heart and set me free from shame and guilt I\'d carried for decades.',
    retreat: 'Inner Healing Retreat, June 2024',
  },
  {
    name: 'Maria Santos',
    location: 'California, USA',
    text: 'This retreat saved my life. I was on the verge of giving up when I came here. The love, prayers, and ministry I received gave me hope again. God is so faithful!',
    retreat: 'Inner Healing Retreat, September 2024',
  },
];

export function InnerHealingRetreat() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900">
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
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <p className="text-sm text-white">5-Day Healing Journey</p>
            </div>
            <h1 className="mb-6 text-white">Inner Healing Retreat</h1>
            <p className="text-xl text-white/90 mb-8">
              Experience deep emotional and spiritual healing as God touches the wounded places of your heart and sets you free.
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Next: Dec 15-19, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>5 Days / 4 Nights</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Divine Retreat Center</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-6 text-gray-900">A Journey to Wholeness</h2>
            <p className="text-lg text-gray-700 mb-4">
              Are you carrying wounds from your past? Do painful memories or broken relationships continue to affect your present? God wants to heal you and set you free. This retreat is designed to bring deep healing to your heart, mind, and soul.
            </p>
            <p className="text-lg text-gray-700">
              Through powerful teaching, anointed prayer ministry, and the sacraments, you will encounter God's healing love in ways you never thought possible. Come as you are—broken, hurting, weary—and leave transformed, restored, and whole.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Healing Prayer', description: 'Experience God\'s touch through personal ministry' },
              { icon: Users, title: 'Small Groups', description: 'Share and heal in safe community' },
              { icon: CheckCircle, title: 'Lasting Freedom', description: 'Receive tools for continued wholeness' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F4F6F8] to-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Receive */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="What You Will Receive"
            subtitle="This retreat includes everything you need for deep transformation"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-5 h-5 text-[#D4A937] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Daily Schedule"
            subtitle="A typical day at the Inner Healing Retreat"
            centered
          />

          <div className="space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="px-4 py-2 bg-[#D4A937] text-white rounded-lg inline-block">
                      <Clock className="w-4 h-4 inline mr-2" />
                      {item.time}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.activity}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Testimonies of Healing"
            subtitle="Hear from those whose lives have been transformed"
            centered
          />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            title="Register for This Retreat"
            subtitle="Take the first step toward healing and wholeness"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="John" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-2" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="mt-2" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" required />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street address" className="mt-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name & Phone *</Label>
                <Input id="emergencyContact" placeholder="Name and phone number" className="mt-2" required />
              </div>

              <div>
                <Label htmlFor="prayerRequests">Prayer Requests (Optional)</Label>
                <Textarea
                  id="prayerRequests"
                  placeholder="Share any specific areas where you need healing or prayer..."
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="specialNeeds">Special Needs or Dietary Restrictions</Label>
                <Textarea
                  id="specialNeeds"
                  placeholder="Please let us know of any accommodations you might need..."
                  className="mt-2"
                />
              </div>

              <div className="bg-[#F4F6F8] p-6 rounded-xl">
                <h4 className="mb-3 text-gray-900">Retreat Fee: $450</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Includes: Accommodation, all meals, teaching materials, prayer ministry, and retreat resources.
                </p>
                <p className="text-sm text-gray-600">
                  Financial assistance available for those in need. Please contact us for more information.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1 bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                  Register Now
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By registering, you agree to our terms and conditions. We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#A7C7E7] to-[#D4A937]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-white">Questions About This Retreat?</h2>
            <p className="text-lg text-white/90 mb-8">
              We're here to help! Contact our retreat team for any questions about schedule, accommodations, or special needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#A7C7E7] hover:bg-gray-100">
                Contact Retreat Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#A7C7E7]"
              >
                View All Retreats
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

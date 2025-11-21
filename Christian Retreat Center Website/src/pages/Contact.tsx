import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@divineretreats.org', 'retreats@divineretreats.org', 'support@divineretreats.org'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (123) 456-7890', '+1 (123) 456-7891', 'Toll-free: 1-800-DIVINE-1'],
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Divine Way', 'Holy City, HC 12345', 'United States'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 10:00 AM - 3:00 PM', 'Sunday: Closed'],
  },
];

const departments = [
  { name: 'General Inquiries', email: 'info@divineretreats.org' },
  { name: 'Retreat Registration', email: 'retreats@divineretreats.org' },
  { name: 'Media Ministry', email: 'media@divineretreats.org' },
  { name: 'Charitable Works', email: 'charities@divineretreats.org' },
  { name: 'Donations & Support', email: 'support@divineretreats.org' },
  { name: 'Technical Support', email: 'tech@divineretreats.org' },
];

export function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1763410723546-db98ef034af5?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A937]/90 to-[#A7C7E7]/90" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-white">Get In Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions, prayer requests, or want to learn more about our ministry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SectionHeader
                title="Send Us a Message"
                subtitle="Fill out the form and we'll get back to you within 24 hours"
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help you?" className="mt-2" required />
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <select
                      id="department"
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A937] focus:border-transparent"
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.name} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="mt-2 min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="prayerRequest" className="mt-1 rounded border-gray-300" />
                    <label htmlFor="prayerRequest" className="text-sm text-gray-600">
                      This is a prayer request. I would like the prayer team to pray for this intention.
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We'll never share your information with third parties. See our privacy policy.
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <SectionHeader title="Contact Information" />

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#F4F6F8] to-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-gray-900">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-[#D4A937]/10 to-[#A7C7E7]/10 p-6 rounded-xl"
              >
                <h4 className="mb-4 text-gray-900">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#D4A937] hover:text-white transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#D4A937] hover:text-white transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#D4A937] hover:text-white transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#D4A937] hover:text-white transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Find Us"
            subtitle="Visit our retreat center and experience God's presence"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-300 rounded-2xl overflow-hidden h-[500px] flex items-center justify-center shadow-xl"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">[Google Maps Embed Placeholder]</p>
              <p className="text-sm text-gray-500 mt-2">123 Divine Way, Holy City, HC 12345</p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Department Directory"
            subtitle="Contact specific departments directly"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-gray-900 mb-2">{dept.name}</h4>
                <a href={`mailto:${dept.email}`} className="text-sm text-[#D4A937] hover:underline">
                  {dept.email}
                </a>
              </motion.div>
            ))}
          </div>
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
            <h2 className="mb-6 text-white">Have an Urgent Prayer Request?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our prayer team is available 24/7 to lift up your needs before God. You can call our prayer line anytime.
            </p>
            <Button size="lg" className="bg-white text-[#A7C7E7] hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call Prayer Line: 1-800-PRAY-NOW
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

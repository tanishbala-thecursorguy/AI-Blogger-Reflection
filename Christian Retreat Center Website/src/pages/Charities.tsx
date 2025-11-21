import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Heart, Users, Home, GraduationCap, Stethoscope, HandHeart, ArrowRight, FileText } from 'lucide-react';

const programs = [
  {
    title: 'Elderly Care Home',
    description: 'Providing loving care, shelter, and dignity to senior citizens who have nowhere else to turn.',
    image: 'https://images.unsplash.com/photo-1559234938-b60fff04894d?w=600',
    icon: Heart,
    stats: { served: '150+', stat: 'Seniors Cared For' },
  },
  {
    title: 'Orphan Support',
    description: 'Giving hope and a future to children without families through education, shelter, and love.',
    image: 'https://images.unsplash.com/photo-1603623992651-03e9de573dce?w=600',
    icon: Users,
    stats: { served: '200+', stat: 'Children Supported' },
  },
  {
    title: 'Medical Aid Missions',
    description: 'Bringing healthcare to remote communities and supporting those who cannot afford medical treatment.',
    image: 'https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=600',
    icon: Stethoscope,
    stats: { served: '5,000+', stat: 'Patients Treated' },
  },
  {
    title: 'Education Support',
    description: 'Empowering children through scholarships, school supplies, and educational programs.',
    image: 'https://images.unsplash.com/photo-1603623992651-03e9de573dce?w=600',
    icon: GraduationCap,
    stats: { served: '500+', stat: 'Students Sponsored' },
  },
  {
    title: 'Housing for Homeless',
    description: 'Providing temporary shelter and rehabilitation for those living on the streets.',
    image: 'https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=600',
    icon: Home,
    stats: { served: '300+', stat: 'People Housed' },
  },
  {
    title: 'Food Distribution',
    description: 'Feeding the hungry through daily meal programs and food bank services.',
    image: 'https://images.unsplash.com/photo-1759709042164-0dd78a39028b?w=600',
    icon: HandHeart,
    stats: { served: '10,000+', stat: 'Meals Served Monthly' },
  },
];

const impactStats = [
  { number: '2,000+', label: 'Families Supported', icon: Users },
  { number: '$2M+', label: 'Aid Distributed', icon: Heart },
  { number: '50+', label: 'Partner Organizations', icon: HandHeart },
  { number: '15', label: 'Years of Service', icon: GraduationCap },
];

export function Charities() {
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
            <h1 className="mb-6 text-white">Charitable Works</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 italic max-w-3xl mx-auto">
              "Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me."
            </p>
            <p className="text-white">— Matthew 25:40</p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-gray-900">Serving Christ in the Poor</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our charitable mission is rooted in the Gospel call to serve "the least of these." We believe that when we care for the poor, sick, elderly, and marginalized, we are serving Christ Himself.
            </p>
            <p className="text-lg text-gray-700">
              Through your generous support, we are able to bring hope, healing, and practical help to thousands who are suffering. Every gift makes an eternal difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Impact"
            subtitle="Together, we're making a difference in countless lives"
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

      {/* Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Charitable Programs"
            subtitle="Comprehensive care for those in need"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <p className="text-2xl mb-1">{program.stats.served}</p>
                      <p className="text-sm text-white/90">{program.stats.stat}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#D4A937] flex items-center justify-center">
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-gray-900 group-hover:text-[#D4A937] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <Button variant="outline" className="w-full group-hover:bg-[#D4A937] group-hover:text-white group-hover:border-[#D4A937]">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559234938-b60fff04894d?w=800"
                alt="Charity work"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-gray-900">A Story of Hope</h2>
              <p className="text-gray-700 mb-4">
                Maria was abandoned by her family at age 75, living on the streets with nowhere to go. When she came to our elderly care home, she was broken, sick, and had lost all hope.
              </p>
              <p className="text-gray-700 mb-4">
                Today, Maria is healthy, joyful, and surrounded by loving caregivers who treat her with dignity. She says, "I thought my life was over, but God gave me a new family and a reason to smile again."
              </p>
              <p className="text-gray-700 mb-6">
                This is just one of thousands of stories made possible by your generous support. Every donation, every volunteer hour, every prayer makes stories like Maria's possible.
              </p>
              <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                <Heart className="w-4 h-4 mr-2" />
                Support This Mission
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Become a Volunteer"
            subtitle="Join our team of compassionate servants making a difference"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <p className="text-center text-gray-700 mb-8">
              We need caring individuals to help with our various charitable programs. Whether you can give a few hours a week or a day a month, your time makes an eternal difference.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="John Doe" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-2" required />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" required />
              </div>

              <div>
                <Label>Areas of Interest</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {['Elderly Care', 'Orphan Support', 'Medical Aid', 'Education', 'Food Distribution', 'Administration'].map((area) => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input id="availability" placeholder="e.g., Weekends, 2-3 hours per week" className="mt-2" />
              </div>

              <Button type="submit" className="w-full bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                Submit Volunteer Application
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Annual Reports"
            subtitle="Transparency and accountability in all we do"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[2024, 2023, 2022, 2021].map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-center mb-2 text-gray-900">{year} Report</h4>
                <p className="text-sm text-gray-600 text-center mb-4">Financial & impact summary</p>
                <Button variant="outline" className="w-full group-hover:bg-[#D4A937] group-hover:text-white group-hover:border-[#D4A937]">
                  Download PDF
                </Button>
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
            <h2 className="mb-6 text-white">Partner With Us in Serving the Poor</h2>
            <p className="text-lg text-white/90 mb-8">
              Your financial support, volunteer time, or prayers can change lives. Join us in making Christ's love tangible to those who need it most.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#D4A937] hover:bg-gray-100">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#D4A937]"
              >
                <Users className="w-5 h-5 mr-2" />
                Become a Volunteer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

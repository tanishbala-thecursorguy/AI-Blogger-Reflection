import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Heart, CreditCard, Check, Users, TrendingUp, Gift, Shield } from 'lucide-react';

const donationAmounts = [50, 100, 250, 500, 1000];

const impactInfo = [
  { amount: '$25', impact: 'Feeds 10 families for a day', icon: Gift },
  { amount: '$100', impact: 'Sponsors a retreat for someone in need', icon: Users },
  { amount: '$250', impact: 'Provides medical care for 10 patients', icon: Heart },
  { amount: '$500', impact: 'Fully sponsors a family\'s retreat experience', icon: TrendingUp },
];

const allocationData = [
  { category: 'Direct Ministry Programs', percentage: 75, color: 'bg-[#D4A937]' },
  { category: 'Operations & Administration', percentage: 15, color: 'bg-[#A7C7E7]' },
  { category: 'Fundraising & Development', percentage: 10, color: 'bg-gray-300' },
];

export function Donation() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const finalAmount = customAmount || selectedAmount;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1639756012445-7e101cb6a1e1?w=1200)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A937]/95 to-[#A7C7E7]/95" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-white">Make an Eternal Investment</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
              Your generous gift helps us spread the Gospel, heal the broken, and serve the poor. Every donation makes an eternal difference.
            </p>
            <p className="text-white/80 italic">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over." — Luke 6:38
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                {/* Donation Type Toggle */}
                <div className="mb-8">
                  <h3 className="mb-4 text-gray-900">Choose Donation Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        donationType === 'one-time'
                          ? 'border-[#D4A937] bg-[#D4A937]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Heart className={`w-6 h-6 mx-auto mb-2 ${donationType === 'one-time' ? 'text-[#D4A937]' : 'text-gray-400'}`} />
                      <p className={`${donationType === 'one-time' ? 'text-gray-900' : 'text-gray-600'}`}>
                        One-Time Gift
                      </p>
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        donationType === 'monthly'
                          ? 'border-[#D4A937] bg-[#D4A937]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${donationType === 'monthly' ? 'text-[#D4A937]' : 'text-gray-400'}`} />
                      <p className={`${donationType === 'monthly' ? 'text-gray-900' : 'text-gray-600'}`}>
                        Monthly Partner
                      </p>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="mb-4 text-gray-900">Select Amount</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'border-[#D4A937] bg-[#D4A937] text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className={selectedAmount === amount && !customAmount ? 'text-white' : 'text-gray-900'}>
                          ${amount}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                    <div className="relative mt-2">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="mb-4 text-gray-900">Your Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" className="mt-2" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" className="mt-2" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" className="mt-2" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-8">
                  <h3 className="mb-4 text-gray-900">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-2" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" placeholder="123" className="mt-2" required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3 mb-8">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span className="text-sm text-gray-600">
                      I would like to cover the processing fees so 100% of my donation goes to the ministry
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span className="text-sm text-gray-600">
                      Make my donation anonymous
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-600">
                      Send me updates about how my donation is making a difference
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button className="w-full bg-[#D4A937] hover:bg-[#B88F2E] text-white py-6">
                  <CreditCard className="w-5 h-5 mr-2" />
                  {donationType === 'monthly' ? `Donate $${finalAmount || '0'} Monthly` : `Donate $${finalAmount || '0'} Now`}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#D4A937]/10 to-[#A7C7E7]/10 p-6 rounded-xl"
              >
                <h4 className="mb-4 text-gray-900">Your Impact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#D4A937]" />
                    <span className="text-gray-700">Tax deductible</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#D4A937]" />
                    <span className="text-gray-700">Instant receipt</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#D4A937]" />
                    <span className="text-gray-700">Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#D4A937]" />
                    <span className="text-gray-700">Cancel anytime</span>
                  </div>
                </div>
              </motion.div>

              {/* Ministry Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h4 className="mb-4 text-gray-900">Questions?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Need help with your donation or have questions about giving?
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support Team
                </Button>
              </motion.div>

              {/* Bible Verse */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-[#A7C7E7]/20 to-[#D4A937]/20 p-6 rounded-xl"
              >
                <p className="text-sm text-gray-700 italic mb-2">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                </p>
                <p className="text-xs text-[#D4A937]">— 2 Corinthians 9:7</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Information */}
      <section className="py-20 bg-[#F4F6F8]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Where Your Donation Goes"
            subtitle="See the real-world impact of your generosity"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {impactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-gray-900">{item.amount}</h3>
                <p className="text-sm text-gray-600">{item.impact}</p>
              </motion.div>
            ))}
          </div>

          {/* Allocation Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
          >
            <h3 className="text-center mb-8 text-gray-900">Financial Allocation</h3>
            
            <div className="space-y-6">
              {allocationData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 text-center mt-8">
              We are committed to transparency and accountability in all our financial matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-r from-[#D4A937] to-[#A7C7E7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-white italic mb-6">
              "Becoming a monthly partner has been one of the most rewarding decisions of my life. Knowing my giving is making a consistent, tangible difference brings me so much joy."
            </p>
            <p className="text-white">— Robert Martinez, Monthly Partner since 2022</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

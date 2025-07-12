import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Clock, 
  Mail, 
  PiggyBank, 
  CreditCard, 
  DollarSign, 
  Users, 
  Baby, 
  MoreHorizontal,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ServiceCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="group perspective-1000 h-48"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="text-blue-800 mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center">{title}</h3>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl shadow-lg rotate-y-180 flex flex-col items-center justify-center p-6 text-white">
          <div className="text-gold-400 mb-3">
            {icon}
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-center text-blue-100">{description}</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 50, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize EmailJS (you'll need to replace these with your actual EmailJS credentials)
  useEffect(() => {
    emailjs.init("FiwKEpKbgtrii_-wy"); // Replace with your EmailJS public key
  }, []);

  useEffect(() => {
    // Set initial countdown to 50 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 50);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
      return;
    }
    
    setIsValidEmail(true);
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_4t9267c', // Replace with your EmailJS service ID
        'template_yv07zka', // Replace with your EmailJS template ID
        {
          to_email: 'contact@bayellecreditunion.com',
          from_email: email,
          subject: 'New Website Launch Notification Request - BaCCUL',
          message: `New subscriber from BaCCUL website: ${email} would like to be notified when the website launches.`,
          subscriber_email: email,
          website_name: 'Bayelle Credit Union Ltd (BaCCUL)',
          request_date: new Date().toLocaleDateString(),
        }
      );
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError('Failed to send notification request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <PiggyBank size={48} />,
      title: "Savings",
      description: "Secure savings accounts with competitive interest rates to help you grow your money."
    },
    {
      icon: <CreditCard size={48} />,
      title: "Deposit",
      description: "Flexible deposit options with various terms to suit your financial planning needs."
    },
    {
      icon: <DollarSign size={48} />,
      title: "Loans",
      description: "Personal and business loans with competitive rates and flexible repayment terms."
    },
    {
      icon: <Users size={48} />,
      title: "Salary Accounts",
      description: "Dedicated salary accounts with exclusive benefits for employed individuals."
    },
    {
      icon: <Baby size={48} />,
      title: "Minor Accounts",
      description: "Special accounts designed for children and teenagers to start their financial journey."
    },
    {
      icon: <MoreHorizontal size={48} />,
      title: "More",
      description: "Additional services including insurance, investment advice, and financial planning."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/Blue Logo.png" 
                alt="Bayelle Credit Union Ltd Logo" 
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">Bayelle Credit Union Ltd</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              BaCCUL Website Under
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600"> Construction</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building something amazing for our members. Our new digital experience will make cooperative banking easier than ever.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/Blue Logo.png" 
                alt="BaCCUL Logo" 
                className="w-8 h-8 object-contain mr-3"
              />
              <h3 className="text-2xl font-bold text-gray-900">Launch Countdown</h3>
            </div>
            
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-xl p-4 md:p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse">
                    <div className="text-3xl md:text-4xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="text-sm md:text-base font-medium text-gray-600 mt-2">{item.label}</div>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-gray-600 mt-8">
              Our full website is coming soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the comprehensive cooperative financial services we offer to help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Be the First to Know
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get notified when our new website launches and be among the first to experience our enhanced digital cooperative banking services.
            </p>

            {isSubscribed ? (
              <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">We've received your request and will notify you when we launch!</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                        !isValidEmail ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      required
                      disabled={isSubmitting}
                    />
                    {!isValidEmail && (
                      <p className="text-red-300 text-sm mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-blue-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2 min-w-[140px]"
                  >
                    <Mail size={20} />
                    <span>{isSubmitting ? 'Sending...' : 'Notify Me'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                {submitError && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/Blue Logo.png" 
                alt="BaCCUL Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-semibold">Bayelle Credit Union Ltd</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2025 Bayelle Cooperative Credit Union Limited (BaCCUL). All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
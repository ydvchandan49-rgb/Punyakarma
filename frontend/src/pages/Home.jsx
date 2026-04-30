import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Ganga Bath Haridwar',
    description: 'Experience divine purification with a sacred bath in the holy Ganges at Haridwar.',
    icon: '',
    price: '₹500',
    image: 'https://images.pexels.com/photos/31770953/pexels-photo-31770953.jpeg',
  },
  {
    id: 2,
    title: 'Ganga Bath Rishikesh',
    description: 'Seek spiritual enlightenment with a holy dip in the Ganges at the yoga capital.',
    icon: '',
    price: '₹300',
    image: 'https://images.pexels.com/photos/29647306/pexels-photo-29647306.jpeg',
  },
  {
    id: 3,
    title: 'Gau Seva',
    description: 'Serve the sacred cows and participate in traditional gau pratishtha activities.',
    icon: '',
    price: '₹500',
    image: 'https://images.pexels.com/photos/16508918/pexels-photo-16508918.jpeg',
  },
  {
    id: 4,
    title: 'Deep Daan',
    description: 'Comprehensive booking for all spiritual services and divine experiences.',
    icon: '',
    price: '₹100',
    image: 'https://images.pexels.com/photos/29355740/pexels-photo-29355740.jpeg',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'New Delhi',
    text: '"The Ganga Bath experience at Haridwar was truly divine. The priests were knowledgeable, and the entire arrangement was completely hassle-free. It brought immense peace to my family."',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Mumbai',
    text: '"Participating in Gau Seva through HolyBath was a soul-enriching experience. The transparency and devotion with which they operate is highly commendable. Highly recommended!"',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    location: 'Bangalore',
    text: '"Booking our spiritual journey to Rishikesh was so easy. The team was supportive and guided us beautifully. A truly premium and spiritual service platform."',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          {/* Replace this src with your own local video path (e.g., '/video.mp4') or URL */}
          <source src="https://www.pexels.com/download/video/10807808/" type="video/mp4" />
        </video>

        {/* Semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-amber-50/20 z-0"></div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6"></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              Experience Divine Purity with HolyBath
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Connect with ancient spiritual traditions through our sacred bathing and divine services.
              Find inner peace and spiritual enlightenment.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/booking"
                className="inline-block bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-primary/90 transition-all duration-300"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-primary text-4xl">↓</div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of sacred spiritual services designed to bring you closer to divinity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(251,191,36,0.2)] transition-all duration-300 border border-amber-100 flex flex-col group"
              >
                {/* Image & Icon Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-3xl shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-2xl font-black text-amber-500">{service.price}</span>
                    <Link
                      to="/booking"
                      className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-amber-500 hover:text-gray-900 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50 rounded-l-[100px] z-0 opacity-50 hidden lg:block"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.pexels.com/photos/28819289/pexels-photo-28819289.jpeg" alt="Sacred River" className="rounded-3xl shadow-lg w-full h-72 object-cover mt-12" />
                <img src="https://images.pexels.com/photos/36742836/pexels-photo-36742836.jpeg" alt="Prayer Ceremony" className="rounded-3xl shadow-lg w-full h-72 object-cover" />
              </div>
              
              {/* Floating Experience Badge */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-2xl shadow-xl border border-amber-100 hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600 text-2xl">🕉️</div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">5+ Years</div>
                    <div className="text-sm text-gray-500 font-medium">Spiritual Excellence</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 font-semibold rounded-full text-sm mb-6 tracking-wide">
                WHO WE ARE
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Connecting Devotees to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Sacred Traditions</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                HolyBath is a spiritual service platform dedicated to connecting devotees with ancient sacred traditions of India. We provide authentic Ganga bathing experiences at Haridwar and Rishikesh, along with Gau Seva and comprehensive booking services.
              </p>
              
              {/* Feature list */}
              <ul className="space-y-4 mb-10">
                {[
                  'Authentic and guided spiritual experiences',
                  'Hassle-free booking for sacred rituals',
                  'Preserving ancient Indian traditions with utmost purity'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 transition-all hover:shadow-md group">
                  <div className="text-4xl font-black text-amber-600 mb-1 group-hover:scale-110 transition-transform origin-left">10K+</div>
                  <div className="text-sm text-gray-600 font-medium">Devotees Served</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 transition-all hover:shadow-md group">
                  <div className="text-4xl font-black text-amber-600 mb-1 group-hover:scale-110 transition-transform origin-left">4.9/5</div>
                  <div className="text-sm text-gray-600 font-medium">Customer Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-amber-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Devotee Experiences</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Heartfelt words from those who have embarked on a sacred journey with us.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100 text-center relative"
              >
                <div className="absolute top-4 left-4 md:top-8 md:left-8 text-6xl text-amber-200 opacity-50 font-serif">"</div>
                
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-amber-100 shadow-md"
                />
                
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-700 italic mb-8 relative z-10">
                  {testimonials[currentTestimonial].text}
                </p>
                
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-amber-600 font-medium">{testimonials[currentTestimonial].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:scale-110 transition-all z-20 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:scale-110 transition-all z-20 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none ${currentTestimonial === idx ? 'bg-amber-500 w-8' : 'bg-amber-200 hover:bg-amber-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 text-white overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://www.pexels.com/download/video/4684159/" type="video/mp4" />
        </video>
        
        {/* Primary Color Overlay for Text Readability */}
        <div className="absolute inset-0 bg-primary/20 z-0 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book your divine experience today and feel the purity of sacred bathing.
            </p>
            <Link
              to="/booking"
              className="inline-block bg-white text-primary px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-accent transition-all duration-300"
            >
              Book Your Experience
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-4">🕉️</div>
              <h3 className="text-xl font-bold mb-4">HolyBath</h3>
              <p className="text-gray-400">
                Your gateway to divine spiritual experiences and sacred traditions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/#services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link to="/booking" className="text-gray-400 hover:text-white">Booking</Link></li>
                <li><Link to="/admin" className="text-gray-400 hover:text-white">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Email: info@holybath.com</p>
              <p className="text-gray-400">Phone: +91 98765 43210</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 HolyBath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
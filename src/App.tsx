/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Zap, 
  Flame, 
  Droplets, 
  Instagram, 
  Twitter, 
  Facebook, 
  ArrowRight,
  Menu,
  X,
  Clock,
  CheckCircle2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-white flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-crimson-500 rounded-full flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          CRIMSON
        </motion.div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          {['Flavors', 'Story', 'Community', 'Shop'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover:text-crimson-400 transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 bg-crimson-600 hover:bg-crimson-500 px-6 py-2 rounded-full font-bold transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </motion.button>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Flavors', 'Story', 'Community', 'Shop'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-lg font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-crimson-600 w-full py-3 rounded-xl font-bold">Buy Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Bottle = ({ className = "", rotate = 0, scale = 1 }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{ 
        y: [0, -20, 0],
        rotate: rotate
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 0 }
      }}
      style={{ scale }}
    >
      {/* Stylized Bottle using CSS/SVG */}
      <div className="w-32 h-80 bg-gradient-to-b from-crimson-400 to-crimson-800 rounded-[2rem] relative shadow-2xl overflow-hidden border-4 border-white/20">
        <div className="absolute top-0 left-0 w-full h-1/4 bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <span className="text-4xl font-black text-white/20 rotate-90 block tracking-widest">CRIMSON</span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 rounded-full blur-xl" />
      </div>
      <div className="w-16 h-8 bg-crimson-300 absolute -top-4 left-1/2 -translate-x-1/2 rounded-t-lg border-x-4 border-t-4 border-white/20" />
      
      {/* Condensation droplets */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-2 bg-white/40 rounded-full"
          style={{ 
            top: `${20 + i * 15}%`, 
            left: `${20 + (i % 2) * 60}%` 
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2 + i, repeat: Infinity }}
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-mesh">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-crimson-500/20 text-crimson-300 px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-6 border border-crimson-500/30"
          >
            UNLEASH THE MYSTERY
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            NOT JUST A <br />
            <span className="text-gradient">DRINK.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Experience the 23-flavor fusion that defies explanation. Bold, rebellious, and unapologetically unique.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-crimson-900 px-8 py-4 rounded-full font-black text-lg flex items-center gap-2 shadow-xl shadow-white/10"
            >
              Buy Now <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-full font-black text-lg border-white/20"
            >
              Explore Flavors
            </motion.button>
          </div>
        </motion.div>

        <div className="relative flex justify-center items-center">
          <motion.div 
            style={{ y: y1, rotate }}
            className="relative z-20"
          >
            <Bottle scale={1.2} />
          </motion.div>
          
          {/* Background Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-96 h-96 bg-crimson-600/20 rounded-full blur-[100px] -z-10"
          />
          <div className="absolute -z-10 w-full h-full flex items-center justify-center">
            <div className="w-[150%] h-[150%] border border-white/5 rounded-full animate-pulse" />
            <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full animate-pulse delay-75" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const BrandStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="py-24 bg-crimson-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={ref} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="aspect-square rounded-3xl overflow-hidden glass p-4"
            >
              <img 
                src="https://picsum.photos/seed/beverage/800/800" 
                alt="Brand Heritage" 
                className="w-full h-full object-cover rounded-2xl opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 glass rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl">
              <span className="text-4xl font-black text-crimson-400">1885</span>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Est. Heritage</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              A LEGACY OF <br />
              <span className="text-crimson-500">REBELLION.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                Born in a small pharmacy in Texas, Crimson wasn't created to be just another soda. It was a scientific experiment in flavor—a blend of 23 unique ingredients that no one could quite put their finger on.
              </p>
              <p>
                For over a century, we've stayed true to that mystery. We don't follow trends; we set them. Crimson is for the thinkers, the doers, and the ones who dare to be different.
              </p>
              <p className="font-bold text-white italic">
                "Not just a drink, an experience that stays with you."
              </p>
            </div>
            <motion.button
              whileHover={{ x: 10 }}
              className="mt-10 flex items-center gap-2 text-crimson-400 font-black text-lg group"
            >
              Read Full Story <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = () => {
  const products = [
    { name: "Original Crimson", desc: "The classic 23-flavor fusion.", color: "bg-crimson-600", price: "$2.49" },
    { name: "Crimson Zero", desc: "Bold taste, zero sugar.", color: "bg-gray-900", price: "$2.49" },
    { name: "Cherry Blast", desc: "A wild twist of dark cherry.", color: "bg-red-900", price: "$2.99" },
    { name: "Vanilla Velvet", desc: "Smooth, creamy, mysterious.", color: "bg-amber-900", price: "$2.99" },
  ];

  return (
    <section id="flavors" className="py-24 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">CHOOSE YOUR <span className="text-gradient">VIBE.</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our lineup of legendary flavors. Each one crafted to perfection.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass rounded-3xl p-8 flex flex-col items-center text-center group"
            >
              <div className={`w-full aspect-[3/4] ${product.color} rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden`}>
                <Bottle scale={0.8} className="z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-black mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{product.desc}</p>
              <div className="mt-auto w-full flex items-center justify-between">
                <span className="text-xl font-black text-crimson-400">{product.price}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const USP = () => {
  const features = [
    { icon: <Flame />, title: "23 Flavors", desc: "A secret blend that creates a taste like no other." },
    { icon: <Zap />, title: "Pure Energy", desc: "The perfect pick-me-up for your daily grind." },
    { icon: <Droplets />, title: "Ultra Refreshing", desc: "Best served ice-cold for maximum impact." },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-crimson-500/20 text-crimson-400 rounded-2xl flex items-center justify-center mb-6 border border-crimson-500/30">
                {React.cloneElement(f.icon as React.ReactElement, { className: "w-10 h-10" })}
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section id="community" className="py-24 bg-crimson-950 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">THE <span className="text-crimson-500">CULT</span> OF CRIMSON.</h2>
            <p className="text-gray-400">Join millions of fans worldwide who live for the bold.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  className="w-12 h-12 rounded-full border-2 border-crimson-900" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="font-black">4.9/5</span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div className="flex gap-8 whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="glass p-6 rounded-2xl min-w-[300px] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-crimson-500/20 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-crimson-400" />
              </div>
              <div>
                <p className="text-sm font-bold">@crimson_fan_{i}</p>
                <p className="text-xs text-gray-500">Nothing beats that first sip! 🔥</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const InteractiveExperience = () => {
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const flavors = [
    { name: "The Rebel", color: "from-crimson-600 to-black", icon: <Flame /> },
    { name: "The Thinker", color: "from-blue-900 to-black", icon: <Droplets /> },
    { name: "The Doer", color: "from-amber-600 to-black", icon: <Zap /> },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 glass rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">WHICH ONE <br /> ARE YOU?</h2>
            <p className="text-gray-400 mb-10">Select the vibe that matches your personality and we'll find your perfect Crimson match.</p>
            
            <div className="space-y-4">
              {flavors.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFlavor(i)}
                  className={`w-full flex items-center gap-4 p-6 rounded-2xl transition-all border ${selectedFlavor === i ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedFlavor === i ? 'bg-black text-white' : 'bg-crimson-500/20 text-crimson-400'}`}>
                    {f.icon}
                  </div>
                  <span className="text-xl font-bold">{f.name}</span>
                  {selectedFlavor === i && <CheckCircle2 className="ml-auto w-6 h-6" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavor}
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Bottle scale={1.5} />
              </motion.div>
            </AnimatePresence>
            
            {/* Dynamic Background */}
            <motion.div 
              animate={{ 
                background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)`
              }}
              className={`absolute w-full h-full rounded-full blur-[120px] opacity-30 bg-gradient-to-r ${flavors[selectedFlavor].color}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const LimitedOffer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white text-crimson-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-crimson-600 text-white px-6 py-2 rounded-full text-sm font-black tracking-widest mb-8">LIMITED DROP</span>
          <h2 className="text-5xl md:text-7xl font-black mb-8">CRIMSON X MIDNIGHT</h2>
          <p className="text-xl text-crimson-800/70 mb-12 max-w-2xl mx-auto">The rarest flavor ever created. Only 5,000 bottles available worldwide. Once it's gone, it's gone forever.</p>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-16">
            {[
              { label: "Hours", val: timeLeft.h },
              { label: "Mins", val: timeLeft.m },
              { label: "Secs", val: timeLeft.s },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center">
                <div className="text-5xl md:text-7xl font-black tabular-nums">{t.val.toString().padStart(2, '0')}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-50">{t.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-crimson-600 text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl shadow-crimson-600/30"
          >
            Claim Yours Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="glass rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">JOIN THE INNER CIRCLE.</h2>
            <p className="text-gray-400">Get exclusive access to secret drops, limited edition merch, and 15% off your first order.</p>
          </div>
          <form className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl focus:outline-none focus:border-crimson-500 transition-colors min-w-[300px]"
            />
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-crimson-500 hover:text-white transition-all">
              Join Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-crimson-500 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              CRIMSON
            </div>
            <p className="text-gray-500 max-w-sm mb-8">
              Defying the ordinary since 1885. The original 23-flavor fusion that changed the world of beverages forever.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-crimson-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flavor Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 font-bold uppercase tracking-widest gap-4">
          <p>© 2026 CRIMSON BEVERAGE CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-crimson-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <ProductShowcase />
        <USP />
        <SocialProof />
        <InteractiveExperience />
        <LimitedOffer />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

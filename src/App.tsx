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
  CheckCircle2,
  MapPin,
  Search,
  Loader2,
  ExternalLink,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Package,
  ArrowLeft
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Types ---

interface Product {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  color: string;
  price: number;
  features: string[];
}

const PRODUCTS: Product[] = [
  { 
    id: "original", 
    name: "Original Crimson", 
    desc: "The classic 23-flavor fusion.", 
    longDesc: "The one that started it all. A mysterious blend of 23 unique flavors that creates a taste profile unlike anything else in the world. It's bold, spicy, sweet, and completely original. Perfect for those who refuse to settle for the status quo.",
    color: "bg-crimson-600", 
    price: 2.49,
    features: ["23 Secret Flavors", "Caffeine Boost", "Real Sugar Blend", "Classic Heritage"]
  },
  { 
    id: "zero", 
    name: "Crimson Zero", 
    desc: "Bold taste, zero sugar.", 
    longDesc: "All the bold mystery of the original Crimson, with absolutely zero sugar. We've meticulously balanced the 23-flavor blend to ensure you get the full experience without the calories. It's the ultimate guilt-free rebellion.",
    color: "bg-gray-900", 
    price: 2.49,
    features: ["Zero Sugar", "Zero Calories", "Full Flavor Profile", "Crisp Finish"]
  },
  { 
    id: "cherry", 
    name: "Cherry Blast", 
    desc: "A wild twist of dark cherry.", 
    longDesc: "A deep, dark infusion of black cherry meets the classic Crimson mystery. This isn't your average cherry soda—it's a sophisticated, intense flavor explosion that adds a new dimension to our legendary 23-flavor base.",
    color: "bg-red-900", 
    price: 2.99,
    features: ["Dark Cherry Extract", "Intense Aroma", "Smooth Carbonation", "Rich Color"]
  },
  { 
    id: "vanilla", 
    name: "Vanilla Velvet", 
    desc: "Smooth, creamy, mysterious.", 
    longDesc: "The smoothest member of the Crimson family. We've added a layer of rich, velvety vanilla to our complex flavor base, creating a creamy experience that feels like a dessert in a bottle. It's Crimson, but with a softer edge.",
    color: "bg-amber-900", 
    price: 2.99,
    features: ["Premium Vanilla", "Creamy Texture", "Smooth Aftertaste", "Gourmet Blend"]
  },
  { 
    id: "midnight", 
    name: "Crimson X Midnight", 
    desc: "The rarest flavor ever created.", 
    longDesc: "A limited-edition masterpiece. Crimson X Midnight is a darker, more intense version of our secret formula, aged with rare botanicals to create a flavor that is truly once-in-a-lifetime. Once the 5,000 bottles are gone, this mystery is closed forever.",
    color: "bg-black", 
    price: 4.99,
    features: ["Limited Edition", "Aged Botanicals", "Intense Mystery", "Collector's Bottle"]
  },
];

// --- Components ---

const Navbar = ({ onOpenPurchase }: { onOpenPurchase: (product?: Product) => void }) => {
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
            onClick={() => onOpenPurchase(PRODUCTS[0])}
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
              <button 
                onClick={() => {
                  onOpenPurchase();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-crimson-600 w-full py-3 rounded-xl font-bold"
              >
                Buy Now
              </button>
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

const Hero = ({ onOpenPurchase }: { onOpenPurchase: (product?: Product) => void }) => {
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
              onClick={() => onOpenPurchase(PRODUCTS[0])}
              className="bg-white text-crimson-900 px-8 py-4 rounded-full font-black text-lg flex items-center gap-2 shadow-xl shadow-white/10"
            >
              Buy Now <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenPurchase(PRODUCTS[1])}
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

const ProductShowcase = ({ onOpenPurchase }: { onOpenPurchase: (product?: Product) => void }) => {
  const products = PRODUCTS.slice(0, 4);

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
                <span className="text-xl font-black text-crimson-400">${product.price}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onOpenPurchase(product)}
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
          {features.map((f, i) => {
            const [isHovered, setIsHovered] = React.useState(false);
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-crimson-500/20 text-crimson-400 rounded-2xl flex items-center justify-center mb-6 border border-crimson-500/30 transition-all duration-300 hover:bg-crimson-500/40 hover:scale-110 cursor-help">
                    {React.cloneElement(f.icon as React.ReactElement, { className: "w-10 h-10" })}
                  </div>
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        className="absolute -top-12 left-1/2 px-3 py-1.5 bg-white text-crimson-900 text-xs font-black rounded-lg pointer-events-none whitespace-nowrap shadow-2xl z-20"
                      >
                        {f.title}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
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

const LimitedOffer = ({ onOpenPurchase }: { onOpenPurchase: (product?: Product) => void }) => {
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
            onClick={() => onOpenPurchase(PRODUCTS[4])}
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

const StoreLocator = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findStores = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find stores that sell Crimson beverage or similar premium soft drinks near ${location}. Return a list of store names and their addresses.`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && chunks.length > 0) {
        const stores = chunks
          .filter((chunk: any) => chunk.maps)
          .map((chunk: any) => ({
            name: chunk.maps.title,
            url: chunk.maps.uri,
          }));
        setResults(stores);
      } else {
        setError("No stores found in this area. Try a different location.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch store locations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl border-white/20"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <MapPin className="text-crimson-500" />
                  FIND A STORE
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <form onSubmit={findStores} className="relative mb-8">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city, state, or zip code..."
                  className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-2xl focus:outline-none focus:border-crimson-500 transition-colors"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-crimson-600 hover:bg-crimson-500 px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
                </button>
              </form>

              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-crimson-500" />
                    <p className="font-bold animate-pulse">Scanning the area for Crimson...</p>
                  </div>
                )}

                {error && (
                  <div className="text-center py-12 text-red-400 font-bold">
                    {error}
                  </div>
                )}

                {!loading && !error && results.length > 0 && (
                  <div className="grid gap-4">
                    {results.map((store, i) => (
                      <motion.a
                        key={i}
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-crimson-500/20 rounded-xl flex items-center justify-center text-crimson-400">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-lg">{store.name}</span>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                )}

                {!loading && !error && results.length === 0 && !location && (
                  <div className="text-center py-12 text-gray-500 italic">
                    Enter your location to see where you can grab a cold Crimson.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PurchaseFlow = ({ isOpen, onClose, initialProduct }: { isOpen: boolean; onClose: () => void; initialProduct?: Product }) => {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct || PRODUCTS[0]);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (initialProduct) setSelectedProduct(initialProduct);
  }, [initialProduct]);

  const reset = () => {
    setStep(1);
    setQuantity(1);
    onClose();
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const total = (selectedProduct.price * quantity).toFixed(2);
  const shipping = 5.00;
  const grandTotal = (parseFloat(total) + shipping).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl border-white/20 flex flex-col md:flex-row"
          >
            {/* Left Side: Product Preview */}
            <div className={`md:w-1/3 p-12 flex flex-col items-center justify-center relative overflow-hidden ${selectedProduct.color}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="relative z-10"
              >
                <Bottle scale={1.2} />
              </motion.div>
              <div className="relative z-10 text-center mt-8">
                <h3 className="text-2xl font-black mb-2">{selectedProduct.name}</h3>
                <p className="text-white/60 text-sm">{selectedProduct.desc}</p>
              </div>
            </div>

            {/* Right Side: Flow Steps */}
            <div className="md:w-2/3 p-8 md:p-12 bg-crimson-950/50">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  {step > 1 && step < 4 && (
                    <button onClick={prevStep} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-crimson-500 uppercase tracking-widest">Step {step} of 3</span>
                    <h2 className="text-2xl font-black uppercase">
                      {step === 1 && "Select Quantity"}
                      {step === 2 && "Cart Summary"}
                      {step === 3 && "Checkout"}
                      {step === 4 && "Order Confirmed"}
                    </h2>
                  </div>
                </div>
                <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <div className="min-h-[400px]">
                {/* Step 1: Quantity */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {PRODUCTS.slice(0, 5).map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProduct(p)}
                          className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-4 ${selectedProduct.id === p.id ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${p.color}`} />
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">{p.name}</span>
                            <span className={`text-xs ${selectedProduct.id === p.id ? 'text-black/60' : 'text-gray-500'}`}>${p.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                        <span className="text-4xl font-black">{quantity}</span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10"
                        >
                          <Minus className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={nextStep}
                      className="w-full bg-crimson-600 hover:bg-crimson-500 py-6 rounded-2xl font-black text-xl shadow-xl shadow-crimson-600/20 transition-all"
                    >
                      Continue to Cart
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Summary */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-6 glass rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${selectedProduct.color}`} />
                          <div>
                            <h4 className="font-bold">{selectedProduct.name}</h4>
                            <p className="text-sm text-gray-400">Qty: {quantity} x ${selectedProduct.price}</p>
                          </div>
                        </div>
                        <span className="font-black text-lg">${total}</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-white/10 pt-6">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>${total}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-2xl font-black pt-4">
                        <span>Total</span>
                        <span className="text-crimson-400">${grandTotal}</span>
                      </div>
                    </div>

                    <button 
                      onClick={nextStep}
                      className="w-full bg-crimson-600 hover:bg-crimson-500 py-6 rounded-2xl font-black text-xl shadow-xl shadow-crimson-600/20 transition-all"
                    >
                      Proceed to Checkout
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Checkout */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-crimson-500 outline-none" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-crimson-500 outline-none" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Shipping Address</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-crimson-500 outline-none" placeholder="123 Crimson St." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Card Number</label>
                        <div className="relative">
                          <input type="text" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl focus:border-crimson-500 outline-none" placeholder="**** **** **** ****" />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Expiry</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-crimson-500 outline-none" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">CVV</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-crimson-500 outline-none" placeholder="***" />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={nextStep}
                      className="w-full bg-crimson-600 hover:bg-crimson-500 py-6 rounded-2xl font-black text-xl shadow-xl shadow-crimson-600/20 transition-all flex items-center justify-center gap-3"
                    >
                      <ShoppingBag className="w-6 h-6" />
                      Pay ${grandTotal}
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-4xl font-black mb-4">ORDER PLACED!</h3>
                    <p className="text-gray-400 mb-12 max-w-sm">
                      Your Crimson is on its way. Get ready for the boldest sip of your life.
                    </p>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="glass p-6 rounded-2xl flex flex-col items-center">
                        <Truck className="w-6 h-6 text-crimson-400 mb-2" />
                        <span className="text-xs font-bold text-gray-500 uppercase">Delivery</span>
                        <span className="font-bold">2-3 Days</span>
                      </div>
                      <div className="glass p-6 rounded-2xl flex flex-col items-center">
                        <Package className="w-6 h-6 text-crimson-400 mb-2" />
                        <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                        <span className="font-bold">#CR-8859</span>
                      </div>
                    </div>
                    <button 
                      onClick={reset}
                      className="mt-12 text-crimson-400 font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Back to Home
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ onOpenStoreLocator, onOpenPurchase }: { onOpenStoreLocator: () => void; onOpenPurchase: (product?: Product) => void }) => {
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
              <li>
                <button 
                  onClick={() => onOpenPurchase(PRODUCTS[0])}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Flavor Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Heritage</a></li>
              <li>
                <button 
                  onClick={onOpenStoreLocator}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Store Locator
                </button>
              </li>
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

const ProductDescriptionPage: React.FC<{ product: Product; onBack: () => void; onBuy: (product?: Product) => void }> = ({ product, onBack, onBuy }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10"
            >
              <Bottle scale={1.8} />
            </motion.div>
            <div className={`absolute w-full h-full rounded-full blur-[150px] opacity-20 ${product.color}`} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/10 ${product.color} bg-opacity-20`}>
                Premium Beverage
              </span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-none">
              {product.name}
            </h1>
            
            <p className="text-2xl font-black text-crimson-400 mb-8">${product.price}</p>
            
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed mb-12">
              <p>{product.longDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 glass p-4 rounded-2xl">
                  <div className="w-8 h-8 bg-crimson-500/20 text-crimson-400 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBuy(product)}
                className="bg-white text-black px-12 py-6 rounded-full font-black text-xl flex items-center gap-3 shadow-2xl shadow-white/10"
              >
                <ShoppingBag className="w-6 h-6" />
                Buy Now
              </motion.button>
              
              <div className="flex items-center gap-4 px-8 py-6 glass rounded-full border-white/10">
                <Truck className="w-5 h-5 text-crimson-400" />
                <span className="font-bold text-sm uppercase tracking-widest">Free Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nutrition Facts or Extra Details */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl border-white/5">
            <h4 className="text-xl font-black mb-4 uppercase tracking-widest">Ingredients</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural and Artificial Flavors, Sodium Benzoate, Caffeine.
            </p>
          </div>
          <div className="glass p-8 rounded-3xl border-white/5">
            <h4 className="text-xl font-black mb-4 uppercase tracking-widest">Nutrition</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Calories</span>
                <span className="font-bold text-white">150</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Total Fat</span>
                <span className="font-bold text-white">0g</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Sodium</span>
                <span className="font-bold text-white">55mg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Carb</span>
                <span className="font-bold text-white">40g</span>
              </div>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl border-white/5">
            <h4 className="text-xl font-black mb-4 uppercase tracking-widest">Storage</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Best served ice-cold. Store in a cool, dry place away from direct sunlight. Recyclable bottle.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'description'>('home');
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  const openDescription = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentView('description');
  };

  const openPurchase = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setIsPurchaseOpen(true);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-crimson-500 selection:text-white">
      <Navbar onOpenPurchase={() => openPurchase()} />
      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onOpenPurchase={openDescription} />
              <BrandStory />
              <ProductShowcase onOpenPurchase={openDescription} />
              <USP />
              <SocialProof />
              <InteractiveExperience />
              <LimitedOffer onOpenPurchase={openDescription} />
              <Newsletter />
            </motion.div>
          ) : (
            <motion.div
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductDescriptionPage 
                product={selectedProduct} 
                onBack={() => setCurrentView('home')} 
                onBuy={openPurchase}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer onOpenStoreLocator={() => setIsStoreLocatorOpen(true)} onOpenPurchase={() => openPurchase()} />
      <StoreLocator isOpen={isStoreLocatorOpen} onClose={() => setIsStoreLocatorOpen(false)} />
      <PurchaseFlow isOpen={isPurchaseOpen} onClose={() => setIsPurchaseOpen(false)} initialProduct={selectedProduct} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Calendar, Video, ArrowRight, Sparkles } from 'lucide-react';
import TrendCard from '../components/TrendCard';
import { trends } from '../data/trends';

const Presentation = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Filter trends based on activeTab
    const getFilteredTrends = () => {
        if (activeTab === 'all') {
            return [...trends.gifts, ...trends.dates, ...trends.movies].sort(() => 0.5 - Math.random()); // Shuffle for 'all'
        }
        return trends[activeTab] || [];
    };

    const displayTrends = getFilteredTrends();

    return (
        <div className="presentation-page" style={{ minHeight: '100vh', paddingBottom: '100px' }}>

            {/* Navbar Overlay */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    background: scrolled ? 'rgba(26, 5, 5, 0.9)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart color="var(--color-primary)" fill="var(--color-primary)" size={24} />
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600 }}>
                        Valentine's <span className="text-gradient">Trends</span>
                    </span>
                </div>

                <div className="nav-links" style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    <a href="#" style={{ color: 'var(--color-text)' }}>Home</a>
                    <a href="#trends">Trends</a>
                    <a href="#couples">For Couples</a>
                    <a href="#about">About</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="hero"
                style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background decorative blobs */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--color-primary)',
                    filter: 'blur(150px)',
                    opacity: 0.2,
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '250px',
                    height: '250px',
                    background: 'var(--color-accent)',
                    filter: 'blur(120px)',
                    opacity: 0.1,
                    borderRadius: '50%'
                }} />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    style={{ zIndex: 1, padding: '0 20px' }}
                >
                    <motion.div variants={heroVariants}>
                        <span style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(255, 215, 0, 0.1)',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            borderRadius: '50px',
                            color: 'var(--color-gold)',
                            fontSize: '0.9rem',
                            marginBottom: '2rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            <Sparkles size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Official 2026 Guide
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={heroVariants}
                        style={{
                            fontSize: 'min(5rem, 15vw)',
                            fontWeight: 700,
                            marginBottom: '20px',
                            textShadow: '0 0 50px rgba(230, 57, 70, 0.3)'
                        }}
                    >
                        Make it <span className="text-gradient" style={{ fontStyle: 'italic' }}>Unforgettable</span>
                    </motion.h1>

                    <motion.p
                        variants={heroVariants}
                        style={{
                            fontSize: '1.2rem',
                            color: 'var(--color-text-muted)',
                            maxWidth: '600px',
                            margin: '0 auto 40px'
                        }}
                    >
                        Discover the season's most romantic gifts, breathtaking dates, and timeless moments curated for you and yours.
                    </motion.p>

                    <motion.button
                        variants={heroVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('trends').scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '16px 40px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            boxShadow: '0 10px 30px rgba(230, 57, 70, 0.4)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        Explore Trends <ArrowRight size={20} />
                    </motion.button>
                </motion.div>
            </section>

            {/* Categories / Trends Section */}
            <section id="trends" className="container section">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                    <div className="glass-panel" style={{ padding: '8px', display: 'flex', gap: '5px', borderRadius: '50px' }}>
                        {['all', 'gifts', 'dates', 'movies'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '40px',
                                    background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--color-text-muted)',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}
                >
                    <AnimatePresence mode='popLayout'>
                        {displayTrends.map((item) => (
                            <TrendCard key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

        </div>
    );
};

export default Presentation;

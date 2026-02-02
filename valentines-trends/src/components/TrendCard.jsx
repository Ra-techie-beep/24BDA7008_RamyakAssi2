import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';

const TrendCard = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%',
                position: 'relative',
                group: 'card'
            }}
        >
            {/* Image Container */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease'
                }} className="card-image" />

                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '20px',
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--color-gold)'
                }}>
                    <Star size={12} fill="var(--color-gold)" />
                    {item.rating}
                </div>

                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'var(--color-primary)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                }}>
                    {item.category}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.title}</h3>
                    <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{item.price}</span>
                </div>

                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    flexGrow: 1,
                    marginBottom: '20px'
                }}>
                    {item.description}
                </p>

                <button
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-primary)';
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--glass-bg)';
                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                    }}
                >
                    Check it out <ArrowUpRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default TrendCard;

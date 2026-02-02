import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const Envelope = ({ letterContent, onClose }) => {
    const [stage, setStage] = useState('sealed'); // sealed, opening, open, reading

    const handleOpen = () => {
        if (stage === 'sealed') {
            setStage('opening');
            setTimeout(() => setStage('open'), 600); // Wait for flap
            setTimeout(() => setStage('reading'), 1600); // Wait for letter slide up
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px', // Fixed height container for animation
            width: '100%',
            position: 'relative',
            perspective: '1000px'
        }}>

            {/* The Envelope Container */}
            <motion.div
                layout
                animate={{
                    y: stage === 'reading' ? 100 : 0,
                    scale: stage === 'reading' ? 0.8 : 1,
                    opacity: stage === 'reading' ? 0 : 1
                }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                    width: '300px',
                    height: '200px',
                    background: '#e63946',
                    borderRadius: '10px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    cursor: stage === 'sealed' ? 'pointer' : 'default',
                    zIndex: 10
                }}
                onClick={handleOpen}
            >
                {/* Envelope Body (Back) */}

                {/* The Letter (Hidden Inside initially) */}
                <motion.div
                    initial={{ y: 0, zIndex: 5 }}
                    animate={{
                        y: stage === 'open' || stage === 'reading' ? -120 : 0,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        width: '90%',
                        height: '180px',
                        background: '#fffdf0',
                        borderRadius: '5px',
                        padding: '10px',
                        top: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    <div style={{ width: '100%', height: '10px', background: '#ccc', marginBottom: '10px', borderRadius: '2px' }} />
                    <div style={{ width: '100%', height: '10px', background: '#ccc', marginBottom: '10px', borderRadius: '2px' }} />
                    <div style={{ width: '60%', height: '10px', background: '#ccc', borderRadius: '2px' }} />
                </motion.div>

                {/* Bottom Flap (Covers bottom half of letter) */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100px',
                    background: '#d62828', // Slightly darker red
                    clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                    zIndex: 20,
                    borderRadius: '0 0 10px 10px'
                }} />

                {/* Side Flaps */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '150px',
                    height: '100%',
                    background: '#c1121f',
                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                    zIndex: 15,
                    borderRadius: '10px 0 0 10px'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '100%',
                    background: '#c1121f',
                    clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                    zIndex: 15,
                    borderRadius: '0 10px 10px 0'
                }} />

                {/* Top Flap (The animation key) */}
                <motion.div
                    initial={{ rotateX: 0, zIndex: 30 }}
                    animate={{
                        rotateX: stage !== 'sealed' ? 180 : 0,
                        zIndex: stage !== 'sealed' ? 1 : 30
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '110px',
                        background: '#e63946',
                        clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                        transformOrigin: 'top',
                        borderRadius: '10px 10px 0 0'
                    }}
                >
                    {/* Wax Seal */}
                    <motion.div
                        animate={{ opacity: stage !== 'sealed' ? 0 : 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '20px', // Tip of triangle
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#C69C6D', // Gold/Wax color
                            border: '2px solid #A17A4D',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#654321'
                        }}
                    >
                        <Heart size={20} fill="#654321" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* The Actual Reading View (Modal overlay when 'reading') */}
            <AnimatePresence>
                {stage === 'reading' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '0',
                            width: '100%',
                            maxWidth: '500px',
                            background: '#fffdf0',
                            padding: '40px',
                            borderRadius: '5px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            zIndex: 100,
                            fontFamily: 'Playfair Display, serif',
                            color: '#3e1f1f',
                            maxHeight: '400px',
                            overflowY: 'auto'
                        }}
                    >
                        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
                            {letterContent.title}
                        </h2>
                        <TypewriterText text={letterContent.body} />

                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '30px',
                                background: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                float: 'right'
                            }}
                        >
                            Keep This Forever
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

// Sub-component for typing effect
const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(intervalId);
        }, 30); // Speed of typing

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '1.1rem' }}>
            {displayedText}
        </p>
    );
};

export default Envelope;

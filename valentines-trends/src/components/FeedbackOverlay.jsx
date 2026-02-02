import React from 'react';
import { motion } from 'framer-motion';
import { Heart, XCircle } from 'lucide-react';

const FeedbackOverlay = ({ type }) => {
    const isCorrect = type === 'correct';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 50,
                pointerEvents: 'none', // Allow clicks to pass through if needed, though usually this blocks
                background: isCorrect ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)'
            }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: isCorrect ? [0, 10, -10, 0] : [0]
                }}
                transition={{ duration: 0.5 }}
            >
                {isCorrect ? (
                    <Heart size={150} fill="#ff0040" color="#ff0040" />
                ) : (
                    <XCircle size={150} color="#ff3333" />
                )}
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    marginTop: '20px',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'white',
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    textAlign: 'center'
                }}
            >
                {isCorrect ? "Perfect! ❤️" : ["Oops!", "Really?", "Try Again!", "Oh no!", "Almost!"][Math.floor(Math.random() * 5)]}
            </motion.h2>
        </motion.div>
    );
};

export default FeedbackOverlay;

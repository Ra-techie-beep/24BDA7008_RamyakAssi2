import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { quizData } from '../data/quiz';
import FeedbackOverlay from '../components/FeedbackOverlay';
import Envelope from '../components/Envelope';
import confetti from 'canvas-confetti';

const QuizGame = () => {
    const [gameState, setGameState] = useState('intro'); // intro, playing, finished
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct', 'error', or null
    const [letterViewed, setLetterViewed] = useState(false);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleStart = () => {
        setGameState('playing');
    };

    const handleAnswer = (index) => {
        if (feedback) return; // Prevent double clicking

        const isCorrect = index === currentQuestion.correctIndex;
        setFeedback(isCorrect ? 'correct' : 'error');

        if (isCorrect) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff0000', '#ffa500', '#ffffff']
            });
        }

        // Wait for animation then proceed
        setTimeout(() => {
            setFeedback(null);
            if (currentQuestionIndex < quizData.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setGameState('finished');
                if (isCorrect) launchFinalConfetti();
            }
        }, 1500);
    };

    const launchFinalConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const getReward = () => {
        return quizData.rewards.find(r => score >= r.minScore) || quizData.rewards[quizData.rewards.length - 1];
    };

    const reward = gameState === 'finished' ? getReward() : null;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
        }}>

            {/* Background Hearts */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <Heart style={{ position: 'absolute', top: '10%', left: '10%' }} size={100} />
                <Heart style={{ position: 'absolute', bottom: '10%', right: '10%' }} size={150} />
                <Heart style={{ position: 'absolute', top: '40%', right: '20%' }} size={80} />
            </div>

            <AnimatePresence mode='wait'>
                {/* State: INTRO */}
                {gameState === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel"
                        style={{ padding: '40px', maxWidth: '600px', textAlign: 'center', borderRadius: '24px' }}
                    >
                        <div style={{ marginBottom: '20px' }}>
                            <Sparkles size={48} color="var(--color-gold)" />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: 1.1 }}>
                            {quizData.title}
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
                            {quizData.description}
                        </p>
                        <button
                            onClick={handleStart}
                            style={{
                                fontSize: '1.2rem',
                                padding: '16px 48px',
                                background: 'var(--color-primary)',
                                color: 'white',
                                borderRadius: '50px',
                                boxShadow: '0 10px 20px rgba(230, 0, 0, 0.4)',
                                transition: 'transform 0.2s'
                            }}
                        >
                            Start The Quiz
                        </button>
                    </motion.div>
                )}

                {/* State: PLAYING */}
                {gameState === 'playing' && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="glass-panel"
                        style={{ width: '100%', maxWidth: '600px', padding: '30px', borderRadius: '24px', position: 'relative' }}
                    >
                        <AnimatePresence>
                            {feedback && <FeedbackOverlay key="feedback" type={feedback} />}
                        </AnimatePresence>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            <span>Question {currentQuestion.id} / {quizData.questions.length}</span>
                            <span>Score: {score}</span>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', minHeight: '80px' }}>
                            {currentQuestion.question}
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {currentQuestion.options.map((option, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={!!feedback}
                                    style={{
                                        padding: '20px',
                                        textAlign: 'left',
                                        background: 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        cursor: feedback ? 'default' : 'pointer',
                                        transition: 'border-color 0.3s'
                                    }}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* State: FINISHED */}
                {gameState === 'finished' && (
                    <motion.div
                        key="finished"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel"
                        style={{ maxWidth: '600px', width: '100%', borderRadius: '24px', padding: '30px', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {!letterViewed ? (
                            // SHOW ENVELOPE FIRST
                            <>
                                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white' }}>
                                    Quiz Complete!
                                </h2>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>
                                    You scored {score} / {quizData.questions.length}. <br /> I have something for you...
                                </p>
                                <Envelope
                                    letterContent={quizData.letter}
                                    onClose={() => setLetterViewed(true)}
                                />
                            </>
                        ) : (
                            // AFTER LETTER IS VIEWED, SHOW REWARD (If Score > 4) OR JUST END
                            <>
                                {score > 4 ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div style={{ height: '250px', position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                                            <img
                                                src={reward?.image}
                                                alt="Reward"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                                padding: '20px',
                                                paddingTop: '60px'
                                            }}>
                                                <span style={{
                                                    background: 'var(--color-gold)',
                                                    color: 'black',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase'
                                                }}>
                                                    Grand Prize Unlocked!
                                                </span>
                                            </div>
                                        </div>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'white' }}>{reward?.title}</h2>
                                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>{reward?.description}</p>
                                    </motion.div>
                                ) : (
                                    <div style={{ padding: '20px' }}>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'white' }}>I Love You!</h2>
                                        <p style={{ color: 'var(--color-text-muted)' }}>
                                            Even though you didn't get a perfect score, you're still my Valentine. <br /> (Try again for the Reveal!)
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={() => window.location.reload()}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--color-text-muted)',
                                        padding: '12px 24px',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        marginTop: '20px'
                                    }}
                                >
                                    Play Again
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizGame;

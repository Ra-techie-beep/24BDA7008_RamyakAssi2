import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "I'm gonna cry...",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Bear Kissing"
            className="h-[200px]"
          />
          <div className="text-4xl font-bold my-4 text-center leading-tight">
            Yay! It's a date! <br /> ❤️
          </div>
        </>
      ) : (
        <>
          <img
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="Bear Asking"
            className="h-[200px]"
          />
          <h1 className="text-4xl font-bold my-4 text-center">Will you be my Valentine?</h1>
          <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-center">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4 transition-all duration-300`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleNoClick}
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

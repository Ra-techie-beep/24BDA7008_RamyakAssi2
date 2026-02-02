export const quizData = {
  title: "How Well Do You Know Information?",
  description: "Answer correctly to unlock your Valentine's Surprise!",
  questions: [
    {
      id: 1,
      question: "When was our official first date?",
      options: ["February 14th", "December 25th", "June 12th", "October 3rd"],
      correctIndex: 2 // Example date
    },
    {
      id: 2,
      question: "What color was I wearing on our first date?",
      options: ["Red Dress", "Blue Jeans & White Top", "Black Dress", "Yellow Sundress"],
      correctIndex: 2 // Example: Black Dress
    },
    {
      id: 3,
      question: "What is the one meal I could eat every single day?",
      options: ["Sushi", "Pizza", "Tacos", "Pasta"],
      correctIndex: 0 // Example: Sushi
    },
    {
      id: 4,
      question: "Where did we share our first kiss?",
      options: ["In the car", "At the doorstep", "In the park", "At the movies"],
      correctIndex: 1 // Example: Doorstep
    },
    {
      id: 5,
      question: "What is my dream honeymoon destination?",
      options: ["Paris", "Maldives", "Santorini", "Tokyo"],
      correctIndex: 1 // Example: Maldives
    }
  ],
  rewards: [
    {
      minScore: 5,
      title: "The Ultimate Date Night! 🌟",
      description: "Pack your bags! We're going on a weekend getaway to the mountains!",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80"
    },
    {
      minScore: 3,
      title: "Romantic Dinner Date 🍷",
      description: "I'm taking you to that fancy place you've been eyeing. Dress up!",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
    },
    {
      minScore: 0,
      title: "Cozy Movie Night 🍿",
      description: "Unlimited snacks, cuddles, and your choice of movie tonight.",
      image: "https://images.unsplash.com/photo-1517604931442-71053e6e2306?auto=format&fit=crop&w=600&q=80"
    }
  ],
  letter: {
    title: "My Dearest Valentine,",
    body: "From the moment we met, my life has been brighter.\n\nLooking back at our first date, hearing your laugh, and sharing all these small moments—it all means the world to me.\n\nI can't wait to create more memories with you. No matter what the score said, you are the only prize I need.\n\nForever yours,\n[Your Name]"
  }
};

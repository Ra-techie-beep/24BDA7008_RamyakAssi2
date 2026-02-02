import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizGame from './pages/QuizGame';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<QuizGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

'use client';

import { useState, useEffect } from 'react';

export default function LoveLetter() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const quiz = [
    {
      question: "What did we do on our first day together?",
      options: [
        "We talked all day long",
        "I spectated you play",
        "We watched a movie",
        "Nothing, you just came to my house"
      ],
      correct: 1
    },
    {
      question: "What game did we first play together?",
      options: [
        "Crossfire",
        "Call of Duty",
        "Mobile Legends (ML)",
        "Valorant"
      ],
      correct: 2
    },
    {
      question: "What did I do immaturely to see your reaction?",
      options: [
        "I ignored your messages",
        "I didn't contact you",
        "I pretended to be busy",
        "I cancelled our plans"
      ],
      correct: 1
    },
    {
      question: "What did you say when we played ML and lost? (Bisaya)",
      options: [
        "Kapoy nako oy",
        "Pahuway sa ta bem kay na stress nako",
        "Dili na ko mo duwa",
        "Lain na lang ta duwa"
      ],
      correct: 1
    },
    {
      question: "What made me feel really good that you told me?",
      options: [
        "That you love me",
        "That I'm smart",
        "That I am enough and accepted.",
        "That I'm handsome"
      ],
      correct: 2
    },
    {
      question: "Who did you share stories about that you loved the most?",
      options: [
        "Your mother",
        "Your siblings",
        "Your father",
        "Your best friend"
      ],
      correct: 2
    },
    {
      question: "What did you share with me that showed you trusted me?",
      options: [
        "Your dreams and goals",
        "Your passwords",
        "Your past experiences and breakups",
        "Your secrets"
      ],
      correct: 2
    },
    {
      question: "What did you say in a note when i stopped contacted you?",
      options: [
        "Inconsistent",
        "A boy instead of a man you could rely on",
        "Selfish instead of caring",
        "Distant instead of close"
      ],
      correct: 1
    },
    {
      question: "What did you do on the lobby in ML when you and i are online?",
      options: [
        "You spam in the lobby in and out!",
        "You just ignored me",
        "You just stayed in the lobby",
        "You  unfollowed me"
      ],
      correct: 0
    },
    {
      question: "Who am I eagerly waiting for?",
      options: [
        "The happy Gryzelle",
        "The Gryzelle I knew and loved",
        "The forgiving Gryzelle",
        "The understanding Gryzelle"
      ],
      correct: 1
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const getScorePercentage = () => {
    return Math.round((score / quiz.length) * 100);
  };

  const getVisibleParagraphs = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return 4;
    if (percentage >= 75) return 3;
    if (percentage >= 50) return 2;
    if (percentage >= 25) return 1;
    return 0;
  };

  const paragraphs = [
    `My heart still holds every precious moment from our first day together, the laughter, joy, conflicts, and even the contradictions. 
    I remember when we talked all day long; we were so happy that day, and I can still remember the feeling even until now. 
    I also remember when I immaturely didn't contact you just to see your reaction, and I still remember your reaction enough HAHA.`,
    
    `The ML we played though was the hilarious one. Remember the time when we played just to lose? You said, 
    "Pahuway sa ta bem kay na stress nako HAHAHAHAHAH." The best one is the tender kindness you expressed to me—by 
    expressing to me that I am enough and would surely be accepted by your relatives. It felt really good.`,
    
    `It felt like you started to trust me by sharing all of your past experiences: the breakups (your past relationships), 
    your parents, especially your father, whom you loved. But at that time, I was so immature to the point that I didn't 
    handle you maturely. I became a boy instead of a man you could rely on.`,
    
    `I am truly sorry for what I have done, and I really feel responsible even until now. I've made up my mind to resolve 
    the fault by changing. I've decided to have resolve and never again commit the same mistake. I promised myself to 
    understand you and never again deal with you immaturely. Above all else, I am eagerly waiting for the Gryzelle I knew and loved.`
  ];

  if (!quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border-2 border-rose-200 animate-fadeInUp">
          <div className="text-6xl mb-6 animate-bounce">💌</div>
          <h1 className="text-3xl font-serif text-amber-900 mb-4">A Letter Awaits</h1>
          <p className="text-amber-800/80 mb-6 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            Before you can read this special letter, please answer a few questions about our memories together. 
            Your score will determine how much of the letter you'll see.
          </p>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-rose-800 font-medium">Scoring Guide:</p>
            <ul className="text-sm text-rose-700 mt-2 space-y-1">
              <li>100% - See the complete letter ❤️</li>
              <li>75-99% - See most of the letter</li>
              <li>50-74% - See half of the letter</li>
              <li>25-49% - See some of the letter</li>
              <li>Below 25% - See a glimpse</li>
            </ul>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 active:shadow-md"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-rose-200 animate-fadeInUp">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-amber-800 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.length}</span>
              <span>Score: {score}/{currentQuestion}</span>
            </div>
            <div className="w-full bg-rose-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-amber-900 mb-6">
              {quiz[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 transform active:scale-95 ${
                    selectedAnswer === index
                      ? 'border-rose-500 bg-rose-50 shadow-md'
                      : 'border-amber-200 bg-white hover:border-rose-300 hover:bg-rose-25 hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`w-full py-3 rounded-full font-medium transition-all duration-300 transform ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      </div>
    );
  }

  if (showResult && !isRevealed) {
    const percentage = getScorePercentage();
    const visibleParagraphs = getVisibleParagraphs();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border-2 border-rose-200 animate-fadeInUp">
          <div className="text-6xl mb-6 animate-bounce">
            {percentage === 100 ? '🎉' : percentage >= 75 ? '😊' : percentage >= 50 ? '🙂' : '💕'}
          </div>
          <h2 className="text-3xl font-serif text-amber-900 mb-4">Quiz Complete!</h2>
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg p-6 mb-6">
            <p className="text-5xl font-bold mb-2">{percentage}%</p>
            <p className="text-sm">Your Score: {score} out of {quiz.length}</p>
          </div>
          <p className="text-amber-800/80 mb-6 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {percentage === 100 
              ? "Perfect! You remember everything! You'll see the complete letter. ❤️"
              : percentage >= 75
              ? "Great job! You'll see most of the letter."
              : percentage >= 50
              ? "Not bad! You'll see half of the letter."
              : percentage >= 25
              ? "You'll see some parts of the letter."
              : "You'll see a glimpse of the letter."}
          </p>
          <button
            onClick={() => setShowResult(false)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 active:shadow-md"
          >
            Open Your Letter
          </button>
        </div>
      </div>
    );
  }

  const visibleParagraphs = getVisibleParagraphs();
  const percentage = getScorePercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="heart-float absolute text-rose-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Main letter container with enhanced entrance animation */}
      <div className={`relative transition-all duration-1000 ease-out ${
        showContent 
          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
          : 'opacity-0 scale-75 translate-y-12 -rotate-3'
      }`}>
        {/* Wax seal */}
        {!isRevealed && (
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
            onClick={() => setIsRevealed(true)}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-xl flex items-center justify-center border-4 border-rose-900/30 group-hover:scale-110 group-active:scale-90 transition-transform duration-300">
                <span className="text-rose-100 text-2xl font-serif">❤</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-md animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Letter envelope effect */}
        <div className={`transition-all duration-1000 ${isRevealed ? 'translate-y-0 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="w-full h-8 bg-gradient-to-b from-amber-100 to-amber-200 border-b-2 border-amber-300"></div>
        </div>

        {/* Letter paper */}
        <div 
          className={`relative bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl transition-all duration-1000 ${
            isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'
          }`}
          style={{
            width: 'min(650px, 90vw)',
            minHeight: '700px',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                rgba(139, 92, 46, 0.03) 31px,
                rgba(139, 92, 46, 0.03) 32px
              )
            `,
          }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          ></div>

          {/* Vintage border */}
          <div className="absolute inset-4 border-2 border-amber-300/40 pointer-events-none"></div>
          <div className="absolute inset-6 border border-amber-200/60 pointer-events-none"></div>

          {/* Score badge */}
          <div className="absolute top-4 right-4 bg-rose-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-fadeIn">
            <div className="text-center">
              <div className="text-xl font-bold">{percentage}%</div>
              <div className="text-xs">Score</div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-12 md:p-16">
            {/* Date */}
            <div className={`text-right mb-8 transition-all duration-700 delay-300 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <p className="text-amber-800/70 italic" style={{ fontFamily: 'Georgia, serif' }}>
                February 6th, 2026
              </p>
            </div>

            {/* Salutation */}
            <div className={`mb-8 transition-all duration-700 delay-500 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <h1 className="text-4xl md:text-5xl mb-2" style={{ 
                fontFamily: "'Brush Script MT', cursive",
                color: '#8B4513',
                textShadow: '1px 1px 2px rgba(139, 69, 19, 0.1)'
              }}>
                My Dearest Gryzelle,
              </h1>
            </div>

            {/* Letter body */}
            <div className={`space-y-6 text-amber-900/90 leading-relaxed transition-all duration-700 delay-700 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ fontFamily: 'Georgia, serif', fontSize: '17px' }}>
              {paragraphs.slice(0, visibleParagraphs).map((paragraph, index) => (
                <p 
                  key={index}
                  className={index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-rose-700" : ""}
                >
                  {paragraph}
                </p>
              ))}
              
              {visibleParagraphs < paragraphs.length && (
                <div className="bg-amber-100/50 border-2 border-amber-300 rounded-lg p-6 text-center">
                  <p className="text-amber-800 italic">
                    {percentage === 0 
                      ? "Score higher to unlock the full letter... 💔"
                      : `You've unlocked ${visibleParagraphs} of ${paragraphs.length} paragraphs. Score ${visibleParagraphs === 3 ? '100%' : visibleParagraphs === 2 ? '75%+' : visibleParagraphs === 1 ? '50%+' : '25%+'} to see more... 💕`}
                  </p>
                </div>
              )}
            </div>

            {/* Closing - only show if 100% */}
            {percentage === 100 && (
              <div className={`mt-12 transition-all duration-700 delay-1000 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                <p className="text-amber-900/80 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  Forever and always,
                </p>
                <div className="text-4xl" style={{ 
                  fontFamily: "'Brush Script MT', cursive",
                  color: '#8B4513'
                }}>
                  With all my love, Ry
                </div>
              </div>
            )}

            {/* Decorative hearts */}
            {percentage === 100 && (
              <div className={`absolute bottom-8 right-8 flex gap-2 transition-all duration-700 delay-1200 ${
                isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}>
                <span className="text-rose-400 text-2xl animate-pulse" style={{ animationDelay: '0s' }}>♥</span>
                <span className="text-rose-500 text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                <span className="text-rose-400 text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
              </div>
            )}
          </div>
        </div>

        {/* Paper shadow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-900/20 to-rose-900/20 blur-2xl translate-y-4"></div>
      </div>

      {/* Instructions */}
      {!isRevealed && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce">
          <p className="text-rose-700/70 text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
            Click the seal to open your letter
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .heart-float {
          animation: heartFloat 15s infinite ease-in-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

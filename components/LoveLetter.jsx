'use client';

import { useState, useEffect } from 'react';

export default function LoveLetter() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isNoButtonDodging, setIsNoButtonDodging] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCallSignModal, setShowCallSignModal] = useState(false);
  const [callSign, setCallSign] = useState('');
  const [callSignError, setCallSignError] = useState('');
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  const CORRECT_PASSWORD = "bem";

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
        "Kapoy nako oie",
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
      question: "What did you say in a note when I stopped contacting you?",
      options: [
        "Inconsistent",
        "A boy instead of a man you could rely on",
        "Selfish instead of caring",
        "Distant instead of close"
      ],
      correct: 0
    },
    {
      question: "What did you do in the lobby in ML when you and I are online?",
      options: [
        "You spam in the lobby in and out!",
        "You just ignored me",
        "You just stayed in the lobby",
        "You unfollowed me"
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

  useEffect(() => {
    if (showFinalMessage) {
      const message = "Salamat Gryzelle ug pag amping pirmi and Happy Heart's day!";
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= message.length) {
          setTypedMessage(message.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [showFinalMessage]);

  const moveNoButton = () => {
    setIsNoButtonDodging(true);
    const randomTop = Math.random() * 60 + 10;
    const randomLeft = Math.random() * 60 + 10;
    setNoButtonPosition({ top: randomTop, left: randomLeft });
  };

  const handleQuestion1Yes = () => {
    setShowRatingModal(true);
  };

  const handleRating = (rating) => {
    if (rating === 10) {
      setShowRatingModal(false);
      setVerificationStep(1);
    } else {
      // Shake animation for wrong rating
      const modal = document.querySelector('.rating-modal');
      modal.classList.add('animate-shake');
      setTimeout(() => modal.classList.remove('animate-shake'), 400);
    }
  };

  const handleQuestion2Yes = () => {
    setVerificationStep(2);
  };

  const handleCallSignSubmit = (e) => {
    e.preventDefault();
    if (callSign.toLowerCase().trim() === 'bem') {
      setCallSignError('');
      setShowCallSignModal(false);
      setShowCongratsModal(true);
    } else {
      setCallSignError('Not quite right... Try again! 💕');
      setCallSign('');
    }
  };

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

  const handleSealClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      setIsRevealed(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Try again! 💔');
      setPassword('');
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  const handleClosingSealClick = () => {
    setShowClosingAnimation(true);
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 2000);
  };

  const handleRetakeQuiz = () => {
    setQuizCompleted(false);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsRevealed(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / quiz.length) * 100);
  };

  const getVisibleParagraphs = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 60) return 3;
    if (percentage >= 40) return 2;
    if (percentage >= 20) return 1;
    return 0;
  };

  const paragraphs = [
    `My heart still holds every precious moment from our first day together, the laughter, joy, conflicts, and even the contradictions. I remember when we talked all day long; we were so happy that day, and I can still remember the feeling even until now. I also remember when I immaturely didn't contact you just to see your reaction, and I still remember your reaction enough HAHA.`,
    
    `The ML we played though was the hilarious one. Remember the time when we played just to lose, katung na LS ta? You said, "Pahuway sa ta bem kay na stress na ko HAHAHAHAHAH." You always reacted also if I have another woman to play with, I can truly feel your consistency that day. You also have a spirit to help others, you are politically aware which I am not, we even have a contradicted opinion about politics, but you still patiently listened to me despite your conflicting beliefs towards the politician I voted and still respected my beliefs despite our differences. I really admire that about you. The best one is the tender kindness you expressed to me by expressing to me that I am enough and would surely be accepted by your relatives. It felt really good.`,
    
    `It felt like you started to trust me by sharing all of your past experiences: the breakups (your past relationships), your parents, especially your father, whom you loved. But at that time, I was so immature to the point that I didn't handle you maturely. I became a boy instead of a man you could rely on. I was selfish instead of caring, and I was distant instead of close.`,
    
    `As a result, it felt like you started to lose hope in us and started to act inconsistent and the worst part was that you never once again allowed me to see the Gryzelle I experienced on the first day. You became insanely distant, cold, and for somehow you still communicated, but still distant. The Gryzelle I once knew almost felt like a dream I could never experience again.`,
    
    `I am truly sorry for what I have done, and I really feel responsible even until now. I've made up my mind to resolve the fault by changing. I've decided to have resolve and never again commit the same mistake. I promised myself to understand you and never again deal with you immaturely. Even so, if you don't want to be with me, just say the word and I will leave. Above all else, I am eagerly waiting for the Gryzelle I knew and loved.`
  ];

  // Verification Screen
  if (!verificationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="heart-float absolute text-rose-300/30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 25 + 15}px`
              }}
            >
              ♥
            </div>
          ))}
        </div>

        <div className="max-w-lg w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-rose-200 animate-fadeInUp relative z-10">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce">💝</div>
            <h1 className="text-4xl font-serif text-rose-900 mb-3">Verification</h1>
            <p className="text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
              Before we begin, I need to verify it's really you...
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${verificationStep >= 0 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${verificationStep >= 1 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${verificationStep >= 2 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
          </div>

          {/* Question 1: Am I handsome? */}
          {verificationStep === 0 && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-2xl font-serif text-rose-900 mb-8">
                Am I handsome to you (igop)?
              </h2>
              <div className="flex gap-4 justify-center relative" style={{ minHeight: '60px' }}>
                <button
                  onClick={handleQuestion1Yes}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  Yes! 😍
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className={`bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                    isNoButtonDodging ? 'absolute' : ''
                  }`}
                  style={isNoButtonDodging ? {
                    top: `${noButtonPosition.top}%`,
                    left: `${noButtonPosition.left}%`,
                  } : {}}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* Rating Modal */}
          {showRatingModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border-2 border-rose-200 rating-modal">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-2xl font-serif text-rose-900 mb-2">Rate Me!</h3>
                  <p className="text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
                    From 1 to 10, how handsome am I?
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(num)}
                      className={`aspect-square rounded-xl font-bold text-lg transition-all duration-200 ${
                        num === 10
                          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:scale-110'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200 hover:scale-105'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Question 2: Do you love me? */}
          {verificationStep === 1 && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-2xl font-serif text-rose-900 mb-8">
                Do you love me?
              </h2>
              <div className="flex gap-4 justify-center relative" style={{ minHeight: '60px' }}>
                <button
                  onClick={handleQuestion2Yes}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  Yes! ❤️
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className={`bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                    isNoButtonDodging ? 'absolute' : ''
                  }`}
                  style={isNoButtonDodging ? {
                    top: `${noButtonPosition.top}%`,
                    left: `${noButtonPosition.left}%`,
                  } : {}}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* Question 3: Call sign */}
          {verificationStep === 2 && !showCallSignModal && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-2xl font-serif text-rose-900 mb-8">
                What's our call sign back then?
              </h2>
              <button
                onClick={() => setShowCallSignModal(true)}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
              >
                Enter Call Sign
              </button>
            </div>
          )}

          {/* Call Sign Modal */}
          {showCallSignModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border-2 border-rose-200 animate-modalAppear">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">📞</div>
                  <h3 className="text-2xl font-serif text-rose-900 mb-2">Our Call Sign</h3>
                  <p className="text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
                    What did we call each other?
                  </p>
                </div>

                <form onSubmit={handleCallSignSubmit}>
                  <input
                    type="text"
                    value={callSign}
                    onChange={(e) => {
                      setCallSign(e.target.value);
                      setCallSignError('');
                    }}
                    placeholder="Enter call sign..."
                    className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 mb-4 text-center text-lg bg-white/80 backdrop-blur-sm"
                    style={{ fontFamily: 'Georgia, serif' }}
                    autoFocus
                  />

                  {callSignError && (
                    <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm animate-shake" style={{ fontFamily: 'Georgia, serif' }}>
                      {callSignError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCallSignModal(false);
                        setCallSignError('');
                        setCallSign('');
                      }}
                      className="flex-1 bg-rose-100 text-rose-900 px-6 py-3 rounded-xl font-medium hover:bg-rose-200 transition-all duration-300 border-2 border-rose-200"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Congratulations Modal */}
          {showCongratsModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full border-2 border-rose-300 animate-modalAppear relative overflow-hidden">
                {/* Confetti background effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-fall absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24'][Math.floor(Math.random() * 4)],
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  <div className="text-8xl mb-6 animate-bounce">🎉</div>
                  <h2 className="text-4xl font-serif text-rose-900 mb-4 animate-fadeInUp">
                    Congratulations!
                  </h2>
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-rose-300 rounded-2xl p-6 mb-6 shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <p className="text-rose-800 text-lg mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Verification Complete ✓
                    </p>
                    <p className="text-2xl font-bold text-rose-600 mb-2">
                      You are
                    </p>
                    <h3 className="text-3xl font-serif text-rose-900 mb-1" style={{
                      textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
                    }}>
                      Gryzelle Marie Arias
                    </h3>
                    <div className="flex justify-center gap-2 mt-4">
                      <span className="text-rose-400 text-2xl animate-pulse">♥</span>
                      <span className="text-rose-500 text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                      <span className="text-rose-400 text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCongratsModal(false);
                      setVerificationComplete(true);
                    }}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full font-medium text-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    Continue to Quiz 💌
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Quiz Introduction
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
              <li>80-90% - See 4 paragraphs</li>
              <li>60-70% - See 3 paragraphs</li>
              <li>40-50% - See 2 paragraphs</li>
              <li>20-30% - See 1 paragraph</li>
              <li>Below 20% - See a glimpse</li>
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

  // Quiz Questions
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

  // Results Screen
  if (showResult && !isRevealed) {
    const percentage = getScorePercentage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-rose-200">
          <div className="text-6xl mb-6">
            {percentage === 100 ? '🎉' : percentage >= 80 ? '😊' : percentage >= 60 ? '🙂' : percentage >= 40 ? '💕' : '💔'}
          </div>
          
          <h1 className="text-4xl font-serif text-amber-900 mb-4">Quiz Complete!</h1>
          
          <div className="text-6xl font-bold text-rose-500 mb-2">{percentage}%</div>
          <p className="text-amber-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>Your Score: {score} out of {quiz.length}</p>
          
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 mb-8">
            <p className="text-amber-900 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              {percentage === 100
                ? "Perfect! You remember everything! You'll see the complete letter (all 5 paragraphs). ❤️"
                : percentage >= 80
                ? `Great job! You'll see 4 out of 5 paragraphs of the letter.`
                : percentage >= 60
                ? `Good! You'll see 3 out of 5 paragraphs of the letter.`
                : percentage >= 40
                ? `Not bad! You'll see 2 out of 5 paragraphs of the letter.`
                : percentage >= 20
                ? `You'll see 1 out of 5 paragraphs of the letter.`
                : "You'll see just a glimpse. Try to remember our memories better! 💔"}
            </p>
          </div>

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

  // Letter Display
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

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-rose-200 animate-modalAppear">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-2xl font-serif text-amber-900 mb-2">Enter Password</h2>
              <p className="text-amber-800/80" style={{ fontFamily: 'Georgia, serif' }}>
                Enter the password to unlock the letter
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 mb-4 text-center text-lg bg-white/80 backdrop-blur-sm"
                style={{ fontFamily: 'Georgia, serif' }}
                autoFocus
              />

              {passwordError && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm animate-shake" style={{ fontFamily: 'Georgia, serif' }}>
                  {passwordError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-amber-100 text-amber-900 px-6 py-3 rounded-lg font-medium hover:bg-amber-200 transition-all duration-300 border-2 border-amber-200"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main letter container with enhanced entrance animation */}
      <div className={`relative transition-all duration-1000 ease-out ${
        showContent 
          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
          : 'opacity-0 scale-75 translate-y-12 -rotate-3'
      } ${showClosingAnimation ? 'animate-letterClose' : ''}`}>
        {/* Wax seal */}
        {!isRevealed && (
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
            onClick={handleSealClick}
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

          {/* Content - Only show if revealed */}
          {isRevealed ? (
            <>
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
                  {/* Visible paragraphs */}
                  {paragraphs.slice(0, visibleParagraphs).map((paragraph, index) => (
                    <p 
                      key={index}
                      className={`text-justify ${index === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-rose-700" : ""}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                  
                  {/* Locked paragraphs with blur effect */}
                  {visibleParagraphs < paragraphs.length && (
                    <div className="relative">
                      {/* Blurred locked paragraphs */}
                      <div className="blur-sm select-none pointer-events-none opacity-60">
                        {paragraphs.slice(visibleParagraphs).map((paragraph, index) => (
                          <p key={`locked-${index}`} className="mb-6 text-justify">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* Overlay message */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-amber-100/90 backdrop-blur-sm border-2 border-amber-300 rounded-lg p-6 text-center shadow-lg max-w-md">
                          <div className="text-4xl mb-3">🔒</div>
                          <p className="text-amber-800 font-semibold italic mb-2">
                            You've unlocked {visibleParagraphs} of {paragraphs.length} paragraphs
                          </p>
                          <p className="text-amber-700 text-sm mb-4">
                            Score {
                              visibleParagraphs === 4 ? '100%' : 
                              visibleParagraphs === 3 ? '80%+' : 
                              visibleParagraphs === 2 ? '60%+' : 
                              visibleParagraphs === 1 ? '40%+' : '20%+'
                            } to see more... 💕
                          </p>
                          <button
                            onClick={handleRetakeQuiz}
                            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            Retake Quiz 🔄
                          </button>
                        </div>
                      </div>
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

                    {/* Closing Seal Button */}
                    {!showClosingAnimation && !showFinalMessage && (
                      <div className="mt-16 text-center">
                        <p className="text-amber-700/70 text-sm italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                          Click the seal to close the letter
                        </p>
                        <button
                          onClick={handleClosingSealClick}
                          className="group relative inline-block"
                        >
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-xl flex items-center justify-center border-4 border-rose-900/30 group-hover:scale-110 group-active:scale-90 transition-transform duration-300">
                              <span className="text-rose-100 text-3xl">❤</span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-md animate-pulse"></div>
                          </div>
                        </button>
                      </div>
                    )}
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
            </>
          ) : (
            /* Sealed letter preview */
            <div className="relative flex items-center justify-center" style={{ minHeight: '700px' }}>
              <div className="text-center">
                <div className="text-8xl mb-6 animate-floatGentle">💌</div>
                <p className="text-amber-800 text-2xl italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  A special letter awaits you...
                </p>
                <p className="text-amber-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
                  Click the heart seal above to unlock
                </p>
              </div>
            </div>
          )}
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

      {/* Final Message Screen */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="max-w-2xl w-full">
            {/* Letter envelope flap */}
            <div className="relative">
              <div className="w-full bg-gradient-to-b from-amber-100 to-amber-200 border-b-2 border-amber-300 h-12 rounded-t-lg"></div>
              
              {/* Closed envelope */}
              <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-2xl p-16 text-center border-2 border-rose-200 relative overflow-hidden">
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                  }}
                ></div>

                {/* Envelope icon */}
                <div className="text-8xl mb-8 animate-floatGentle">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-xl bg-rose-400/30 rounded-full"></div>
                    <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto relative z-10">
                      {/* Envelope body */}
                      <rect x="10" y="30" width="80" height="50" fill="#f3f4f6" stroke="#374151" strokeWidth="2" rx="2"/>
                      {/* Blue inner triangle */}
                      <polygon points="50,55 20,35 80,35" fill="#93c5fd"/>
                      {/* Heart */}
                      <path d="M50,45 C50,45 42,38 38,38 C34,38 32,40 32,44 C32,48 35,52 50,62 C65,52 68,48 68,44 C68,40 66,38 62,38 C58,38 50,45 50,45 Z" fill="#ef4444"/>
                      {/* Envelope flap lines */}
                      <line x1="10" y1="30" x2="50" y2="55" stroke="#374151" strokeWidth="2"/>
                      <line x1="90" y1="30" x2="50" y2="55" stroke="#374151" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>

                {/* Typed message */}
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-4xl font-serif text-rose-900 mb-6 min-h-[120px] leading-relaxed">
                    {typedMessage}
                    <span className="animate-blink">|</span>
                  </h1>
                  
                  {/* Hearts decoration */}
                  <div className="flex justify-center gap-3 mt-8">
                    <span className="text-rose-400 text-3xl animate-pulse" style={{ animationDelay: '0s' }}>♥</span>
                    <span className="text-rose-500 text-4xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                    <span className="text-rose-400 text-3xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
                  </div>
                </div>
              </div>

              {/* Wax seal at bottom */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-xl flex items-center justify-center border-4 border-rose-900/30">
                    <span className="text-rose-100 text-2xl">❤</span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
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

        @keyframes confettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(600px) rotate(720deg);
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

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes letterClose {
          0% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) rotateX(-10deg);
          }
          100% {
            transform: translateY(0) rotateX(0deg) scale(0.95);
            opacity: 0.8;
          }
        }

        .heart-float {
          animation: heartFloat 15s infinite ease-in-out;
        }

        .confetti-fall {
          animation: confettiFall 3s ease-in infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-modalAppear {
          animation: modalAppear 0.3s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        .animate-floatGentle {
          animation: floatGentle 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-letterClose {
          animation: letterClose 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

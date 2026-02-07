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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Set your password here
  const CORRECT_PASSWORD = 'gryzelle2026';

  const quiz = [
    {
      question: "What did we do on our first day together?",
      options: [
        "We talked all day long",
        "I spectated you play",
        "We watched a movie",
        "Nothing, you just came to my house"
      ],
      correct: 0
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
      correct: 1
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

  if (!quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-6xl mb-6">💌</div>
          <h1 className="text-4xl font-bold text-rose-600 mb-4">A Letter Awaits</h1>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Before you can read this special letter, please answer a few questions about our memories together. 
            Your score will determine how much of the letter you'll see.
          </p>
          
          <div className="bg-rose-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-rose-800 mb-3">Scoring Guide:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>100%</strong> - See the complete letter (all 5 paragraphs) ❤️</li>
              <li>• <strong>80-90%</strong> - See 4 paragraphs</li>
              <li>• <strong>60-70%</strong> - See 3 paragraphs</li>
              <li>• <strong>40-50%</strong> - See 2 paragraphs</li>
              <li>• <strong>20-30%</strong> - See 1 paragraph</li>
              <li>• <strong>Below 20%</strong> - A glimpse only</li>
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
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.length}</span>
              <span>Score: {score}/{currentQuestion}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95'
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="text-6xl mb-6">
            {percentage === 100 ? '🎉' : percentage >= 80 ? '😊' : percentage >= 60 ? '🙂' : percentage >= 40 ? '💕' : '💔'}
          </div>
          
          <h1 className="text-4xl font-bold text-rose-600 mb-4">Quiz Complete!</h1>
          
          <div className="text-6xl font-bold text-rose-500 mb-2">{percentage}%</div>
          <p className="text-gray-600 mb-6">Your Score: {score} out of {quiz.length}</p>
          
          <div className="bg-rose-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 text-lg">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-pink-100 py-12 px-4 relative overflow-hidden">
      {/* Animated heart background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 animate-hearts-slide"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='20' y='50' font-size='40' fill='%23e11d48' opacity='0.3'%3E♥%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-modal-appear">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-rose-600 mb-2">Enter Password</h2>
              <p className="text-gray-600">Enter the password to unlock the letter</p>
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
                className="w-full px-4 py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 mb-4 text-center text-lg"
                autoFocus
              />

              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm animate-shake">
                  {passwordError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main letter container */}
      <div className={`max-w-4xl mx-auto relative transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Wax seal */}
        {!isRevealed && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
            <div 
              onClick={handleSealClick}
              className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center text-white text-3xl cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-rose-800 animate-pulse-slow"
            >
              ❤
            </div>
          </div>
        )}

        {/* Letter paper */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-lg shadow-2xl p-8 md:p-16 border-8 border-amber-200 relative overflow-hidden">
          {/* Vintage paper texture */}
          <div className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
            }}
          />

          {/* Content - Only show if revealed */}
          {isRevealed ? (
            <div className="relative">
              {/* Score badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl z-10 border-4 border-white">
                <div className="text-2xl font-bold">{percentage}%</div>
                <div className="text-xs font-semibold">Score</div>
              </div>

              {/* Date */}
              <div className="text-right text-gray-500 mb-8 font-serif italic text-lg">
                February 6th, 2026
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
              <div  className={`space-y-6 text-amber-900/90 leading-relaxed transition-all duration-700 delay-700 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
                {paragraphs.slice(0, visibleParagraphs).map((paragraph, index) => (
                  <p key={index} className="font-serif text-justify">
                    <span className="text-7xl font-bold text-rose-600 float-left mr-3 mt-2 leading-none font-serif">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.substring(1)}
                  </p>
                ))}

                {visibleParagraphs < paragraphs.length && (
                  <div className="text-center py-8 my-8">
                    <div className="inline-block bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-400 text-rose-800 px-8 py-6 rounded-lg shadow-md">
                      <p className="font-serif italic text-lg">
                        {percentage === 0
                          ? "Score higher to unlock the full letter... 💔"
                          : `You've unlocked ${visibleParagraphs} of ${paragraphs.length} paragraphs. Score ${
                              visibleParagraphs === 4 ? '100%' : 
                              visibleParagraphs === 3 ? '80%+' : 
                              visibleParagraphs === 2 ? '60%+' : 
                              visibleParagraphs === 1 ? '40%+' : '20%+'
                            } to see more... 💕`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Closing - only show if 100% */}
              {percentage === 100 && (
                <div className="mt-16 text-right">
                  <p className="text-gray-600 font-serif italic text-lg mb-2">Forever and always,</p>
                  <p className="text-3xl font-bold text-rose-700 font-serif">
                    With all my love,<br />
                    Ry
                  </p>
                </div>
              )}

              {/* Decorative hearts */}
              {percentage === 100 && (
                <div className="text-center mt-12 text-rose-400 text-3xl space-x-6">
                  <span className="inline-block animate-heart-beat">♥</span>
                  <span className="inline-block animate-heart-beat animation-delay-200">♥</span>
                  <span className="inline-block animate-heart-beat animation-delay-400">♥</span>
                </div>
              )}
            </div>
          ) : (
            /* Sealed letter preview */
            <div className="relative flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-float-gentle">💌</div>
                <p className="text-gray-500 text-2xl font-serif italic">
                  A special letter awaits you...
                </p>
                <p className="text-gray-400 text-lg font-serif mt-4">
                  Click the heart seal above to unlock
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isRevealed && (
          <p className="text-center mt-6 text-rose-600 animate-pulse text-lg font-medium">
            Click the seal to open your letter
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes hearts-slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes heart-beat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes modal-appear {
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
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-hearts-slide {
          animation: hearts-slide 30s linear infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-heart-beat {
          animation: heart-beat 1.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
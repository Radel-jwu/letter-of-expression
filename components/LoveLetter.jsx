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
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [wrongAnswers, setWrongAnswers] = useState([]); // Track wrong answers
  const [isRetakingWrong, setIsRetakingWrong] = useState(false); // Track if retaking wrong answers only
  const [questionsToRetake, setQuestionsToRetake] = useState([]); // Questions to retake

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
        "I didn't contacted you",
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
      const message = "Salamat Gryzelle!!, pag amping pirmi ug Happy Hearts day!";
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

  const [loadingTypedMessage, setLoadingTypedMessage] = useState('');

  useEffect(() => {
    if (showLoadingAnimation) {
      const messages = [
        "This will be my biggest letter of appreciation for you.",
        "Hope you like it.",
        "Almost There...",
        "Ready?",
        "Thank you for the wait..."
      ];
      let messageIndex = 0;
      let charIndex = 0;
      
      const typeNextMessage = () => {
        if (messageIndex >= messages.length) {
          return;
        }
        
        const currentMessage = messages[messageIndex];
        const typingInterval = setInterval(() => {
          if (charIndex <= currentMessage.length) {
            setLoadingTypedMessage(currentMessage.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typingInterval);
            // Wait 1 second before showing next message
            setTimeout(() => {
              messageIndex++;
              charIndex = 0;
              typeNextMessage();
            }, 1000);
          }
        }, 50);
      };
      
      typeNextMessage();
    } else {
      setLoadingTypedMessage('');
    }
  }, [showLoadingAnimation]);

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
    const currentQuizIndex = isRetakingWrong 
      ? questionsToRetake[currentQuestion] 
      : currentQuestion;
    
    const isCorrect = selectedAnswer === quiz[currentQuizIndex].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    } else if (!isRetakingWrong) {
      // Only track wrong answers during first attempt
      setWrongAnswers(prev => [...prev, currentQuizIndex]);
    }

    const totalQuestions = isRetakingWrong ? questionsToRetake.length : quiz.length;
    
    if (currentQuestion < totalQuestions - 1) {
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
      setShowPasswordModal(false);
      setShowLoadingAnimation(true);
      setPassword('');
      setPasswordError('');
      
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += 1;
        setLoadingProgress(progress);
        if (progress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setShowLoadingAnimation(false);
            setIsRevealed(true);
          }, 500);
        }
      }, 100);
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
    setWrongAnswers([]);
    setIsRetakingWrong(false);
    setQuestionsToRetake([]);
  };

  const handleRetakeWrongOnly = () => {
    if (wrongAnswers.length > 0) {
      setQuestionsToRetake(wrongAnswers);
      setQuizCompleted(false);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setScore(score); // Keep existing score
      setSelectedAnswer(null);
      setShowResult(false);
      setIsRevealed(false);
      setIsRetakingWrong(true);
    }
  };

  const getScorePercentage = () => {
    return Math.round((score / quiz.length) * 100);
  };

  const getVisibleParagraphs = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return 6;
    if (percentage >= 90) return 5;
    if (percentage >= 70) return 4;
    if (percentage >= 50) return 3;
    if (percentage >= 30) return 2;
    if (percentage >= 10) return 1;
    return 0;
  };

  const paragraphs = [
    `My heart still holds every precious moment from our first day together—the laughter, joy, conflicts, and even the contradictions. I remember when we talked all day long; we were so happy that day, and I can still remember that feeling even now. I also remember when I immaturely didn't contact you just to see your reaction, and I still remember your reaction clearly—HAHA.`,

    `The ML games we played were hilarious. Remember the time we kept losing—katung na LS ta? You said, "Pahuway sa ta bem kay na stress na ko HAHAHAHAHAH." You always reacted whenever I played with another woman, even if it was just a random person, and that really made me feel how much you cared. I could truly feel your consistency back then, when everything between us was still okay.`,

    `You also have a strong spirit to help others. You are politically aware, which I am not. Even though we had opposing opinions about politics, you still patiently listened to me despite your conflicting beliefs about the politician I voted for. You respected my beliefs despite our differences, and I really admire that about you. The best part was the tender kindness you showed me—telling me that I was enough and that I would surely be accepted by your relatives. That made me feel really good.`,

    `It felt like you started to trust me when you shared your past experiences—your breakups, your parents, especially your father, whom you loved deeply. But at that time, I was too immature. I didn't handle you the way I should have. I became a boy instead of a man you could rely on. I was selfish instead of caring, and distant instead of close.`,

    `As a result, it felt like you started to lose hope in us. You became inconsistent, and the worst part was that you never again allowed me to see the Gryzelle I experienced on the first day. You became distant—cold—and even though you still communicated, you felt far away. The Gryzelle I once knew felt like a dream I could never experience again.`,

    `I am truly sorry for what I have done, and I still feel responsible even now. I've made up my mind to fix my mistakes by changing. I've chosen to be resolute and never repeat the same mistakes again. I promised myself that I would understand you and never treat you immaturely again. Even so, if you no longer want to be with me, just say the word and I will respect that decision. After all it's all in me that we've come to this state and i will take this burden forever, but not to permanently froze my world, but to improve as an individual. But despite everything, bisag unsa paka ka maldita, dawatun ra tana tanan, after all kay ni settle gud kug maldita, though maldita nga worth it, since si Gryzelle Marie Arias nagud ni HAHA. Above all else, I am eagerly waiting for the Gryzelle I knew and loved, forever and always.`
  ];

  // Front Page
  if (showFrontPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 animate-gradient-shift flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating hearts */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="heart-float absolute text-rose-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                fontSize: `${Math.random() * 30 + 20}px`
              }}
            >
              ♥
            </div>
          ))}
          
          {/* Sparkles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="sparkle-twinkle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Animated envelope */}
          <div className="mb-12 animate-floatGentle">
            <div className="relative inline-block">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 opacity-40 rounded-full scale-150"></div>
              
              {/* Envelope SVG */}
              <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto relative z-10 drop-shadow-2xl">
                {/* Envelope body */}
                <defs>
                  <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                
                <rect x="20" y="60" width="160" height="100" fill="url(#envelopeGradient)" stroke="#d97706" strokeWidth="3" rx="4" filter="url(#shadow)"/>
                
                {/* Envelope flap (animated) */}
                <polygon 
                  points="100,80 20,60 180,60" 
                  fill="#fbbf24" 
                  stroke="#d97706" 
                  strokeWidth="3"
                  className="animate-pulse"
                  style={{ transformOrigin: '100px 60px' }}
                />
                
                {/* Heart emerging from envelope */}
                <g className="animate-heartPulse">
                  <path 
                    d="M100,90 C100,90 85,75 78,75 C71,75 68,78 68,85 C68,92 73,100 100,120 C127,100 132,92 132,85 C132,78 129,75 122,75 C115,75 100,90 100,90 Z" 
                    fill="#ef4444"
                    filter="url(#shadow)"
                  />
                  {/* Heart shine */}
                  <ellipse cx="90" cy="82" rx="8" ry="10" fill="#fca5a5" opacity="0.6"/>
                </g>
                
                {/* Decorative stamp */}
                <circle cx="160" cy="140" r="12" fill="#dc2626" opacity="0.8"/>
                <text x="160" y="145" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">♥</text>
              </svg>
            </div>
          </div>

          {/* Title with typing effect appearance */}
          <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              A Letter For You
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-base sm:text-lg text-rose-700/80 max-w-2xl mx-auto leading-relaxed px-4" style={{ fontFamily: 'Georgia, serif' }}>
              I've prepared something special for you this Valentine's Day. 
              A journey through our memories, leading to a heartfelt message.
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-300"></div>
            <span className="text-2xl text-rose-400">❤</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-300"></div>
          </div>

          {/* Call to action */}
          <div className="animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <p className="text-sm sm:text-base text-rose-600/70 mb-6 italic" style={{ fontFamily: 'Georgia, serif' }}>
              Are you ready to begin?
            </p>
            
            <button
              onClick={() => setShowFrontPage(false)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-medium shadow-2xl hover:shadow-rose-400/50 transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden"
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center gap-3">
                <span>Open Your Letter</span>
                <span className="text-2xl group-hover:animate-bounce">💖</span>
              </span>
              
              {/* Sparkle effects on hover */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
            </button>

            {/* Subtle instruction */}
            <p className="text-xs sm:text-sm text-rose-500/60 mt-6 italic animate-pulse" style={{ fontFamily: 'Georgia, serif' }}>
              Click above to continue...
            </p>
          </div>

          {/* Bottom decorative elements */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 opacity-40">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes heartPulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes sparkleTwinkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: scale(1) rotate(180deg);
            }
          }

          .animate-heartPulse {
            animation: heartPulse 2s ease-in-out infinite;
          }

          .sparkle-twinkle {
            animation: sparkleTwinkle 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Verification Screen
  if (!verificationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 animate-gradient-shift flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
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

        <div className="max-w-lg w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 border-rose-200 animate-fadeInUp relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 animate-bounce">💝</div>
            <h1 className="text-3xl sm:text-4xl font-serif text-rose-900 mb-2 sm:mb-3">Verification</h1>
            <p className="text-sm sm:text-base text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
              Before we begin, I need to verify if this is really you...
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-6 sm:mb-8">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${verificationStep >= 0 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${verificationStep >= 1 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${verificationStep >= 2 ? 'bg-rose-500' : 'bg-rose-200'}`}></div>
          </div>

          {/* Question 1: Am I handsome? */}
          {verificationStep === 0 && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-xl sm:text-2xl font-serif text-rose-900 mb-6 sm:mb-8 px-2">
                Am I handsome to you? (hi gwapa)
              </h2>
              <div className="flex gap-3 sm:gap-4 justify-center relative" style={{ minHeight: '60px' }}>
                <button
                  onClick={handleQuestion1Yes}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  Yes! 😍
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className={`bg-gray-300 text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                    isNoButtonDodging ? 'absolute' : ''
                  }`}
                  style={isNoButtonDodging ? {
                    top: `${noButtonPosition.top}%`,
                    left: `${noButtonPosition.left}%`,
                  } : {}}
                >
                  No 😭
                </button>
              </div>
            </div>
          )}

          {/* Rating Modal */}
          {showRatingModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full border-2 border-rose-200 rating-modal">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">⭐</div>
                  <h3 className="text-xl sm:text-2xl font-serif text-rose-900 mb-2">Rate Me!</h3>
                  <p className="text-sm sm:text-base text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
                    On a scale of 1 to 10, unsa ko ka gwapo?
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(num)}
                      className={`aspect-square rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-200 ${
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
              <h2 className="text-xl sm:text-2xl font-serif text-rose-900 mb-6 sm:mb-8 px-2">
                Do you love me?
              </h2>
              <div className="flex gap-3 sm:gap-4 justify-center relative" style={{ minHeight: '60px' }}>
                <button
                  onClick={handleQuestion2Yes}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  Yes! ❤️
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className={`bg-gray-300 text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                    isNoButtonDodging ? 'absolute' : ''
                  }`}
                  style={isNoButtonDodging ? {
                    top: `${noButtonPosition.top}%`,
                    left: `${noButtonPosition.left}%`,
                  } : {}}
                > 
                  No 😭
                </button>
              </div>
            </div>
          )}

          {/* Question 3: Call sign */}
          {verificationStep === 2 && !showCallSignModal && (
            <div className="text-center animate-fadeIn">
              <h2 className="text-xl sm:text-2xl font-serif text-rose-900 mb-6 sm:mb-8 px-2">
                What's our call sign back then?
              </h2>
              <button
                onClick={() => setShowCallSignModal(true)}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
              >
                Enter Call Sign
              </button>
            </div>
          )}

          {/* Call Sign Modal */}
          {showCallSignModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full border-2 border-rose-200 animate-modalAppear">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-serif text-rose-900 mb-2">Our CS</h3>
                  <p className="text-sm sm:text-base text-rose-700/80" style={{ fontFamily: 'Georgia, serif' }}>
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 mb-4 text-center text-base sm:text-lg bg-white/80 backdrop-blur-sm"
                    style={{ fontFamily: 'Georgia, serif' }}
                    autoFocus
                  />

                  {callSignError && (
                    <div className="bg-red-50 border-2 border-red-300 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl mb-4 text-xs sm:text-sm animate-shake" style={{ fontFamily: 'Georgia, serif' }}>
                      {callSignError}
                    </div>
                  )}

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCallSignModal(false);
                        setCallSignError('');
                        setCallSign('');
                      }}
                      className="flex-1 bg-rose-100 text-rose-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-rose-200 transition-all duration-300 border-2 border-rose-200"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-lg w-full border-2 border-rose-300 animate-modalAppear relative overflow-hidden">
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
                  <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 animate-bounce">🎉</div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-rose-900 mb-3 sm:mb-4 animate-fadeInUp">
                    Congratulations!
                  </h2>
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-rose-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <p className="text-rose-800 text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Verification Complete ✓
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-rose-600 mb-1 sm:mb-2">
                      You are indeed
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-rose-900 mb-1 break-words" style={{
                      textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
                    }}>
                      Gryzelle Marie Arias
                    </h3>
                    <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                      <span className="text-rose-400 text-xl sm:text-2xl animate-pulse">♥</span>
                      <span className="text-rose-500 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                      <span className="text-rose-400 text-xl sm:text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCongratsModal(false);
                      setVerificationComplete(true);
                    }}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 animate-gradient-shift-slow flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center border-2 border-rose-200 animate-fadeInUp">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-bounce">💌</div>
          <h1 className="text-2xl sm:text-3xl font-serif text-amber-900 mb-3 sm:mb-4">A Letter Awaits</h1>
          <p className="text-sm sm:text-base text-amber-800/80 mb-4 sm:mb-6 leading-relaxed px-2" style={{ fontFamily: 'Georgia, serif' }}>
            Before you can read this special letter, please answer a few questions about our memories together. 
            Your score will determine how much of the letter you'll see.
          </p>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2">Scoring Guide:</p>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2"> 100% - See everything</p>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2"> 80%+ - See 5 paragraphs</p>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2"> 60%+ - See 4 paragraphs</p>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2"> 40%+ - See 3 paragraphs</p>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mb-2"> 20%+ - See 2 paragraphs</p>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 active:shadow-md"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Questions
  if (quizStarted && !quizCompleted) {
    const currentQuizIndex = isRetakingWrong ? questionsToRetake[currentQuestion] : currentQuestion;
    const totalQuestions = isRetakingWrong ? questionsToRetake.length : quiz.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 animate-gradient-shift-slow flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 border-2 border-rose-200 animate-fadeInUp">
          {/* Progress bar */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-amber-800 mb-2">
              <span>
                {isRetakingWrong ? 'Retaking Wrong Answers: ' : 'Question '}
                {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>Total Score: {score}/{quiz.length}</span>
            </div>
            <div className="w-full bg-rose-100 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-amber-900 mb-4 sm:mb-6">
              {quiz[currentQuizIndex].question}
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {quiz[currentQuizIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 transform active:scale-95 ${
                    selectedAnswer === index
                      ? 'border-rose-500 bg-rose-50 shadow-md'
                      : 'border-amber-200 bg-white hover:border-rose-300 hover:bg-rose-25 hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-sm sm:text-base text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
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
            className={`w-full py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 transform ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResult && !isRevealed) {
    const percentage = getScorePercentage();
    const isRetakeResult = isRetakingWrong;

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 animate-gradient-shift-slow flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 text-center border-2 border-rose-200">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">
            {percentage === 100 ? '🎉' : percentage >= 80 ? '😊' : percentage >= 60 ? '🙂' : percentage >= 40 ? '💕' : '💔'}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif text-amber-900 mb-3 sm:mb-4">
            {isRetakeResult ? 'Retake Complete!' : 'Quiz Complete!'}
          </h1>
          
          <div className="text-5xl sm:text-6xl font-bold text-rose-500 mb-2">{percentage}%</div>
          <p className="text-sm sm:text-base text-amber-800 mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>Your Score: {score} out of {quiz.length}</p>
          
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-amber-900 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              {percentage === 100
                ? isRetakeResult 
                  ? "You will finally see the last paragraph (will also be my last message just for you). ❤️"
                  : "Perfect! You remember everything! You'll see the complete letter (all 6 paragraphs). ❤️"
                : percentage >= 90
                ? `Amazing! You'll see 5 out of 6 paragraphs of the letter.`
                : percentage >= 70
                ? `Great job! You'll see 4 out of 6 paragraphs of the letter.`
                : percentage >= 50
                ? `Good! You'll see 3 out of 6 paragraphs of the letter.`
                : percentage >= 30
                ? `Not bad! You'll see 2 out of 6 paragraphs of the letter.`
                : percentage >= 10
                ? `You'll see 1 out of 6 paragraphs of the letter.`
                : "You'll see just a glimpse. Try to remember our memories better! 💔"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => setShowResult(false)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 active:shadow-md"
            >
              Open Your Letter
            </button>
            
            {/* Show retake options if not perfect score */}
            {percentage < 100 && wrongAnswers.length > 0 && (
              <button
                onClick={handleRetakeWrongOnly}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 active:shadow-md"
              >
                Retake Wrong Answers ({wrongAnswers.length}) 🔄
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const visibleParagraphs = getVisibleParagraphs();
  const percentage = getScorePercentage();

  // Letter Display
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 animate-gradient-shift-slow flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden relative">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border-2 border-rose-200 animate-modalAppear">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔐</div>
              <h2 className="text-xl sm:text-2xl font-serif text-amber-900 mb-2">Enter our Password</h2>
              <p className="text-sm sm:text-base text-amber-800/80" style={{ fontFamily: 'Georgia, serif' }}>
                Enter our password to unlock the letter
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 mb-4 text-center text-base sm:text-lg bg-white/80 backdrop-blur-sm"
                style={{ fontFamily: 'Georgia, serif' }}
                autoFocus
              />

              {passwordError && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-4 text-xs sm:text-sm animate-shake" style={{ fontFamily: 'Georgia, serif' }}>
                  {passwordError}
                </div>
              )}

              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-amber-100 text-amber-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-amber-200 transition-all duration-300 border-2 border-amber-200"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Animation Modal */}
      {showLoadingAnimation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-lg w-full border-2 border-rose-300 animate-modalAppear relative overflow-hidden">
            {/* Floating hearts in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="heart-float absolute text-rose-300/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${Math.random() * 20 + 10}px`
                  }}
                >
                  ♥
                </div>
              ))}
            </div>

            <div className="text-center relative z-10">
              {/* Animated envelope opening */}
              <div className="mb-6 sm:mb-8 relative">
                <div className="inline-block animate-floatGentle">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 mx-auto">
                    {/* Envelope body */}
                    <rect x="10" y="35" width="80" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2"/>
                    {/* Envelope flap opening animation */}
                    <polygon 
                      points="50,40 10,35 90,35" 
                      fill="#fcd34d" 
                      stroke="#d97706" 
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    {/* Heart emerging */}
                    <path 
                      d="M50,50 C50,50 42,43 38,43 C34,43 32,45 32,49 C32,53 35,57 50,67 C65,57 68,53 68,49 C68,45 66,43 62,43 C58,43 50,50 50,50 Z" 
                      fill="#ef4444"
                      className="animate-pulse"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Typed message */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-rose-900 mb-4 min-h-[80px] sm:min-h-[100px] leading-relaxed px-2">
                  {loadingTypedMessage}
                  <span className="animate-blink">|</span>
                </h2>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-rose-200 rounded-full h-3 sm:h-4 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 h-full rounded-full transition-all duration-300 animate-gradient-shift"
                  style={{ 
                    width: `${loadingProgress}%`,
                    backgroundSize: '200% 100%'
                  }}
                >
                  <div className="w-full h-full bg-white/20 animate-shimmer"></div>
                </div>
              </div>

              {/* Loading percentage */}
              <p className="text-rose-700 font-medium text-sm sm:text-base">
                {loadingProgress}%
              </p>

              {/* Decorative hearts */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-6">
                <span className="text-rose-400 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0s' }}>♥</span>
                <span className="text-rose-500 text-3xl sm:text-4xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                <span className="text-rose-400 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main letter container with enhanced entrance animation */}
      <div className={`relative w-full max-w-[650px] mx-auto transition-all duration-1000 ease-out ${
        showContent 
          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
          : 'opacity-0 scale-75 translate-y-12 -rotate-3'
      } ${showClosingAnimation ? 'animate-letterClose' : ''}`}>
        {/* Wax seal */}
        {!isRevealed && (
          <div 
            className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
            onClick={handleSealClick}
          >
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 shadow-xl flex items-center justify-center border-3 sm:border-4 border-rose-950/40 group-hover:scale-110 group-active:scale-90 transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(190, 18, 60, 0.6), 0 0 20px rgba(190, 18, 60, 0.3)'
                }}
              >
                <span className="text-rose-100 text-xl sm:text-2xl font-serif drop-shadow-lg">❤</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-rose-600/40 blur-xl animate-pulse-slow"></div>
              <div className="absolute inset-0 rounded-full bg-rose-400/20 blur-2xl animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Letter envelope effect */}
        <div className={`transition-all duration-1000 ${isRevealed ? 'translate-y-0 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="w-full h-6 sm:h-8 bg-gradient-to-b from-amber-100 to-amber-200 border-b-2 border-amber-300"></div>
        </div>

        {/* Letter paper */}
        <div 
          className={`relative bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl transition-all duration-1000 mx-auto rounded-sm ${
            isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'
          }`}
          style={{
            width: '100%',
            maxWidth: '650px',
            minHeight: '600px',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                rgba(139, 92, 46, 0.03) 31px,
                rgba(139, 92, 46, 0.03) 32px
              )
            `,
            boxShadow: `
              0 20px 60px -15px rgba(139, 69, 19, 0.3),
              0 8px 20px -5px rgba(139, 69, 19, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.6)
            `
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
          <div className="absolute inset-3 sm:inset-4 border-2 border-amber-300/40 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-4 sm:inset-6 border border-amber-200/60 pointer-events-none rounded-sm"></div>
          
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-amber-400/50 pointer-events-none rounded-tl-sm"></div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-amber-400/50 pointer-events-none rounded-tr-sm"></div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-amber-400/50 pointer-events-none rounded-bl-sm"></div>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-amber-400/50 pointer-events-none rounded-br-sm"></div>

          {/* Content - Only show if revealed */}
          {isRevealed ? (
            <>
              {/* Score badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-rose-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg animate-fadeIn">
                <div className="text-center">
                  <div className="text-base sm:text-xl font-bold">{percentage}%</div>
                  <div className="text-[10px] sm:text-xs">Score</div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
                {/* Date */}
                <div className={`text-right mb-4 sm:mb-6 md:mb-8 transition-all duration-700 delay-300 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  <p className="text-xs sm:text-sm text-amber-800/70 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    February 6th, 2026
                  </p>
                </div>

                {/* Salutation */}
                <div className={`mb-4 sm:mb-6 md:mb-8 transition-all duration-700 delay-500 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2" style={{ 
                    fontFamily: "'Brush Script MT', cursive",
                    color: '#8B4513',
                    textShadow: '1px 1px 2px rgba(139, 69, 19, 0.1)'
                  }}>
                    My Dearest Gryzelle,
                  </h1>
                </div>

                {/* Letter body */}
                <div className={`space-y-4 sm:space-y-5 md:space-y-6 text-amber-900/90 leading-relaxed transition-all duration-700 delay-700 ${
                  isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`} style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(14px, 2.5vw, 17px)' }}>
                  {/* Visible paragraphs */}
                  {paragraphs.slice(0, visibleParagraphs).map((paragraph, index) => (
                    <p 
                      key={index}
                      className={`text-justify ${index === 0 ? "first-letter:text-4xl sm:first-letter:text-5xl md:first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-rose-700" : ""}`}
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
                          <p key={`locked-${index}`} className="mb-4 sm:mb-5 md:mb-6 text-justify">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* Overlay message */}
                      <div className="absolute inset-0 flex items-center justify-center px-2">
                        <div className="bg-amber-100/90 backdrop-blur-sm border-2 border-amber-300 rounded-lg p-4 sm:p-5 md:p-6 text-center shadow-lg max-w-md w-full">
                          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔒</div>
                          <p className="text-amber-800 font-semibold italic mb-1 sm:mb-2 text-sm sm:text-base">
                            You've unlocked {visibleParagraphs} of {paragraphs.length} paragraphs
                          </p>
                          <p className="text-amber-700 text-xs sm:text-sm mb-3 sm:mb-4">
                            Score {
                              visibleParagraphs === 5 ? '100%' : 
                              visibleParagraphs === 4 ? '90%+' : 
                              visibleParagraphs === 3 ? '70%+' : 
                              visibleParagraphs === 2 ? '50%+' :
                              visibleParagraphs === 1 ? '30%+' : '10%+'
                            } to see more... 💕
                          </p>
                          <div className="flex flex-col gap-2">
                            {wrongAnswers.length > 0 && (
                              <button
                                onClick={handleRetakeWrongOnly}
                                className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
                                style={{ fontFamily: 'Georgia, serif' }}
                              >
                                Retake Wrong Answers ({wrongAnswers.length}) 🔄
                              </button>
                            )}
                            <button
                              onClick={handleRetakeQuiz}
                              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              Retake Full Quiz 🔄
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Closing - only show if 100% */}
                {percentage === 100 && (
                  <div className={`mt-8 sm:mt-10 md:mt-12 transition-all duration-700 delay-1000 ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  }`}>
                    <p className="text-amber-900/80 mb-6 sm:mb-8 text-sm sm:text-base" style={{ fontFamily: 'Georgia, serif' }}>
                      With all my love,
                    </p>
                    <div className="text-2xl sm:text-3xl md:text-4xl" style={{ 
                      fontFamily: "'Brush Script MT', cursive",
                      color: '#8B4513'
                    }}>
                      Del
                    </div>
                    

                    {/* Closing Seal Button */}
                    {!showClosingAnimation && !showFinalMessage && (
                      <div className="mt-10 sm:mt-12 md:mt-16 text-center">
                        <p className="text-amber-700/70 text-xs sm:text-sm italic mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                          Click the seal to close the letter
                        </p>
                        <button
                          onClick={handleClosingSealClick}
                          className="group relative inline-block"
                        >
                          <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 shadow-xl flex items-center justify-center border-3 sm:border-4 border-rose-950/40 group-hover:scale-110 group-active:scale-90 transition-all duration-300 group-hover:shadow-2xl"
                              style={{
                                boxShadow: '0 10px 30px -5px rgba(190, 18, 60, 0.6), 0 0 20px rgba(190, 18, 60, 0.3)'
                              }}
                            >
                              <span className="text-rose-100 text-2xl sm:text-3xl drop-shadow-lg">❤</span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-rose-600/40 blur-xl animate-pulse-slow"></div>
                            <div className="absolute inset-0 rounded-full bg-rose-400/20 blur-2xl animate-pulse"></div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Decorative hearts */}
                {percentage === 100 && (
                  <div className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex gap-1.5 sm:gap-2 transition-all duration-700 delay-1200 ${
                    isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-rose-400 text-lg sm:text-xl md:text-2xl animate-pulse drop-shadow-lg" style={{ animationDelay: '0s' }}>♥</span>
                    <span className="text-rose-500 text-xl sm:text-2xl md:text-3xl animate-pulse drop-shadow-lg" style={{ animationDelay: '0.2s' }}>♥</span>
                    <span className="text-rose-400 text-lg sm:text-xl md:text-2xl animate-pulse drop-shadow-lg" style={{ animationDelay: '0.4s' }}>♥</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Sealed letter preview */
            <div className="relative flex items-center justify-center" style={{ minHeight: '600px' }}>
              <div className="text-center px-4">
                <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 animate-floatGentle">💌</div>
                <p className="text-amber-800 text-xl sm:text-2xl italic mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  A special letter awaits you...
                </p>
                <p className="text-amber-600 italic text-sm sm:text-base" style={{ fontFamily: 'Georgia, serif' }}>
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
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-center animate-bounce px-4">
          <p className="text-rose-700/70 text-xs sm:text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
            Click the seal to open your letter
          </p>
        </div>
      )}

      {/* Final Message Screen */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 animate-gradient-shift-slow flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
          <div className="max-w-2xl w-full">
            {/* Letter envelope flap */}
            <div className="relative">
              <div className="w-full bg-gradient-to-b from-amber-100 to-amber-200 border-b-2 border-amber-300 h-8 sm:h-12 rounded-t-lg"></div>
              
              {/* Closed envelope */}
              <div className="bg-white/90 backdrop-blur-sm rounded-b-xl sm:rounded-b-2xl shadow-2xl p-8 sm:p-12 md:p-16 text-center border-2 border-rose-200 relative overflow-hidden">
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                  }}
                ></div>

                {/* Envelope icon */}
                <div className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8 animate-floatGentle">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-xl bg-rose-400/30 rounded-full"></div>
                    <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto relative z-10">
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
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-rose-900 mb-4 sm:mb-6 min-h-[100px] sm:min-h-[120px] leading-relaxed px-2">
                    {typedMessage}
                    <span className="animate-blink">|</span>
                  </h1>
                  
                  {/* Hearts decoration */}
                  <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                    <span className="text-rose-400 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0s' }}>♥</span>
                    <span className="text-rose-500 text-3xl sm:text-4xl animate-pulse" style={{ animationDelay: '0.2s' }}>♥</span>
                    <span className="text-rose-400 text-2xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.4s' }}>♥</span>
                  </div>
                </div>
              </div>

              {/* Wax seal at bottom */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 shadow-xl flex items-center justify-center border-3 sm:border-4 border-rose-900/30">
                    <span className="text-rose-100 text-xl sm:text-2xl">❤</span>
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

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        .animate-gradient-shift-slow {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* Ensure touch targets are large enough on mobile */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}

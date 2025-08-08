import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'anxiety',
    question: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 2,
    category: 'anxiety',
    question: "How often have you been unable to stop or control worrying?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 3,
    category: 'depression',
    question: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 4,
    category: 'depression',
    question: "How often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 5,
    category: 'stress',
    question: "How often have you found it difficult to relax?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 6,
    category: 'stress',
    question: "How often have you felt overwhelmed by daily responsibilities?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  },
  {
    id: 7,
    category: 'general',
    question: "How would you rate your overall sleep quality?",
    options: [
      { text: "Excellent", value: 0 },
      { text: "Good", value: 1 },
      { text: "Fair", value: 2 },
      { text: "Poor", value: 3 }
    ]
  },
  {
    id: 8,
    category: 'general',
    question: "How often do you feel supported by friends and family?",
    options: [
      { text: "Always", value: 0 },
      { text: "Most of the time", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Rarely or never", value: 3 }
    ]
  },
  {
    id: 9,
    category: 'anxiety',
    question: "How often do you experience physical symptoms like rapid heartbeat or sweating when anxious?",
    options: [
      { text: "Never", value: 0 },
      { text: "Occasionally", value: 1 },
      { text: "Often", value: 2 },
      { text: "Very frequently", value: 3 }
    ]
  },
  {
    id: 10,
    category: 'depression',
    question: "How often do you have trouble concentrating on things like work, school, or reading?",
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ]
  }
];

const Quiz = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    setIsAnimating(true);
    
    setTimeout(() => {
      const newAnswers = [...answers];
      const existingIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestion].id);
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex].answer = selectedAnswer;
      } else {
        newAnswers.push({
          questionId: questions[currentQuestion].id,
          answer: selectedAnswer
        });
      }
      
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        onComplete(newAnswers);
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        const prevAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id);
        setSelectedAnswer(prevAnswer ? prevAnswer.answer : null);
        setIsAnimating(false);
      }, 300);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'anxiety': return 'from-red-500 to-orange-500';
      case 'depression': return 'from-blue-500 to-indigo-500';
      case 'stress': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-teal-500';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'anxiety': return 'Anxiety Assessment';
      case 'depression': return 'Mood Assessment';
      case 'stress': return 'Stress Evaluation';
      default: return 'General Wellness';
    }
  };

  useEffect(() => {
    const existing = answers.find(a => a.questionId === questions[currentQuestion].id);
    if (existing) {
      setSelectedAnswer(existing.answer);
    }
  }, [currentQuestion, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">Mental Health Assessment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(questions[currentQuestion].category)}`}>
                {getCategoryLabel(questions[currentQuestion].category)}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ${
                    selectedAnswer === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-900 font-medium">
                      {option.text}
                    </span>
                    {selectedAnswer === option.value && (
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Take your time to answer honestly. All responses are confidential and used only for assessment purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
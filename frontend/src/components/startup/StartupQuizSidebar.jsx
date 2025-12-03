import React, { useState } from "react";
import { Brain, Trophy, Clock, Award, Play, RotateCcw } from "lucide-react";

const StartupQuizSidebar = ({ isOwner }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizData = {
    title: "Startup Knowledge Quiz",
    questions: [
      {
        question: "What is the most important factor for startup success?",
        options: [
          "Great idea",
          "Product-market fit",
          "Large funding",
          "Perfect team",
        ],
        correct: 1,
      },
      {
        question: "When should you seek Series A funding?",
        options: [
          "Before building MVP",
          "After proving product-market fit",
          "When you have an idea",
          "After Series B",
        ],
        correct: 1,
      },
      {
        question: "What does MVP stand for?",
        options: [
          "Most Valuable Product",
          "Minimum Viable Product",
          "Maximum Value Proposition",
          "Market Validation Process",
        ],
        correct: 1,
      },
      {
        question:
          "What percentage of equity is typically reserved for employees?",
        options: ["5-10%", "10-20%", "20-30%", "30-40%"],
        correct: 1,
      },
      {
        question: "What is the primary purpose of a pitch deck?",
        options: [
          "Show financial details",
          "Tell your story and vision",
          "List all features",
          "Prove profitability",
        ],
        correct: 1,
      },
    ],
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score) => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 80)
      return { message: "Excellent! 🚀", color: "text-green-600" };
    if (percentage >= 60)
      return { message: "Good! 📚", color: "text-[#6EA9CB]" };
    if (percentage >= 40)
      return { message: "Getting there! 💪", color: "text-yellow-600" };
    return { message: "Keep learning! 📖", color: "text-red-600" };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-4 sticky top-20">
      {/* Startup Quiz */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-[#6EA9CB]" />
            {quizData.title}
          </h3>
        </div>

        <div className="p-4">
          {!quizStarted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#f0f9ff] rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-[#6EA9CB]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Test Your Knowledge
                </h4>
                <p className="text-xs text-gray-600 mb-4">
                  Quick 5-question quiz to test your startup knowledge
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>2 mins</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-3 h-3 mr-1" />
                    <span>5 questions</span>
                  </div>
                </div>
              </div>
              <button
                onClick={startQuiz}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#6EA9CB] text-white rounded-lg hover:bg-[#5a8fa8] transition-colors text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                <span>Start Quiz</span>
              </button>
            </div>
          ) : showResults ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  {calculateScore()}/{quizData.questions.length}
                </h4>
                <p
                  className={`text-sm font-medium ${
                    getScoreMessage(calculateScore()).color
                  }`}
                >
                  {getScoreMessage(calculateScore()).message}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You got {calculateScore()} out of {quizData.questions.length}{" "}
                  questions right!
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={resetQuiz}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#6EA9CB] text-white rounded-lg hover:bg-[#5a8fa8] transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => setQuizStarted(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Back to Start
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </span>
                <div className="flex space-x-1">
                  {quizData.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index <= currentQuestion
                          ? "bg-[#6EA9CB]"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 leading-tight">
                  {quizData.questions[currentQuestion].question}
                </h4>
                <div className="space-y-2">
                  {quizData.questions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full text-left p-3 border rounded-lg text-sm transition-colors ${
                          answers[currentQuestion] === index
                            ? "bg-[#DCE8F2] border-[#6EA9CB] text-[#1F2D3D]"
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
        </div>

        <div className="p-4 space-y-3">
          <div
            className="flex items-center justify-between p-3 rounded-lg"
            style={{ backgroundColor: "#DCE8F2" }}
          >
            <div className="flex items-center">
              <Brain className="w-4 h-4 text-[#6EA9CB] mr-2" />
              <span
                className="text-sm font-medium"
                style={{ color: "#1F2D3D" }}
              >
                Knowledge Level
              </span>
            </div>
            <span className="text-sm font-bold text-[#6EA9CB]">Beginner</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Trophy className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Quizzes Taken
              </span>
            </div>
            <span className="text-sm font-bold text-green-600">0</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <Award className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Best Score
              </span>
            </div>
            <span className="text-sm font-bold text-purple-600">0%</span>
          </div>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Learn More</h3>
        </div>

        <div className="p-4 space-y-3">
          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Startup Fundamentals
            </span>
            <Brain className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Funding Guide
            </span>
            <Trophy className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Market Research
            </span>
            <Award className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupQuizSidebar;

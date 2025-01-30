'use client';

import { useState, useEffect } from 'react';
import { QuizCard } from './components/QuizCard';
import { StartCard } from './components/StartCard';
import { ResultCard } from './components/ResultCard';
import { QuizGenerator } from './components/QuizGenerator';
import { QuizData, QuizQuestion, QuizResult } from './types/quiz';

// Predefined quiz data as fallback
const predefinedQuizData: QuizData = {
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      points: 10
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      points: 10
    },
    {
      id: 3,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale",
      points: 10
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      points: 10
    },
    {
      id: 5,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: "Au",
      points: 10
    }
  ]
};

export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameState, setGameState] = useState<'start' | 'generate' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApiQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      setQuizData(data);
      setGameState('playing');
    } catch (err) {
      setError('Failed to fetch online quiz. Using classic questions instead.');
      setQuizData(predefinedQuizData);
      setGameState('playing');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = (mode: 'api' | 'ai' | 'predefined') => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setError(null);

    switch (mode) {
      case 'ai':
        setGameState('generate');
        break;
      case 'api':
        fetchApiQuiz();
        break;
      case 'predefined':
        setQuizData(predefinedQuizData);
        setGameState('playing');
        break;
    }
  };

  const handleQuizGenerated = (newQuizData: QuizData) => {
    setQuizData(newQuizData);
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (!quizData) return;

    const currentQ = quizData.questions[currentQuestion];
    if (answer === currentQ.correctAnswer) {
      setScore((prev) => prev + currentQ.points);
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setGameState('finished');
    }
  };

  const calculateResults = (): QuizResult => {
    if (!quizData) return { totalQuestions: 0, correctAnswers: 0, totalPoints: 0, percentage: 0 };
    
    return {
      totalQuestions: quizData.questions.length,
      correctAnswers,
      totalPoints: score,
      percentage: Math.round((correctAnswers / quizData.questions.length) * 100)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {gameState === 'start' && <StartCard onStart={handleStart} />}
      
      {gameState === 'generate' && (
        <QuizGenerator onQuizGenerated={handleQuizGenerated} />
      )}
      
      {gameState === 'playing' && quizData && (
        <QuizCard
          question={quizData.questions[currentQuestion]}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          totalQuestions={quizData.questions.length}
        />
      )}
      
      {gameState === 'finished' && (
        <ResultCard
          result={calculateResults()}
          onRestart={() => setGameState('start')}
        />
      )}
    </main>
  );
}

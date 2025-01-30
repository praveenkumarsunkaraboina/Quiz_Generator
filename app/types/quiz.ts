export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  percentage: number;
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizCard({ question, onAnswer, currentQuestion, totalQuestions }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">Points: {question.points}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="mt-4 text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-base">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          className="w-full mt-6"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Next Question
        </Button>
      </CardContent>
    </Card>
  );
}
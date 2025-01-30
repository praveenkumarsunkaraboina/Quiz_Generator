'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Award, RotateCcw } from 'lucide-react';
import { QuizResult } from '../types/quiz';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ResultCardProps {
  result: QuizResult;
  onRestart: () => void;
}

export function ResultCard({ result, onRestart }: ResultCardProps) {
  useEffect(() => {
    if (result.percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.percentage]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold">{result.totalPoints}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
              <Star className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm text-muted-foreground">Correct Answers</p>
              <p className="text-2xl font-bold">{result.correctAnswers}/{result.totalQuestions}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-primary/5 rounded-lg">
            <Award className="h-12 w-12 text-primary mb-4" />
            <p className="text-lg font-semibold mb-2">Performance</p>
            <p className="text-3xl font-bold mb-2">{result.percentage}%</p>
            <p className="text-muted-foreground">
              {result.percentage >= 90 ? 'Outstanding!' :
               result.percentage >= 70 ? 'Great job!' :
               result.percentage >= 50 ? 'Good effort!' :
               'Keep practicing!'}
            </p>
          </div>

          <Button 
            onClick={onRestart} 
            className="w-full"
            variant="outline"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
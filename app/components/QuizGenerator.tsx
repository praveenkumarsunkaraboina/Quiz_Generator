'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { QuizData } from '../types/quiz';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface QuizGeneratorProps {
  onQuizGenerated: (quiz: QuizData) => void;
}

export function QuizGenerator({ onQuizGenerated }: QuizGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = async () => {
    if (!topic) return;

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate a quiz about ${topic} with 5 multiple choice questions. 
        Format the response as a JSON object with this structure:
        {
          "questions": [
            {
              "id": number,
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "correctAnswer": "string",
              "points": number
            }
          ]
        }
        Make sure the correct answer is always one of the options.
        Each question should be worth 10 points.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const quizData = JSON.parse(text);
        onQuizGenerated(quizData);
      } catch (e) {
        throw new Error('Failed to parse AI response');
      }
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Generate AI Quiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a topic (e.g., 'Ancient Rome', 'Quantum Physics')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={generateQuiz}
              disabled={!topic || loading}
              className="min-w-[120px]"
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
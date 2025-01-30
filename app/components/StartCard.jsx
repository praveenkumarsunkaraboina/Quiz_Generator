'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, PlayCircle, Wand2, Globe, BookOpen } from 'lucide-react';

interface StartCardProps {
  onStart: (mode: 'api' | 'ai' | 'predefined') => void;
}

export function StartCard({ onStart }: StartCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-center mb-6">
          <Brain className="h-16 w-16 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center">Welcome to the Ultimate Quiz Challenge!</CardTitle>
        <CardDescription className="text-center mt-2">
          Choose your quiz mode: AI-generated, Online, or Classic Questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div 
              onClick={() => onStart('ai')}
              className="flex flex-col items-center p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <Wand2 className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">AI-Generated Quiz</p>
              <p className="text-xs text-muted-foreground text-center mt-1">Custom topics powered by AI</p>
            </div>
            <div 
              onClick={() => onStart('api')}
              className="flex flex-col items-center p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <Globe className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">Online Quiz</p>
              <p className="text-xs text-muted-foreground text-center mt-1">Fetch from our quiz API</p>
            </div>
            <div 
              onClick={() => onStart('predefined')}
              className="flex flex-col items-center p-4 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">Classic Quiz</p>
              <p className="text-xs text-muted-foreground text-center mt-1">Curated questions</p>
            </div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Why Choose Us?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AI-powered custom quizzes on any topic</li>
              <li>• Regular updates from our online question bank</li>
              <li>• Carefully curated classic questions</li>
              <li>• Track your progress and earn achievements</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface Pdf {
  id: string;
  name: string;
  content: string; // In a real app, this might be a URL or structured data
}

export enum QuestionType {
  MCQ = 'Multiple Choice',
  SAQ = 'Short Answer',
  LAQ = 'Long Answer',
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // Only for MCQ
  correctAnswer: string;
  explanation: string;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
}

export interface QuizAttempt {
  id:string;
  pdfId: string;
  pdfName: string;
  questions: Question[];
  answers: UserAnswer[];
  score: number; // Percentage
  timestamp: Date;
}

export type ViewType = 'dashboard' | 'study' | 'notifications';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  citation?: {
    pageNumber: number;
    quote: string;
  };
}

export interface VideoRecommendation {
  id: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  videoUrl: string;
}

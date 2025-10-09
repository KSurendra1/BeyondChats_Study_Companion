
import React, { useState, useEffect } from 'react';
import type { Pdf, Question, UserAnswer, QuizAttempt } from '../types';
import { QuestionType } from '../types';
import { generateQuiz } from '../services/geminiService';
import { CheckCircleIcon, LightBulbIcon, SparklesIcon, XCircleIcon } from './icons';


interface QuizEngineProps {
  pdf: Pdf;
  onQuizComplete: (attempt: QuizAttempt) => void;
}

type QuizStatus = 'idle' | 'generating' | 'active' | 'submitted';

export const QuizEngine: React.FC<QuizEngineProps> = ({ pdf, onQuizComplete }) => {
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.MCQ);

  useEffect(() => {
    // Reset state when PDF changes
    setStatus('idle');
    setQuestions([]);
    setUserAnswers([]);
    setScore(null);
  }, [pdf]);

  const handleGenerateQuiz = async (type: QuestionType) => {
    setSelectedQuestionType(type);
    setStatus('generating');
    try {
      const newQuestions = await generateQuiz(pdf, type, 5);
      setQuestions(newQuestions);
      setUserAnswers(newQuestions.map(q => ({ questionId: q.id, answer: '' })));
      setStatus('active');
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setStatus('idle');
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => prev.map(ua => ua.questionId === questionId ? { ...ua, answer } : ua));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = userAnswers.find(ua => ua.questionId === q.id);
      if (userAnswer && userAnswer.answer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setStatus('submitted');
    
    const attempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        pdfId: pdf.id,
        pdfName: pdf.name,
        questions,
        answers: userAnswers,
        score: calculatedScore,
        timestamp: new Date(),
    };
    onQuizComplete(attempt);
  };
  
  const renderIdle = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="bg-violet-100 p-4 rounded-full mb-4">
        <SparklesIcon className="h-10 w-10 text-violet-600" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800">Ready to test your knowledge?</h3>
      <p className="text-slate-500 mt-2 mb-6 max-w-md">Select a question type to generate a quiz based on <span className="font-semibold">{pdf.name}</span>.</p>
      <div className="flex space-x-3">
        <button onClick={() => handleGenerateQuiz(QuestionType.MCQ)} className="bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition">Multiple Choice</button>
        <button onClick={() => handleGenerateQuiz(QuestionType.SAQ)} className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition">Short Answer</button>
        <button onClick={() => handleGenerateQuiz(QuestionType.LAQ)} className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition">Long Answer</button>
      </div>
    </div>
  );
  
  const renderGenerating = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <svg className="animate-spin h-10 w-10 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-slate-600 font-medium">Generating your {selectedQuestionType} quiz...</p>
    </div>
  );

  const renderActive = () => (
    <div className="p-6 overflow-y-auto">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold text-slate-800 mb-2">{index + 1}. {q.question}</p>
          {q.type === QuestionType.MCQ && q.options && (
            <div className="space-y-2">
              {q.options.map(option => (
                <label key={option} className="flex items-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name={q.id} value={option} onChange={(e) => handleAnswerChange(q.id, e.target.value)} className="h-4 w-4 text-violet-600 focus:ring-violet-500" />
                  <span className="ml-3 text-slate-700">{option}</span>
                </label>
              ))}
            </div>
          )}
          {q.type === QuestionType.SAQ && (
            <input type="text" onChange={(e) => handleAnswerChange(q.id, e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-violet-500 focus:border-violet-500"/>
          )}
          {q.type === QuestionType.LAQ && (
            <textarea onChange={(e) => handleAnswerChange(q.id, e.target.value)} className="w-full p-2 border border-slate-300 rounded-md h-24 focus:ring-violet-500 focus:border-violet-500"/>
          )}
        </div>
      ))}
      <button onClick={handleSubmit} className="w-full bg-violet-600 text-white font-semibold py-3 rounded-lg hover:bg-violet-700 transition mt-4">Submit Quiz</button>
    </div>
  );

  const renderSubmitted = () => (
    <div className="p-6 overflow-y-auto">
        <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Quiz Complete!</h3>
            <p className="text-4xl font-bold mt-2" style={{color: score! >= 70 ? '#16a34a' : score! >= 40 ? '#f59e0b' : '#dc2626'}}>{score}%</p>
        </div>
        
        {questions.map((q, index) => {
            const userAnswer = userAnswers.find(ua => ua.questionId === q.id)?.answer || "No answer";
            const isCorrect = userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
            return (
                <div key={q.id} className="mb-4 p-4 rounded-lg border" style={{borderColor: isCorrect ? '#bbf7d0' : '#fecaca', backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2'}}>
                    <p className="font-semibold text-slate-800">{index + 1}. {q.question}</p>
                    <div className="flex items-center mt-2">
                        {isCorrect ? <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2"/> : <XCircleIcon className="h-5 w-5 text-red-600 mr-2"/>}
                        <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>Your answer: <span className="font-semibold">{userAnswer}</span></p>
                    </div>
                    {!isCorrect && <p className="text-sm mt-1 text-green-800">Correct answer: <span className="font-semibold">{q.correctAnswer}</span></p>}
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex">
                        <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0"/>
                        <p className="text-sm text-yellow-700">{q.explanation}</p>
                    </div>
                </div>
            )
        })}
        <button onClick={() => handleGenerateQuiz(selectedQuestionType)} className="w-full bg-violet-600 text-white font-semibold py-3 rounded-lg hover:bg-violet-700 transition mt-4">Generate New Quiz</button>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <h2 className="font-semibold text-slate-800">Quiz Generator</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {status === 'idle' && renderIdle()}
        {status === 'generating' && renderGenerating()}
        {status === 'active' && renderActive()}
        {status === 'submitted' && renderSubmitted()}
      </div>
    </div>
  );
};

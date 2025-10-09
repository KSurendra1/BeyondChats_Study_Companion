import React, { useState } from 'react';
import type { Pdf, QuizAttempt } from '../types';
import { PdfViewer } from './PdfViewer';
import { QuizEngine } from './QuizEngine';
import { Chatbot } from './Chatbot';
import { VideoRecommender } from './VideoRecommender';
import { SparklesIcon, ChatBubbleLeftRightIcon, PlayCircleIcon } from './icons';

interface StudyViewProps {
  pdf: Pdf;
  onQuizComplete: (attempt: QuizAttempt) => void;
}

type StudyTab = 'quiz' | 'chat' | 'video';

export const StudyView: React.FC<StudyViewProps> = ({ pdf, onQuizComplete }) => {
  const [activeTab, setActiveTab] = useState<StudyTab>('quiz');

  const TabButton: React.FC<{
    tabName: StudyTab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex items-center justify-center p-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
        activeTab === tabName
          ? 'border-violet-600 text-violet-600'
          : 'border-transparent text-slate-500 hover:text-slate-700'
      }`}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </button>
  );


  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-full flex flex-col">
        <PdfViewer pdf={pdf} />
      </div>
      <div className="h-full flex flex-col bg-white rounded-xl shadow-md">
        <div className="flex border-b border-slate-200">
            <TabButton tabName="quiz" label="Quiz" icon={<SparklesIcon className="h-5 w-5" />} />
            <TabButton tabName="chat" label="Chatbot" icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />} />
            <TabButton tabName="video" label="Videos" icon={<PlayCircleIcon className="h-5 w-5" />} />
        </div>
        <div className="flex-1 overflow-y-auto">
            {activeTab === 'quiz' && <QuizEngine pdf={pdf} onQuizComplete={onQuizComplete} />}
            {activeTab === 'chat' && <Chatbot pdf={pdf} />}
            {activeTab === 'video' && <VideoRecommender pdf={pdf} />}
        </div>
      </div>
    </div>
  );
};

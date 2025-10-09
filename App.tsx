import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudyView } from './components/StudyView';
import { NotificationsView } from './components/NotificationsView';
import type { Pdf, QuizAttempt, ViewType } from './types';
import { INITIAL_PDFS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [pdfs, setPdfs] = useState<Pdf[]>(INITIAL_PDFS);
  const [selectedPdf, setSelectedPdf] = useState<Pdf | null>(INITIAL_PDFS[0] || null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  const handlePdfUpload = (file: File) => {
    const newPdf: Pdf = { id: `user-${Date.now()}`, name: file.name, content: `Simulated content for ${file.name}` };
    setPdfs(prevPdfs => [...prevPdfs, newPdf]);
    setSelectedPdf(newPdf);
    setView('study');
  };
  
  const handleSelectPdf = (pdf: Pdf | null) => {
    setSelectedPdf(pdf);
    if(pdf) {
      setView('study');
    }
  };

  const handleNavigate = (newView: ViewType) => {
    setView(newView);
  };
  
  const handleQuizComplete = useCallback((attempt: QuizAttempt) => {
      setQuizAttempts(prev => [...prev, attempt]);
  }, []);

  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar 
        pdfs={pdfs}
        selectedPdf={selectedPdf}
        onSelectPdf={handleSelectPdf}
        onPdfUpload={handlePdfUpload}
        onNavigate={handleNavigate}
        currentView={view}
      />
      <main className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8">
        {view === 'dashboard' && <Dashboard quizAttempts={quizAttempts} />}
        {view === 'study' && selectedPdf && <StudyView pdf={selectedPdf} onQuizComplete={handleQuizComplete} />}
        {view === 'notifications' && <NotificationsView />}
      </main>
    </div>
  );
};

export default App;
import React, { useRef, useState, useEffect } from 'react';
import type { Pdf, ViewType } from '../types';
import { BookOpenIcon, DashboardIcon, UploadIcon, LogoIcon, DocumentIcon, BellIcon, UserCircleIcon, DotsVerticalIcon, LogoutIcon } from './icons';

interface SidebarProps {
  pdfs: Pdf[];
  selectedPdf: Pdf | null;
  onSelectPdf: (pdf: Pdf | null) => void;
  onPdfUpload: (file: File) => void;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

export const Sidebar: React.FC<SidebarProps> = ({ pdfs, selectedPdf, onSelectPdf, onPdfUpload, onNavigate, currentView }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setProfileMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPdfUpload(file);
    }
  };
  
  const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <button 
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-violet-600 text-white' 
          : 'text-slate-200 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <aside className="hidden md:flex flex-col w-72 bg-slate-800 text-white p-4">
      <div className="flex items-center mb-8 px-2">
        <LogoIcon className="h-8 w-8 text-violet-400" />
        <h1 className="ml-3 text-xl font-bold tracking-wider">BeyondChats</h1>
      </div>
      
      <nav className="flex-1 flex flex-col space-y-2">
        <NavItem 
          icon={<DashboardIcon className="h-5 w-5" />} 
          label="Dashboard" 
          isActive={currentView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <NavItem 
          icon={<BellIcon className="h-5 w-5" />} 
          label="Notifications" 
          isActive={currentView === 'notifications'} 
          onClick={() => onNavigate('notifications')} 
        />
        
        <div className="pt-6">
          <h2 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Study Sources</h2>
          <div className="mt-2 space-y-1">
            {pdfs.map(pdf => (
              <button 
                key={pdf.id}
                onClick={() => onSelectPdf(pdf)}
                className={`flex items-center w-full px-4 py-3 text-sm text-left font-medium rounded-lg transition-colors duration-200 ${
                  selectedPdf?.id === pdf.id && currentView === 'study'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <DocumentIcon className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 truncate">{pdf.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleUploadClick}
          className="flex items-center justify-center w-full bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-200"
        >
          <UploadIcon className="h-5 w-5 mr-2" />
          Upload PDF
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf"
        />
        <div className="pt-4 mt-4 border-t border-slate-700" ref={profileMenuRef}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserCircleIcon className="h-10 w-10 text-slate-400"/>
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-white">Alex Morgan</p>
                        <button className="text-xs text-slate-400 hover:underline">View profile</button>
                    </div>
                </div>
                <div className="relative">
                    <button onClick={() => setProfileMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-slate-700">
                        <DotsVerticalIcon className="h-5 w-5 text-slate-400" />
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute bottom-12 right-0 w-40 bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                <button 
                                    onClick={() => { console.log('Logout clicked'); setProfileMenuOpen(false); }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                                    role="menuitem"
                                >
                                    <LogoutIcon className="h-5 w-5 mr-3"/>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
};
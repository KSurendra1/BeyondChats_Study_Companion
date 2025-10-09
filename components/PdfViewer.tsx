
import React from 'react';
import type { Pdf } from '../types';
import { DocumentTextIcon } from './icons';

interface PdfViewerProps {
  pdf: Pdf;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdf }) => {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col h-full">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800 truncate">{pdf.name}</h2>
      </div>
      <div className="flex-1 p-6 text-slate-600 overflow-y-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Simulated PDF Content</h3>
        <div className="prose prose-slate max-w-none">
            <p>{pdf.content}</p>
            <p className="mt-4 italic text-sm">
                In a real application, the full PDF would be rendered here page by page,
                allowing for scrolling, searching, and highlighting. This is a placeholder
                to demonstrate the app's structure and functionality.
            </p>
        </div>
        <div className="flex justify-center items-center h-4/5 text-slate-300">
          <DocumentTextIcon className="h-48 w-48"/>
        </div>
      </div>
    </div>
  );
};

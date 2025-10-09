import React, { useState, useRef, useEffect } from 'react';
import type { Pdf, ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { LogoIcon, UserCircleIcon } from './icons';

interface ChatbotProps {
    pdf: Pdf;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></div>
    </div>
);

export const Chatbot: React.FC<ChatbotProps> = ({ pdf }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        setMessages([]); // Clear chat history when PDF changes
    }, [pdf]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponseData = await getChatbotResponse(pdf, input);
            const botMessage: ChatMessage = { 
                id: `bot-${Date.now()}`, 
                role: 'bot', 
                ...botResponseData 
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Failed to get chatbot response:", error);
            const errorMessage: ChatMessage = {
                id: `bot-error-${Date.now()}`,
                role: 'bot',
                text: 'Sorry, I encountered an error. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'bot' && (
                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-violet-100 flex items-center justify-center">
                                <LogoIcon className="h-5 w-5 text-violet-600" />
                            </div>
                        )}
                        <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                            {msg.citation && (
                                <div className="mt-3 pt-3 border-t border-slate-200">
                                    <p className="text-xs font-semibold text-slate-500 mb-1">Source (Page {msg.citation.pageNumber})</p>
                                    <blockquote className="text-xs text-slate-600 border-l-2 border-slate-300 pl-2 italic">
                                        "{msg.citation.quote}"
                                    </blockquote>
                                </div>
                            )}
                        </div>
                         {msg.role === 'user' && <UserCircleIcon className="h-8 w-8 text-slate-300 flex-shrink-0" />}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-violet-100 flex items-center justify-center">
                            <LogoIcon className="h-5 w-5 text-violet-600" />
                        </div>
                         <div className="max-w-md p-3 rounded-2xl bg-slate-100 text-slate-800 rounded-bl-none">
                            <LoadingSpinner />
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200">
                <form onSubmit={handleSend} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask a question about the PDF..."
                        className="flex-1 w-full p-2 border border-slate-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition disabled:bg-violet-300" disabled={isLoading || !input.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

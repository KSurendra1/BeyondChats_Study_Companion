
import React from 'react';
import type { QuizAttempt } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BrainCircuitIcon, TrendingDownIcon, TrendingUpIcon } from './icons';

interface DashboardProps {
  quizAttempts: QuizAttempt[];
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-violet-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-xl font-semibold text-slate-800">{value}</p>
        </div>
    </div>
);


export const Dashboard: React.FC<DashboardProps> = ({ quizAttempts }) => {
    const chartData = quizAttempts.slice(-5).map(attempt => ({
        name: attempt.pdfName.replace('.pdf', '').substring(0, 15) + '...',
        score: attempt.score,
    }));

    const averageScore = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length)
        : 0;

    // This is a simplified logic for strengths/weaknesses. A real app would analyze topics.
    const strengths = quizAttempts.length > 0 ? quizAttempts[0].pdfName : 'N/A';
    const weaknesses = quizAttempts.length > 1 ? quizAttempts[1].pdfName : 'N/A';

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Your Learning Journey</h1>
                <p className="mt-1 text-slate-600">Track your progress and conquer your coursebooks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <StatCard 
                    title="Average Score" 
                    value={`${averageScore}%`}
                    icon={<BrainCircuitIcon className="h-6 w-6 text-violet-600" />} 
                 />
                 <StatCard 
                    title="Strengths" 
                    value={strengths.split(':')[1]?.split('.')[0] || 'Physics'}
                    icon={<TrendingUpIcon className="h-6 w-6 text-green-600" />} 
                 />
                 <StatCard 
                    title="Weaknesses" 
                    value={weaknesses.split(':')[1]?.split('.')[0] || 'Motion'}
                    icon={<TrendingDownIcon className="h-6 w-6 text-red-600" />} 
                 />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Quiz Performance</h2>
                {quizAttempts.length > 0 ? (
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
                                <YAxis unit="%" tick={{ fill: '#475569', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(124, 58, 237, 0.1)' }}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px' }} />
                                <Bar dataKey="score" fill="#7c3aed" name="Score" barSize={30} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-slate-500">No quiz attempts yet. Complete a quiz to see your progress!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

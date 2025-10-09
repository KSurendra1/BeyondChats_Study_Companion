import React, { useState, useEffect } from 'react';
import type { Pdf, VideoRecommendation } from '../types';
import { getVideoRecommendations } from '../services/geminiService';
import { PlayCircleIcon } from './icons';

interface VideoRecommenderProps {
  pdf: Pdf;
}

export const VideoRecommender: React.FC<VideoRecommenderProps> = ({ pdf }) => {
    const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const handleFetchRecommendations = async () => {
        setIsLoading(true);
        setHasFetched(true);
        try {
            const videos = await getVideoRecommendations(pdf);
            setRecommendations(videos);
        } catch (error) {
            console.error("Failed to get video recommendations:", error);
            setRecommendations([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Reset when PDF changes
    useEffect(() => {
        setRecommendations([]);
        setIsLoading(false);
        setHasFetched(false);
    }, [pdf]);

    return (
        <div className="h-full flex flex-col p-6">
            {!hasFetched && (
                 <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-violet-100 p-4 rounded-full mb-4">
                        <PlayCircleIcon className="h-10 w-10 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">Visual Learner?</h3>
                    <p className="text-slate-500 mt-2 mb-6 max-w-md">Find helpful YouTube videos related to <span className="font-semibold">{pdf.name}</span> to supplement your reading.</p>
                    <button onClick={handleFetchRecommendations} className="bg-violet-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-violet-700 transition">
                        Find Videos
                    </button>
                </div>
            )}
            
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                     <svg className="animate-spin h-8 w-8 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}

            {!isLoading && hasFetched && (
                 <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Recommended Videos</h3>
                    {recommendations.length > 0 ? (
                        recommendations.map(video => (
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" key={video.id} className="flex items-center p-3 -mx-3 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                                <img src={video.thumbnailUrl} alt={video.title} className="w-24 h-14 object-cover rounded-md flex-shrink-0" />
                                <div className="ml-4">
                                    <p className="font-semibold text-sm text-slate-800 leading-tight">{video.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{video.channel}</p>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p className="text-slate-500 text-center py-8">No video recommendations found.</p>
                    )}
                 </div>
            )}
        </div>
    );
};

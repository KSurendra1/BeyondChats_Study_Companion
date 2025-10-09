import React from 'react';
import { BellIcon, BookOpenIcon, CheckCircleIcon } from './icons';

const mockNotifications = [
    { id: 1, icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />, text: "You scored 80% on 'Motion in a Straight Line' quiz!", time: '2 hours ago', read: false },
    { id: 2, icon: <BookOpenIcon className="h-6 w-6 text-blue-500" />, text: "A new quiz is available for 'Units and Measurement'.", time: '1 day ago', read: false },
    { id: 3, icon: <BellIcon className="h-6 w-6 text-yellow-500" />, text: "Don't forget to review your weak points from last week.", time: '3 days ago', read: true },
    { id: 4, icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />, text: "You completed the 'Physical World' chapter quiz.", time: '5 days ago', read: true },
];

export const NotificationsView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                <p className="mt-1 text-slate-600">Stay updated on your learning progress and new activities.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-800">All Notifications</h2>
                    <button className="text-sm font-medium text-violet-600 hover:text-violet-800">Mark all as read</button>
                </div>
                <ul className="divide-y divide-slate-200">
                    {mockNotifications.map(notification => (
                        <li key={notification.id} className={`p-4 flex items-start space-x-4 transition-colors duration-200 ${!notification.read ? 'bg-violet-50' : 'hover:bg-slate-50'}`}>
                            <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                            <div className="flex-1">
                                <p className="text-slate-800">{notification.text}</p>
                                <p className="text-sm text-slate-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="mt-2 h-2.5 w-2.5 rounded-full bg-violet-500"></div>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
'use client'
import { verifyUserRole } from '@/lib/verifyUserRole';
import React, { useState } from 'react';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardUser from './DashboardUser';
import DashboardPost from './DashboardPost';
import DashboardComments from './DashboardComments';

interface props {
    role: string
}



const TabMenu: React.FC<props> = ({ role }) => {
    const [tabs] = useState(['Dashboard', 'Users', 'Posts', 'Comments', 'Events', 'Categories']);
    const [activeTab, setActiveTab] = useState('Dashboard')
    const onTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <div className="border-b border-gray-300">
            <nav className="flex justify-start">
                {tabs.map((tab) => {
                    if (verifyUserRole(role, tab) || tab === 'Dashboard')
                        return (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={`px-4 py-2 text-gray-600 font-medium hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-900 border-b-2 ${activeTab === tab ? 'border-gray-900' : 'border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        )
                })}
            </nav>
            {activeTab === 'Dashboard' && <DashboardContent />}
            {activeTab === 'Users' && <DashboardUser />}
            {activeTab === 'Posts' && <DashboardPost />}
            {activeTab === 'Events' && <p>Event content goes here</p>}
            {activeTab === 'Categories' && <DashboardComments />}
            {activeTab === 'Comments' && <DashboardComments />}
        </div>
    );
};

export default TabMenu;
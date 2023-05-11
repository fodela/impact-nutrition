'use client'
import { verifyUserRole } from '@/lib/verifyUserRole';
import React, { useState } from 'react';

interface props {
    role: string
}



const TabMenu: React.FC<props> = ({ role }) => {
    const [tabs] = useState(['All', 'Users', 'Posts', 'Comments', 'Events']);
    const [activeTab, setActiveTab] = useState('All')
    const onTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <div className="border-b border-gray-300">
            <nav className="flex justify-start">
                {tabs.map((tab) => {
                    if (verifyUserRole(role, tab) || tab === 'All')
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
            {activeTab === 'All' && <p>All content goes here</p>}
            {activeTab === 'Users' && <p>User content goes here</p>}
            {activeTab === 'Posts' && <p>Post content goes here</p>}
            {activeTab === 'Events' && <p>Event content goes here</p>}

        </div>
    );
};

export default TabMenu;

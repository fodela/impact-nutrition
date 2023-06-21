'use client'
import { verifyUserRole } from '@/lib/verifyUserRole';
import React, { useState } from 'react';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardUser from './DashboardUser';
import DashboardComments from './DashboardComments';
import DashboardAction from './DashboarAction';
import DashboardPost from './DashboardPost/DashboardPost';
import DashboardEvents from './DashboardEvent/DashboardEvents';

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
        <div className="pt-10 max-w-screen-xl md:mx-auto border-b border-gray-300">
            <nav className="flex justify-start">
                {tabs.map((tab) => {
                    if (verifyUserRole(role, tab) || tab === 'Dashboard')
                        return (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={`px-4 py-2 text-gray-900 font-medium hover:text-gray-200 hover:border-gray-200 focus:outline-none focus:text-gray-300 focus:border-gray-900 border-b-2 dark:text-white ${activeTab === tab ? 'border-gray-300' : 'border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        )
                })}
            </nav>
            <div className='dark:bg-black bg-white rounded-xl p-4 m-4'>
                {activeTab !== 'Dashboard' && <DashboardAction tab={activeTab} />}

                {activeTab === 'Dashboard' && <DashboardContent />}
                {activeTab === 'Users' && <DashboardUser />}
                {activeTab === 'Posts' && <DashboardPost />}
                {activeTab === 'Events' && <DashboardEvents />}
                {activeTab === 'Categories' && <DashboardComments />}
                {activeTab === 'Comments' && <DashboardComments />}
            </div>

        </div>
    );
};

export default TabMenu;

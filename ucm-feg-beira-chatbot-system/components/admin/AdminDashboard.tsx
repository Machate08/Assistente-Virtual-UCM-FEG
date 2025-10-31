import React, { useState } from 'react';
import { User, Faq, Category } from '../../types';
import FaqManager from './FaqManager';
import ChatInterface from '../chat/ChatInterface';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { MessageSquareIcon } from '../icons/MessageSquareIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { GraduationCapIcon } from '../icons/GraduationCapIcon';


interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  faqs: Faq[];
  categories: Category[];
  onFaqsChange: (faqs: Faq[]) => void;
}

enum AdminView {
    FAQ_MANAGER,
    CHAT_TEST
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, faqs, categories, onFaqsChange }) => {
    const [view, setView] = useState<AdminView>(AdminView.FAQ_MANAGER);

    const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
         <button onClick={onClick} className={`w-full flex items-center gap-3 text-left p-3 rounded-md transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    const renderView = () => {
        switch (view) {
            case AdminView.FAQ_MANAGER:
                return <FaqManager initialFaqs={faqs} categories={categories} onFaqsChange={onFaqsChange} />;
            case AdminView.CHAT_TEST:
                return (
                    <div className="h-[80vh] max-h-[800px] max-w-4xl mx-auto">
                        <ChatInterface faqs={faqs} categories={categories} />
                    </div>
                );
            default:
                return <FaqManager initialFaqs={faqs} categories={categories} onFaqsChange={onFaqsChange} />;
        }
    }

    return (
        <div className="w-full h-full flex bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 shadow-2xl">
                <div className="mb-8 text-center">
                     <div className="inline-block p-3 bg-blue-800 rounded-full mb-2">
                        <GraduationCapIcon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">UCM-FEG Admin</h2>
                </div>
                <nav className="flex-1 space-y-2">
                   <NavButton 
                        active={view === AdminView.FAQ_MANAGER}
                        onClick={() => setView(AdminView.FAQ_MANAGER)}
                        icon={<BookOpenIcon className="w-5 h-5"/>}
                        label="Gerir FAQs"
                   />
                   <NavButton 
                        active={view === AdminView.CHAT_TEST}
                        onClick={() => setView(AdminView.CHAT_TEST)}
                        icon={<MessageSquareIcon className="w-5 h-5"/>}
                        label="Testar Chatbot"
                   />
                </nav>
                <div className="border-t border-gray-700 pt-4">
                     <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 p-3 rounded-md hover:bg-red-700 transition-colors font-semibold">
                        <LogoutIcon className="w-5 h-5" />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};

export default AdminDashboard;

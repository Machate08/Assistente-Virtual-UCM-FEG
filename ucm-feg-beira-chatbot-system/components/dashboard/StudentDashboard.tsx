import React from 'react';
import { User, Faq, Category } from '../../types';
import ChatInterface from '../chat/ChatInterface';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { FileTextIcon } from '../icons/FileTextIcon';
import { LibraryIcon } from '../icons/LibraryIcon';
import { GraduationCapIcon } from '../icons/GraduationCapIcon';
import { LogoutIcon } from '../icons/LogoutIcon';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  faqs: Faq[];
  categories: Category[];
  navigateTo: (page: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout, faqs, categories, navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCapIcon className="h-8 w-8 text-blue-800" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Portal do Estudante</h1>
                <p className="text-sm text-gray-600">Bem-vindo(a), {user.name.split(' ')[0]}</p>
              </div>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 bg-blue-800 text-white px-3 py-2 rounded-md hover:bg-blue-900 transition-colors text-sm font-medium">
                <LogoutIcon className="h-4 w-4" />
                <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[75vh] max-h-[700px]">
              <ChatInterface faqs={faqs} categories={categories} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
                  <BookOpenIcon className="h-5 w-5 text-blue-800" />
                  Acesso Rápido
                </h3>
                <div className="space-y-2">
                {categories.map((category) => (
                  <button key={category.id} onClick={() => navigateTo('knowledgeBase')} className="w-full text-left text-sm text-gray-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

             <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Dicas de Uso</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <CalendarIcon className="h-4 w-4 text-blue-800 flex-shrink-0 mt-0.5" />
                    <span>Pergunte sobre "prazos de matrícula" ou "calendário académico".</span>
                  </li>
                  <li className="flex gap-3">
                    <FileTextIcon className="h-4 w-4 text-blue-800 flex-shrink-0 mt-0.5" />
                    <span>Solicite informações sobre "emissão de certificados".</span>
                  </li>
                  <li className="flex gap-3">
                    <LibraryIcon className="h-4 w-4 text-blue-800 flex-shrink-0 mt-0.5" />
                    <span>Consulte sobre "acesso à biblioteca" ou "e-Learning".</span>
                  </li>
                </ul>
            </div>
            
            <div className="p-6 bg-blue-800 text-white rounded-lg shadow-lg text-center">
                <h3 className="font-bold text-lg mb-2">Precisa de mais ajuda?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Se não encontrar a resposta, explore a nossa base de conhecimento completa.
                </p>
                <button onClick={() => navigateTo('knowledgeBase')} className="w-full bg-white text-blue-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                  Ver Base de Conhecimento
                </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

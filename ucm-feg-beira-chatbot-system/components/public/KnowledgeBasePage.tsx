import React, { useState } from 'react';
import { Faq, Category, User } from '../../types';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { EyeIcon } from '../icons/EyeIcon';
import { TrendingUpIcon } from '../icons/TrendingUpIcon';

interface KnowledgeBasePageProps {
  navigateTo: (page: string) => void;
  faqs: Faq[];
  categories: Category[];
  user: User | null;
}

const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ navigateTo, faqs, categories, user }) => {
    const [activeTab, setActiveTab] = useState('categorias');

    const totalFaqs = faqs.length;
    const totalCategories = categories.length;

    const popularFaqs = [...faqs].sort((a, b) => b.views - a.views).slice(0, 10);
    
    return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center">
                <div>
                    <BookOpenIcon className="h-12 w-12 mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Base de Conhecimento</h1>
                    <p className="text-lg opacity-90">Explore todas as informações disponíveis sobre a UCM-FEG Beira.</p>
                </div>
                <button 
                  onClick={() => navigateTo(user ? (user.role === 'admin' ? 'adminDashboard' : 'studentDashboard') : 'home')} 
                  className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Voltar
                </button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="p-6 bg-white rounded-lg border border-gray-200">
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Total de Perguntas</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalFaqs}</p>
                </div>
                <BookOpenIcon className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200">
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Categorias</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
                </div>
                <TrendingUpIcon className="h-8 w-8 text-gray-300" />
            </div>
          </div>
           <div className="p-6 bg-white rounded-lg border border-gray-200">
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Visualizações Totais</h3>
                    <p className="text-2xl font-bold text-gray-800">{faqs.reduce((acc, f) => acc + f.views, 0)}</p>
                </div>
                <EyeIcon className="h-8 w-8 text-gray-300" />
            </div>
          </div>
        </div>

        <div>
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('categorias')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'categorias' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500'}`}>
                        Por Categoria
                    </button>
                    <button onClick={() => setActiveTab('populares')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'populares' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500'}`}>
                        Mais Populares
                    </button>
                </nav>
            </div>

            {activeTab === 'categorias' && (
                <div className="space-y-6">
                    {categories.map(category => {
                        const categoryFaqs = faqs.filter(f => f.categoryId === category.id);
                        if (categoryFaqs.length === 0) return null;

                        return (
                            <div key={category.id} className="p-6 bg-white rounded-lg border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{category.name}</h2>
                                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                                <div className="space-y-4">
                                {categoryFaqs.map(faq => (
                                    <div key={faq.id} className="border-l-4 border-blue-200 pl-4">
                                        <h4 className="font-semibold text-gray-700">{faq.question}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed mt-1">{faq.answer}</p>
                                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                                            <EyeIcon className="h-3 w-3" />
                                            <span>{faq.views} visualizações</span>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'populares' && (
                <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-4">
                    {popularFaqs.map((faq, index) => (
                         <div key={faq.id} className="flex gap-4 items-start">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold mt-1">
                                {index + 1}
                             </div>
                             <div className="flex-1 border-l-4 border-blue-200 pl-4 py-1">
                                <h4 className="font-semibold text-gray-700">{faq.question}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mt-1">{faq.answer}</p>
                                <div className="flex items-center gap-4 mt-2">
                                     <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                                        {categories.find(c => c.id === faq.categoryId)?.name || 'N/A'}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <EyeIcon className="h-3 w-3" />
                                        <span>{faq.views} visualizações</span>
                                    </div>
                                </div>
                             </div>
                         </div>
                    ))}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;

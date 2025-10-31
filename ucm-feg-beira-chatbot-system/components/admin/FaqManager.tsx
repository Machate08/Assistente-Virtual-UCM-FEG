import React, { useState } from 'react';
import { Faq, Category } from '../../types';
import { EditIcon } from '../icons/EditIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { SearchIcon } from '../icons/SearchIcon';

interface FaqManagerProps {
    initialFaqs: Faq[];
    categories: Category[];
    onFaqsChange: (faqs: Faq[]) => void;
}

const FaqManager: React.FC<FaqManagerProps> = ({ initialFaqs, categories, onFaqsChange }) => {
    const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<Partial<Faq> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (faq: Partial<Faq> | null = null) => {
        setCurrentFaq(faq ? { ...faq } : { categoryId: categories[0]?.id || '', question: '', answer: '', views: 0 });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentFaq(null);
    };

    const handleSave = () => {
        if (!currentFaq?.question || !currentFaq?.answer || !currentFaq?.categoryId) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        let updatedFaqs;
        if (currentFaq.id) {
            updatedFaqs = faqs.map(f => f.id === currentFaq.id ? currentFaq as Faq : f);
        } else {
            const newFaq: Faq = {
                ...currentFaq,
                id: new Date().getTime().toString(),
                views: 0,
            } as Faq;
            updatedFaqs = [...faqs, newFaq];
        }
        setFaqs(updatedFaqs);
        onFaqsChange(updatedFaqs);
        closeModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Tem a certeza que deseja apagar esta FAQ? Esta ação é irreversível.')) {
            const updatedFaqs = faqs.filter(f => f.id !== id);
            setFaqs(updatedFaqs);
            onFaqsChange(updatedFaqs);
        }
    };
    
    const filteredFaqs = faqs.filter(faq => {
        const category = categories.find(c => c.id === faq.categoryId);
        return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
               faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (category && category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gerir Base de Conhecimento</h2>
                    <p className="text-sm text-gray-500">Adicione, edite ou remova perguntas frequentes.</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                         <input 
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors font-semibold shadow"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pergunta</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Visualizações</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredFaqs.map(faq => (
                            <tr key={faq.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm text-gray-800 font-medium max-w-sm truncate">{faq.question}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                        {categories.find(c => c.id === faq.categoryId)?.name || 'N/A'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{faq.views}</td>
                                <td className="py-3 px-4 text-sm">
                                    <button onClick={() => openModal(faq)} className="text-gray-500 hover:text-blue-700 p-2 rounded-full transition-colors" aria-label="Editar">
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(faq.id)} className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors" aria-label="Apagar">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                         {filteredFaqs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">Nenhuma FAQ encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && currentFaq && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-full overflow-y-auto animate-in fade-in-0 zoom-in-95">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">{currentFaq.id ? 'Editar' : 'Adicionar Nova'} FAQ</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
                                <input
                                    type="text"
                                    placeholder="Qual é a pergunta do estudante?"
                                    value={currentFaq.question || ''}
                                    onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <select 
                                    value={currentFaq.categoryId} 
                                    onChange={(e) => setCurrentFaq({ ...currentFaq, categoryId: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                                <textarea
                                    placeholder="Forneça uma resposta clara e completa."
                                    value={currentFaq.answer || ''}
                                    onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows={8}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold transition-colors">Cancelar</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 font-semibold transition-colors shadow">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaqManager;

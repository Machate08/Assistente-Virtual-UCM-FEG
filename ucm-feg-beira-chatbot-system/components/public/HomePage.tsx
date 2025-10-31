import React, { useState } from 'react';
import { Faq, Category } from '../../types';
import { GraduationCapIcon } from '../icons/GraduationCapIcon';
import { MessageSquareIcon } from '../icons/MessageSquareIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { ShieldIcon } from '../icons/ShieldIcon';

interface HomePageProps {
  navigateTo: (page: string) => void;
  faqs: Faq[];
  categories: Category[];
}

const FaqSection: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
    const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

    const toggleFaq = (id: string) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            {faqs.slice(0, 5).map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex justify-between items-center text-left p-4 font-semibold text-gray-800 hover:bg-gray-50"
                    >
                        <span>{faq.question}</span>
                        <svg className={`w-5 h-5 transform transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {openFaqId === faq.id && (
                        <div className="p-4 border-t border-gray-200 text-gray-600">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ navigateTo, faqs }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <GraduationCapIcon className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Assistente Virtual UCM-FEG Beira</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Obtenha respostas rápidas sobre matrículas, propinas, calendário acadêmico e muito mais.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigateTo('login')} className="bg-white text-blue-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-colors">
              Entrar
            </button>
            <button onClick={() => navigateTo('register')} className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-blue-800 transition-colors">
              Cadastrar
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="p-6">
                <MessageSquareIcon className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Atendimento 24/7</h3>
                <p className="text-gray-600">Respostas instantâneas a qualquer hora do dia, todos os dias.</p>
            </div>
            <div className="p-6">
                <ClockIcon className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Respostas Rápidas</h3>
                <p className="text-gray-600">Informações precisas e diretas em questão de segundos.</p>
            </div>
            <div className="p-6">
                <ShieldIcon className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Informação Confiável</h3>
                <p className="text-gray-600">Dados oficiais e atualizados da secretaria da UCM-FEG Beira.</p>
            </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto">
             <FaqSection faqs={faqs} />
          </div>
           <div className="text-center mt-8">
             <button onClick={() => navigateTo('knowledgeBase')} className="font-semibold text-blue-800 hover:underline">
                Ver todas as perguntas
            </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
          <div className="text-center bg-blue-800 text-white rounded-lg p-10">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="mb-6 opacity-90 max-w-xl mx-auto">Crie sua conta gratuitamente e tenha acesso imediato ao assistente virtual completo.</p>
            <button onClick={() => navigateTo('register')} className="bg-white text-blue-800 font-bold px-8 py-3 rounded-md hover:bg-gray-200 transition-colors text-lg">
              Criar Conta Gratuita
            </button>
          </div>
      </div>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8 text-center text-sm">
          <p className="opacity-80">
            © {new Date().getFullYear()} Universidade Católica de Moçambique - Faculdade de Economia e Gestão, Beira
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

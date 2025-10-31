import React, { useState, useRef, useEffect } from 'react';
import { Faq, Message, MessageAuthor, Category } from '../../types';
import { getBotResponse } from '../../services/geminiService';
import ChatMessage from './ChatMessage';
import SendIcon from '../icons/SendIcon';
import BotIcon from '../icons/BotIcon';

interface ChatInterfaceProps {
    faqs: Faq[];
    categories: Category[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ faqs, categories }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Send initial greeting after a short delay
      const timer = setTimeout(async () => {
          try {
              const botResponseText = await getBotResponse("Olá", faqs, categories);
              const botMessage: Message = { author: MessageAuthor.BOT, text: botResponseText };
              setMessages([botMessage]);
          } catch (error) {
              const errorMessage: Message = { author: MessageAuthor.BOT, text: 'Olá! Sou o Gito. Ocorreu um erro ao inicializar. Por favor, recarregue a página.' };
              setMessages([errorMessage]);
          } finally {
              setIsLoading(false);
          }
      }, 1000);
      return () => clearTimeout(timer);
    }, [faqs, categories]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { author: MessageAuthor.USER, text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const botResponseText = await getBotResponse(currentInput, faqs, categories);
            const botMessage: Message = { author: MessageAuthor.BOT, text: botResponseText };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = { author: MessageAuthor.BOT, text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <header className="bg-white border-b border-gray-200 p-4 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center">
                            <BotIcon className="w-7 h-7" />
                        </div>
                         <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Assistente Virtual UCM-FEG</h1>
                        <p className="text-sm text-green-600 font-medium">Online</p>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            <BotIcon className="w-6 h-6" />
                        </div>
                        <div className="max-w-xl rounded-2xl px-4 py-3 bg-white text-gray-800 rounded-bl-none shadow-sm">
                            <div className="flex items-center space-x-2">
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escreva a sua pergunta aqui..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        disabled={isLoading && messages.length > 0}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || input.trim() === ''}
                        className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-110"
                        aria-label="Enviar mensagem"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatInterface;

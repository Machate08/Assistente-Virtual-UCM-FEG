import React, { useState } from 'react';
import { GraduationCapIcon } from '../icons/GraduationCapIcon';

interface CadastroPageProps {
  onRegister: (name: string, email: string) => void;
  navigateTo: (page: string) => void;
}

const CadastroPage: React.FC<CadastroPageProps> = ({ onRegister, navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        return;
    }
    
    onRegister(name, email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <GraduationCapIcon className="h-12 w-12 text-blue-800" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Criar Conta de Estudante</h1>
          <p className="mt-2 text-sm text-gray-600">Acesso ao Assistente Virtual da UCM-FEG</p>
        </div>
        
        <div className="px-8 pb-8">
            <form className="space-y-4" onSubmit={handleRegister}>
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="seu.email@ucm.ac.mz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mínimo de 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}

                <div>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                    Criar Conta
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Já tem uma conta? </span>
                <button onClick={() => navigateTo('login')} className="font-medium text-blue-800 hover:text-blue-700 hover:underline">
                    Entrar
                </button>
            </div>
            <div className="mt-4 text-center">
                <button onClick={() => navigateTo('home')} className="text-sm text-gray-500 hover:underline">
                    Voltar para página inicial
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;

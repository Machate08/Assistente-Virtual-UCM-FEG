import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { User, Role, Faq, Category } from './types';
import { INITIAL_FAQS, CATEGORIES } from './constants';
import HomePage from './components/public/HomePage';
import CadastroPage from './components/auth/CadastroPage';
import KnowledgeBasePage from './components/public/KnowledgeBasePage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>(INITIAL_FAQS);
  const [categories] = useState<Category[]>(CATEGORIES);
  
  // State to manage navigation in the SPA
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // If user is logged in, redirect away from auth/public pages
    if (user) {
      if (['home', 'login', 'register'].includes(currentPage)) {
        setCurrentPage(user.role === Role.ADMIN ? 'adminDashboard' : 'studentDashboard');
      }
    } else {
      // if user is logged out, redirect away from private pages
      if (['adminDashboard', 'studentDashboard'].includes(currentPage)) {
        setCurrentPage('home');
      }
    }
  }, [user, currentPage]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const handleLogin = (email: string, role: Role) => {
    const name = role === Role.ADMIN 
      ? 'Jose Machate' 
      : email.split('@')[0]
          .replace(/[._]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .split(' ').slice(0, 2).join(' '); // Capitalize and take first two names

    setUser({
      id: new Date().getTime().toString(),
      email,
      name,
      role,
    });
  };
  
  const handleRegister = (name: string, email: string) => {
     // For this mock app, registration directly logs the user in as a student
     setUser({
      id: new Date().getTime().toString(),
      email,
      name,
      role: Role.STUDENT,
    });
  }

  const handleLogout = () => {
    setUser(null);
  };

  const handleFaqsChange = (updatedFaqs: Faq[]) => {
    setFaqs(updatedFaqs);
  };

  const renderContent = () => {
    switch(currentPage) {
        case 'home':
            return <HomePage navigateTo={navigateTo} faqs={faqs} categories={categories} />;
        case 'login':
            return <LoginPage onLogin={handleLogin} navigateTo={navigateTo} />;
        case 'register':
            return <CadastroPage onRegister={handleRegister} navigateTo={navigateTo} />;
        case 'knowledgeBase':
            return <KnowledgeBasePage navigateTo={navigateTo} faqs={faqs} categories={categories} user={user} />;
        case 'adminDashboard':
            if (user && user.role === Role.ADMIN) {
                return <AdminDashboard user={user} onLogout={handleLogout} faqs={faqs} categories={categories} onFaqsChange={handleFaqsChange} />;
            }
            navigateTo('home'); // Redirect if not admin
            return null;
        case 'studentDashboard':
             if (user && user.role === Role.STUDENT) {
                return <StudentDashboard user={user} onLogout={handleLogout} faqs={faqs} categories={categories} navigateTo={navigateTo} />;
            }
            navigateTo('home'); // Redirect if not student
            return null;
        default:
            return <HomePage navigateTo={navigateTo} faqs={faqs} categories={categories} />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 font-sans">
      {renderContent()}
    </div>
  );
};

export default App;

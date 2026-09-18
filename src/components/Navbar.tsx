"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed w-full z-50 px-4 top-4">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/Assets/Logo Jaka.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-8 font-medium text-sm text-gray-700 hidden md:flex">
          <Link href="/" className="hover:text-brand-blue transition">{t('nav_home')}</Link>
          <Link href="/form" className="hover:text-brand-blue transition">{t('nav_health_form')}</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold w-20">
            <div 
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-brand-blue rounded-full shadow-sm transition-transform duration-300 ease-out z-0 ${language === 'id' ? 'translate-x-full' : 'translate-x-0'}`}
            ></div>
            <button 
              onClick={() => setLanguage('en')}
              className={`relative z-10 w-1/2 text-center py-1 transition-colors duration-300 ${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('id')}
              className={`relative z-10 w-1/2 text-center py-1 transition-colors duration-300 ${language === 'id' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ID
            </button>
          </div>
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 hidden sm:block">{t('nav_sign_in')}</Link>
          <Link href="/register" className="bg-brand-blue text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition">{t('nav_register')}</Link>
        </div>
      </div>
    </nav>
  );
}

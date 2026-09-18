"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1 flex items-start gap-3">
          <img src="/Assets/Logo Jaka.png" alt="Logo" className="h-10 brightness-0 invert opacity-90" />
          <span className="text-xl font-bold tracking-wide mt-1">JakaHealth</span>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">{t('footer_company')}</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">{t('footer_about_us')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_careers')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_press')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">{t('footer_resources')}</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">{t('footer_documentation')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_help_center')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_community')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">{t('footer_legal')}</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">{t('footer_privacy_policy')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_terms_of_service')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer_cookie_policy')}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-white/10 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{t('footer_copyright')}</p>
        <div className="flex items-center gap-4">
          <span>gmahkjakasampurna@outlook.com</span>
          <span>+62 851-7784-2491</span>
        </div>
      </div>
    </footer>
  );
}

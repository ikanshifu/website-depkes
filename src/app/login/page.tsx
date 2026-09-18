"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.append('username', formData.username);
    data.append('password', formData.password);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString()
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-10 relative overflow-hidden">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light/10 text-brand-light mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-2">{t('login_title')}</h2>
          <p className="text-gray-500 font-medium">{t('login_desc')}</p>
        </div>

        {message && <div className="mb-6 p-4 bg-blue-50 text-brand-blue rounded-xl font-medium text-center border border-blue-100">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('login_user_lbl')}</label>
            <input type="text" name="username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder={t('login_user_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('login_pass_lbl')}</label>
            <input type="password" name="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={t('login_pass_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
          </div>
          <button type="submit" className="w-full bg-brand-blue hover:bg-blue-900 text-white font-medium py-4 px-8 rounded-xl transition shadow-lg mt-4">
            {t('login_btn')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium relative z-10">
          <span className="text-gray-500">{t('login_no_acc')} </span>
          <Link href="/register" className="text-brand-light hover:text-blue-700 transition">{t('login_reg_link')}</Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', username: '', password: '', cpassword: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setMessage("Passwords do not match");
      return;
    }

    const data = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }

    try {
      const res = await fetch('/api/register', {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-10 md:p-14 relative overflow-hidden">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light/10 text-brand-light mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-2">{t('reg_title')}</h2>
          <p className="text-gray-500 font-medium">{t('reg_desc')}</p>
        </div>

        {message && <div className="mb-6 p-4 bg-blue-50 text-brand-blue rounded-xl font-medium text-center border border-blue-100">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_fname_lbl')}</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder={t('reg_fname_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_lname_lbl')}</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder={t('reg_lname_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_email_lbl')}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('reg_email_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_phone_lbl')}</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('reg_phone_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_user_lbl')}</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder={t('reg_user_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_pass_lbl')}</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={t('reg_pass_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('reg_cpass_lbl')}</label>
              <input type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} placeholder={t('reg_cpass_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-blue hover:bg-blue-900 text-white font-medium py-4 px-8 rounded-xl transition shadow-lg mt-4">
            {t('reg_btn')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium relative z-10">
          <span className="text-gray-500">{t('reg_has_acc')} </span>
          <Link href="/login" className="text-brand-light hover:text-blue-700 transition">{t('reg_log_link')}</Link>
        </div>
      </div>
    </div>
  );
}

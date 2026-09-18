"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FormPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    cholesterol: '',
    gout: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(val => val === '')) {
      alert("All fields must not be empty!");
      return;
    }
    
    // Combine blood pressure
    const bloodPressure = `${formData.systolic}/${formData.diastolic}`;
    
    const data = new URLSearchParams();
    data.append('weight', formData.weight);
    data.append('height', formData.height);
    data.append('bloodPressure', bloodPressure);
    data.append('bloodSugar', formData.bloodSugar);
    data.append('cholesterol', formData.cholesterol);
    data.append('gout', formData.gout);

    try {
      const res = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString()
      });
      const text = await res.text();
      setMessage(text);
      if (res.ok) {
        setFormData({ weight: '', height: '', systolic: '', diastolic: '', bloodSugar: '', cholesterol: '', gout: '' });
      }
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-10 md:p-14 relative overflow-hidden">
        
        {/* Header Text */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-light/10 text-brand-light mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-2">{t('nav_health_form')}</h2>
          <p className="text-gray-500 font-medium">Please fill in the accurate patient data</p>
        </div>

        {message && <div className="mb-6 p-4 bg-blue-50 text-brand-blue rounded-xl font-medium text-center border border-blue-100">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_weight_lbl')}</label>
              <div className="relative">
                <input type="number" step="0.1" name="weight" id="weight" value={formData.weight} onChange={handleChange} placeholder={t('form_weight_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold">kg</span>
              </div>
            </div>

            {/* Height */}
            <div>
              <label htmlFor="height" className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_height_lbl')}</label>
              <div className="relative">
                <input type="number" step="1" name="height" id="height" value={formData.height} onChange={handleChange} placeholder={t('form_height_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold">cm</span>
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_bp_lbl')}</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <input type="number" step="1" name="systolic" id="systolic" value={formData.systolic} onChange={handleChange} placeholder={t('form_bp_sys_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                  <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold hidden sm:inline">mmHg</span>
                </div>
                <span className="text-gray-400 font-bold text-xl">/</span>
                <div className="relative flex-1">
                  <input type="number" step="1" name="diastolic" id="diastolic" value={formData.diastolic} onChange={handleChange} placeholder={t('form_bp_dia_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                  <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold hidden sm:inline">mmHg</span>
                </div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div>
              <label htmlFor="blood-sugar" className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_bs_lbl')}</label>
              <div className="relative">
                <input type="number" step="1" name="bloodSugar" id="blood-sugar" value={formData.bloodSugar} onChange={handleChange} placeholder={t('form_bs_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold">mg/dL</span>
              </div>
            </div>

            {/* Cholesterol */}
            <div>
              <label htmlFor="cholesterol" className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_chol_lbl')}</label>
              <div className="relative">
                <input type="number" step="1" name="cholesterol" id="cholesterol" value={formData.cholesterol} onChange={handleChange} placeholder={t('form_chol_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold">mg/dL</span>
              </div>
            </div>

            {/* Gout / Uric Acid */}
            <div className="md:col-span-2">
              <label htmlFor="gout" className="block text-sm font-bold text-brand-blue mb-2 uppercase tracking-wide">{t('form_uric_lbl')}</label>
              <div className="relative">
                <input type="number" step="0.1" name="gout" id="gout" value={formData.gout} onChange={handleChange} placeholder={t('form_uric_ph')} className="w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition" required />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-light font-semibold">mg/dL</span>
              </div>
            </div>
            
          </div>

          <div className="flex justify-center mt-6 pb-2">
            <button type="submit" className="bg-brand-blue hover:bg-blue-900 text-white font-medium py-3 px-16 rounded-xl transition shadow-lg w-full md:w-auto">
              {t('form_submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

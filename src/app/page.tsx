"use client";

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

export default function Home() {
  const { t } = useLanguage();
  const datePickerRef = useRef<HTMLButtonElement>(null);
  const [displayDate, setDisplayDate] = useState("Aug 18, 2026");

  useEffect(() => {
    if (!datePickerRef.current) return;
    
    const fp = flatpickr(datePickerRef.current, {
      dateFormat: "M j, Y",
      defaultDate: "Aug 18, 2026",
      onChange: function(selectedDates, dateStr, instance) {
        setDisplayDate(dateStr);
      },
      onReady: function(selectedDates, dateStr, instance) {
        const yearInput = instance.currentYearElement;
        const yearWrapper = yearInput.parentNode as HTMLElement;
        
        // Hide the up/down arrows in Flatpickr
        yearWrapper.querySelectorAll('.arrowUp, .arrowDown').forEach(el => (el as HTMLElement).style.display = 'none');
        
        // Hide original input
        yearInput.style.display = 'none';
        
        // Create a select element for the year
        const yearSelect = document.createElement('select');
        yearSelect.className = 'custom-year-select';
        yearSelect.style.fontWeight = '700';
        yearSelect.style.color = '#052349';
        yearSelect.style.marginLeft = '4px';
        yearSelect.style.fontSize = 'inherit';
        yearSelect.style.fontFamily = 'inherit';
        
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 100; i <= currentYear + 10; i++) {
          const option = document.createElement('option');
          option.value = i.toString();
          option.text = i.toString();
          if (i === instance.currentYear) option.selected = true;
          yearSelect.appendChild(option);
        }
        
        yearSelect.addEventListener('change', function(e) {
          instance.changeYear(Number((e.target as HTMLSelectElement).value));
        });
        
        // Add it inside the wrapper
        yearWrapper.appendChild(yearSelect);
        yearWrapper.style.width = 'auto'; // allow width to grow
        
        // Sync our dropdown if the year changes
        const syncYear = function() {
          yearSelect.value = instance.currentYear.toString();
        };
        instance.config.onMonthChange.push(syncYear);
        instance.config.onYearChange.push(syncYear);
      }
    });

    return () => {
      fp.destroy();
    };
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-brand-dark rounded-3xl mx-4 mt-4 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-light opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-8">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              <span>{t('hero_title_1')}</span> <br />
              <span className="text-brand-light">{t('hero_title_2')}</span> <br />
              <span>{t('hero_title_3')}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md mb-8">
              {t('hero_desc')}
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
            <div className="w-80 h-96 bg-white rounded-3xl p-4 shadow-2xl relative rotate-3 transform hover:rotate-0 transition duration-500">
              <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden flex flex-col pt-8 px-4 border border-gray-100">
                <div className="w-16 h-2 bg-gray-200 rounded-full mx-auto mb-8"></div>
                
                <div className="space-y-4">
                  <div className="bg-[#2dd4bf] text-white p-3 rounded-xl flex items-center gap-3 shadow-md">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <span className="font-bold text-sm">{t('hero_card_1')}</span>
                  </div>
                  
                  <div className="bg-[#3b82f6] text-white p-3 rounded-xl flex items-center gap-3 shadow-md">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <span className="font-bold text-sm">{t('hero_card_2')}</span>
                  </div>

                  <div className="bg-[#ef4444] text-white p-3 rounded-xl flex items-center gap-3 shadow-md">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <span className="font-bold text-sm">{t('hero_card_3')}</span>
                  </div>
                </div>
                
                <div className="mt-auto pb-4 text-center">
                  <span className="text-xs text-gray-400 font-medium">{t('hero_card_sub')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-dark mb-2">{t('welcome_title')}</h2>
            <p className="text-gray-500 font-medium">{t('welcome_desc')}</p>
          </div>
          <div>
            <button id="date-picker-btn" ref={datePickerRef} className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue transition cursor-pointer">
              <svg className="w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span id="display-date" className="pointer-events-none">{displayDate}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Weight */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_weight')}</h3>
              <div className="w-2 h-2 rounded-full bg-brand-light"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">70</span>
              <span className="text-sm text-gray-500 font-semibold">kg</span>
            </div>
            <div className="mt-4 text-sm flex items-center justify-between">
              <span className="text-brand-light font-medium">{t('stat_stable')}</span>
              <svg className="w-12 h-6 text-brand-light/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 15 Q 25 5, 50 15 T 100 15" />
              </svg>
            </div>
          </div>

          {/* Height */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_height')}</h3>
              <div className="w-2 h-2 rounded-full bg-brand-light"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">175</span>
              <span className="text-sm text-gray-500 font-semibold">cm</span>
            </div>
            <div className="mt-4 text-sm text-gray-400 font-medium">
              {t('stat_last_measured')}
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_bp')}</h3>
              <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">118/75</span>
              <span className="text-sm text-gray-500 font-semibold">mmHg</span>
            </div>
            <div className="mt-4 text-sm flex items-center justify-between">
              <span className="text-brand-blue font-medium">{t('stat_stable')}</span>
              <svg className="w-12 h-6 text-brand-blue/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 20 L 25 20 L 35 10 L 45 25 L 55 10 L 65 20 L 100 20" />
              </svg>
            </div>
          </div>

          {/* Blood Sugar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_bs')}</h3>
              <div className="w-2 h-2 rounded-full bg-brand-light"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">95</span>
              <span className="text-sm text-gray-500 font-semibold">mg/dL</span>
            </div>
            <div className="mt-4 text-sm flex items-center justify-between">
              <span className="text-brand-light font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                <span>{t('stat_trend_bs')}</span>
              </span>
              <svg className="w-12 h-6 text-brand-light/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 15 L 25 15 L 40 5 L 60 25 L 75 15 L 100 15" />
              </svg>
            </div>
          </div>
          
          {/* Cholesterol */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_chol')}</h3>
              <div className="w-2 h-2 rounded-full bg-brand-light"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">180</span>
              <span className="text-sm text-gray-500 font-semibold">mg/dL</span>
            </div>
            <div className="mt-4 text-sm flex items-center justify-between">
              <span className="text-brand-light font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                <span>{t('stat_trend_chol')}</span>
              </span>
              <svg className="w-12 h-6 text-brand-light/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 25 L 30 25 L 50 15 L 70 20 L 100 10" />
              </svg>
            </div>
          </div>

          {/* Uric Acid */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('stat_uric')}</h3>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-4xl font-extrabold text-brand-dark">6.0</span>
              <span className="text-sm text-gray-500 font-semibold">mg/dL</span>
            </div>
            <div className="mt-4 text-sm flex items-center justify-between">
              <span className="text-red-500 font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                <span>{t('stat_trend_uric')}</span>
              </span>
              <svg className="w-12 h-6 text-red-500/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M0 15 L 30 15 L 50 25 L 70 20 L 100 25" />
              </svg>
            </div>
          </div>
        </div>

        {/* Lower Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('appt_title')}</h3>
              <a href="#" className="text-sm font-semibold text-brand-blue hover:text-blue-800">{t('appt_view_all')}</a>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 flex gap-4 items-center hover:bg-gray-50 transition cursor-pointer">
                <div className="bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  24
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Dr. Lorem Ipsum</h4>
                  <p className="text-xs text-gray-500 mt-1">{t('appt_1')}</p>
                </div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 flex gap-4 items-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <div className="bg-white border border-gray-200 text-gray-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  26
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Dr. Lorem Ipsum</h4>
                  <p className="text-xs text-gray-500 mt-1">{t('appt_2')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Lab Results */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('lab_title')}</h3>
              <button className="text-sm font-semibold text-gray-500 flex items-center gap-1 hover:text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                <span>{t('lab_filter')}</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="pb-3 px-2">{t('lab_th_test')}</th>
                    <th className="pb-3 px-2">{t('lab_th_date')}</th>
                    <th className="pb-3 px-2">{t('lab_th_result')}</th>
                    <th className="pb-3 px-2 text-right">{t('lab_th_status')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-4 px-2 font-medium text-gray-900">{t('lab_test_1')}</td>
                    <td className="py-4 px-2 text-gray-500">{t('lab_date_1')}</td>
                    <td className="py-4 px-2 text-gray-700">{t('lab_res_normal')}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t('lab_status_stable')}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-4 px-2 font-medium text-gray-900">{t('lab_test_2')}</td>
                    <td className="py-4 px-2 text-gray-500">{t('lab_date_2')}</td>
                    <td className="py-4 px-2 text-gray-700">{t('lab_res_elevated')}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t('lab_status_monitor')}</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 px-2 font-medium text-gray-900">{t('lab_test_3')}</td>
                    <td className="py-4 px-2 text-gray-500">{t('lab_date_3')}</td>
                    <td className="py-4 px-2 text-gray-700">{t('lab_res_normal')}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t('lab_status_stable')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

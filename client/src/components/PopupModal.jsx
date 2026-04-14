import React from 'react';

export default function PopupModal({ isOpen, type, message, onClose }) {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <>
      <style>{`
        @keyframes popupScaleIn {
          0% { opacity: 0; transform: scale(0.9) translateY(20px) }
          100% { opacity: 1; transform: scale(1) translateY(0) }
        }
        @keyframes popupBackdropIn {
          0% { opacity: 0 }
          100% { opacity: 1 }
        }
        .anim-popup {
          animation: popupScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-backdrop {
          animation: popupBackdropIn 0.3s ease-out forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 anim-backdrop">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm anim-popup border border-white/20">
          <div className={`h-3 w-full ${isSuccess ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}></div>
          <div className="p-8 text-center relative">
            
            {/* Decorative background circle */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-20 -z-10 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>

            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/50 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isSuccess ? 'task_alt' : 'error'}
              </span>
            </div>
            
            <h3 className="text-2xl font-headline font-extrabold mb-3 text-slate-800 dark:text-white">
              {isSuccess ? 'Success!' : 'Oops!'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-body mb-8 text-[15px] leading-relaxed">
              {message}
            </p>
            
            <button
              onClick={onClose}
              className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all active:scale-95 ${
                isSuccess 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20 hover:shadow-green-500/40' 
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/20 hover:shadow-red-500/40'
              }`}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

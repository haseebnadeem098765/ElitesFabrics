import React from 'react';

const Loader = ({ show }) => {
  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-surface overflow-hidden transition-all duration-700 ease-in-out ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Background patterns */}
      <div className="absolute inset-0 textile-grain opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative flex flex-col items-center">
        {/* Animated logo container */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
          <div className="absolute inset-4 rounded-full border-2 border-tertiary/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Logo */}
          <img 
            src="https://res.cloudinary.com/detwuzqry/image/upload/v1775717220/stitcheerr_assets/logo.png" 
            alt="Elite Fabrics Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-bounce-slow"
          />
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-primary font-headline font-bold text-xl tracking-[0.2em] uppercase">Elites Fabrics</h2>
          <div className="flex gap-1.5 h-1 items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};


export default Loader;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => navigate('/'), 500);
          }, 400);
          return 100;
        }
        return prev + 3;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-creme transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Logo animation container */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-terra/20 flex items-center justify-center relative">
          {/* Spinning inner ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-terra border-r-terra animate-spin"
            style={{ animationDuration: '2s' }}
          />
          {/* Center icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-terra flex items-center justify-center shadow-lg shadow-terra/20">
            <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white text-2xl md:text-3xl">
              <i className="ri-restaurant-2-line" />
            </span>
          </div>
        </div>
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-terra/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-coqueiro/40 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 -right-4 w-2.5 h-2.5 rounded-full bg-terra-light/40 animate-bounce" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Brand text */}
      <h1 className="text-2xl md:text-3xl font-bold text-grafite font-serif tracking-tight mb-1">
        Raízes do Nordeste
      </h1>
      <p className="text-xs md:text-sm text-grafite-muted font-body tracking-widest uppercase mb-8">
        Culinária autêntica
      </p>

      {/* Progress bar */}
      <div className="w-48 md:w-56 h-1 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-terra rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-grafite-muted font-body">
        {progress < 100 ? 'Carregando experiência...' : 'Pronto!'}
      </p>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-grafite-muted/50 font-body">
        <span className="w-1.5 h-1.5 rounded-full bg-terra/30" />
        <span>v2.0</span>
        <span className="w-1.5 h-1.5 rounded-full bg-coqueiro/30" />
      </div>
    </div>
  );
}
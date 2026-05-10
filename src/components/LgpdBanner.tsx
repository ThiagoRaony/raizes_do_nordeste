import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConsentConfig {
  analytics: boolean;
  marketing: boolean;
  essential: boolean;
}

export function LgpdBanner() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [consent, setConsent] = useState<ConsentConfig>({ analytics: false, marketing: false, essential: true });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('lgpd_consent');
    if (!stored) {
      setShow(true);
      setTimeout(() => setIsVisible(true), 300);
    } else {
      try {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
      } catch {
        setShow(true);
        setTimeout(() => setIsVisible(true), 300);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const cfg: ConsentConfig = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('lgpd_consent', JSON.stringify(cfg));
    setConsent(cfg);
    setIsVisible(false);
    setTimeout(() => setShow(false), 300);
  };

  const handleRefuse = () => {
    const cfg: ConsentConfig = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('lgpd_consent', JSON.stringify(cfg));
    setConsent(cfg);
    setIsVisible(false);
    setTimeout(() => setShow(false), 300);
  };

  const handleSaveConfig = () => {
    const cfg = { ...consent, essential: true };
    localStorage.setItem('lgpd_consent', JSON.stringify(cfg));
    setConsent(cfg);
    setIsVisible(false);
    setTimeout(() => { setShow(false); setShowConfig(false); }, 300);
  };

  if (!show) return null;

  return (
    <>
      {!showConfig ? (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-4 md:px-6 md:py-5">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terra/10 flex items-center justify-center">
                  <i className="ri-shield-check-line text-terra text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-grafite leading-relaxed font-body">
                    <span className="font-semibold">Sua privacidade é importante.</span> Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                    <button onClick={() => navigate('/privacidade')} className="text-terra underline hover:text-terra-dark transition-colors ml-1">
                      Política de Privacidade
                    </button>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button
                    onClick={handleRefuse}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-grafite text-xs font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    Recusar
                  </button>
                  <button
                    onClick={() => setShowConfig(true)}
                    className="px-4 py-2 rounded-lg border border-terra text-terra text-xs font-medium hover:bg-terra/10 transition-colors whitespace-nowrap"
                  >
                    Personalizar
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 rounded-lg bg-terra text-white text-xs font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap shadow-sm"
                  >
                    Aceitar tudo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-terra/10 text-terra">
                <i className="ri-settings-3-line text-lg" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-grafite font-display">Personalizar cookies</h3>
                <p className="text-xs text-grafite-muted">Escolha o que compartilhar conosco</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-creme rounded-lg">
                <input id="lgpd-essential" type="checkbox" checked disabled className="mt-0.5 w-4 h-4 accent-terra cursor-not-allowed" />
                <div>
                  <label htmlFor="lgpd-essential" className="text-sm font-medium text-grafite block">Essenciais</label>
                  <p className="text-xs text-grafite-muted">Necessários para o funcionamento do site.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-creme rounded-lg">
                <input id="lgpd-analytics" type="checkbox" checked={consent.analytics} onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-terra cursor-pointer" />
                <div>
                  <label htmlFor="lgpd-analytics" className="text-sm font-medium text-grafite block cursor-pointer">Analíticos</label>
                  <p className="text-xs text-grafite-muted">Entendemos como você usa nosso site.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-creme rounded-lg">
                <input id="lgpd-marketing" type="checkbox" checked={consent.marketing} onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-terra cursor-pointer" />
                <div>
                  <label htmlFor="lgpd-marketing" className="text-sm font-medium text-grafite block cursor-pointer">Marketing</label>
                  <p className="text-xs text-grafite-muted">Ofertas personalizadas e promoções do programa de fidelidade.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfig(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleSaveConfig}
                className="flex-1 py-2.5 rounded-lg bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors"
              >
                Salvar preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LgpdBanner;
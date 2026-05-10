import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

interface ConsentConfig {
  analytics: boolean;
  marketing: boolean;
  essential: boolean;
}

const sections = [
  { id: 'intro', title: '1. Introdução' },
  { id: 'coleta', title: '2. Dados Coletados' },
  { id: 'finalidade', title: '3. Finalidade' },
  { id: 'compartilhamento', title: '4. Compartilhamento' },
  { id: 'seguranca', title: '5. Segurança' },
  { id: 'direitos', title: '6. Seus Direitos' },
  { id: 'retencao', title: '7. Retenção' },
  { id: 'cookies', title: '8. Cookies' },
  { id: 'alteracoes', title: '9. Alterações' },
  { id: 'contato', title: '10. Contato' },
];

export default function Privacidade() {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTransparencia, setShowTransparencia] = useState(false);
  const [consent, setConsent] = useState<ConsentConfig>({ analytics: false, marketing: false, essential: true });
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('lgpd_consent');
    if (stored) {
      try { setConsent(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const handleSaveConsent = () => {
    localStorage.setItem('lgpd_consent', JSON.stringify(consent));
    setShowConsentModal(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === 'excluir minha conta') {
      localStorage.removeItem('raizes_user');
      localStorage.removeItem('raizes_users');
      localStorage.removeItem('raizes_cart');
      localStorage.removeItem('raizes_orders');
      localStorage.removeItem('lgpd_consent');
      setDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteModal(false);
        window.location.href = '/';
      }, 2500);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-grafite font-display">Política de Privacidade</h1>
            <p className="text-xs text-grafite-muted font-body mt-1">Última atualização: maio de 2026</p>
          </div>
          <Logo className="h-6 w-auto opacity-50 hidden sm:block" />
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setShowConsentModal(true)}
            className="px-3 py-2 rounded-lg bg-terra/10 text-terra text-xs font-medium hover:bg-terra/20 transition-colors whitespace-nowrap"
          >
            <span className="w-3 h-3 inline-flex items-center justify-center mr-1"><i className="ri-settings-3-line" /></span>
            Gerenciar cookies
          </button>
          <button
            onClick={() => setShowTransparencia(true)}
            className="px-3 py-2 rounded-lg bg-coqueiro/10 text-coqueiro text-xs font-medium hover:bg-coqueiro/20 transition-colors whitespace-nowrap"
          >
            <span className="w-3 h-3 inline-flex items-center justify-center mr-1"><i className="ri-eye-line" /></span>
            Transparência de dados
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            <span className="w-3 h-3 inline-flex items-center justify-center mr-1"><i className="ri-delete-bin-line" /></span>
            Excluir conta
          </button>
        </div>

        {/* Quick nav */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
          <p className="text-xs font-semibold text-grafite font-display mb-2">Navegar para:</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap ${
                  activeSection === s.id ? 'bg-terra text-white' : 'bg-gray-100 text-grafite-muted hover:bg-gray-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-5 md:p-7 space-y-6 text-sm text-grafite-muted leading-relaxed font-body">
          <section id="intro">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">1. Introdução</h2>
            <p>A Raízes do Nordeste valoriza a privacidade de seus clientes e está comprometida em proteger seus dados pessoais. Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018). Nosso compromisso é oferecer transparência total sobre o uso dos seus dados.</p>
          </section>

          <section id="coleta">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">2. Dados Coletados</h2>
            <p>Coletamos apenas os dados necessários para o funcionamento dos nossos serviços:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-grafite">Cadastrais:</strong> nome completo, e-mail, telefone, endereço de entrega</li>
              <li><strong className="text-grafite">Pedidos:</strong> histórico de compras, preferências alimentares</li>
              <li><strong className="text-grafite">Fidelidade:</strong> pontos acumulados, nível do programa</li>
              <li><strong className="text-grafite">Navegação:</strong> cookies para melhorar a experiência (com consentimento)</li>
            </ul>
          </section>

          <section id="finalidade">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">3. Finalidade do Tratamento</h2>
            <p>Seus dados são utilizados exclusivamente para: processar e entregar seus pedidos; gerenciar sua conta e programa de fidelidade; enviar comunicações sobre pedidos e, com seu <strong className="text-grafite">consentimento explícito</strong>, ofertas e promoções. Nunca usamos seus dados para fins não declarados.</p>
          </section>

          <section id="compartilhamento">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">4. Compartilhamento</h2>
            <p>Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins comerciais. Seus dados só podem ser compartilhados quando necessário para a execução do serviço (ex: processamento de pagamento via gateway externo) ou por obrigação legal. Todos os parceiros são obrigados a manter a confidencialidade.</p>
          </section>

          <section id="seguranca">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">5. Segurança</h2>
            <p>Adotamos medidas técnicas e administrativas adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou destruição. O acesso aos dados é restrito a funcionários autorizados. Utilizamos criptografia em trânsito e armazenamento seguro.</p>
          </section>

          <section id="direitos">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">6. Seus Direitos (LGPD)</h2>
            <p>Você tem o direito de:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Excluir seus dados (direito ao esquecimento)</li>
              <li>Revogar consentimentos a qualquer momento</li>
              <li>Solicitar portabilidade dos dados</li>
              <li>Opor-se ao tratamento de dados para marketing</li>
            </ul>
          </section>

          <section id="retencao">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">7. Retenção</h2>
            <p>Seus dados são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política ou por obrigações legais. Após esse período, são anonimizados ou excluídos de forma segura. Pedidos fiscais são retidos por 5 anos conforme legislação brasileira.</p>
          </section>

          <section id="cookies">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">8. Cookies e Tecnologias</h2>
            <p>Utilizamos cookies essenciais (necessários para o funcionamento), analíticos (para entender o uso) e de marketing (para personalizar ofertas, apenas com consentimento). Você pode gerenciar suas preferências a qualquer momento clicando em "Gerenciar cookies" nesta página.</p>
          </section>

          <section id="alteracoes">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">9. Alterações</h2>
            <p>Esta política pode ser atualizada periodicamente. Recomendamos que a revise regularmente. Alterações significativas serão notificadas aos usuários cadastrados por e-mail ou notificação no app.</p>
          </section>

          <section id="contato">
            <h2 className="text-base font-semibold text-grafite font-display mb-2">10. Contato do DPO</h2>
            <p>Em caso de dúvidas sobre esta política ou sobre o tratamento de seus dados, entre em contato com nosso Encarregado de Dados:</p>
            <div className="mt-3 p-3 bg-creme rounded-lg">
              <p className="text-grafite font-medium">Raízes do Nordeste - DPO</p>
              <p className="text-xs mt-1">Telefone: (81) 3456-7890</p>
              <p className="text-xs">E-mail: privacidade@raizesdonordeste.com.br</p>
              <p className="text-xs">Endereço: Rua da Aurora, 345 - Recife, PE</p>
            </div>
          </section>

          <p className="text-xs text-grafite-muted pt-4 border-t border-gray-100">Última atualização: 9 de maio de 2026</p>
        </div>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-creme rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-terra/10 text-terra">
                <i className="ri-shield-check-line text-lg" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-grafite font-display">Gerenciar cookies</h3>
                <p className="text-xs text-grafite-muted">Escolha suas preferências de privacidade</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <input id="essential" type="checkbox" checked disabled className="mt-0.5 w-4 h-4 accent-terra cursor-not-allowed" />
                <div>
                  <label htmlFor="essential" className="text-sm font-medium text-grafite block">Essenciais</label>
                  <p className="text-xs text-grafite-muted">Necessários para o funcionamento do site. Não podem ser desativados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <input id="analytics" type="checkbox" checked={consent.analytics} onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-terra cursor-pointer" />
                <div>
                  <label htmlFor="analytics" className="text-sm font-medium text-grafite block cursor-pointer">Analíticos</label>
                  <p className="text-xs text-grafite-muted">Nos ajudam a entender como você usa nosso site e a melhorar a experiência.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <input id="marketing" type="checkbox" checked={consent.marketing} onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-terra cursor-pointer" />
                <div>
                  <label htmlFor="marketing" className="text-sm font-medium text-grafite block cursor-pointer">Marketing</label>
                  <p className="text-xs text-grafite-muted">Permitem ofertas personalizadas e promoções do programa de fidelidade.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConsentModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors">Fechar</button>
              <button onClick={handleSaveConsent} className="flex-1 py-2.5 rounded-lg bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-creme rounded-xl max-w-md w-full p-6 shadow-xl">
            {!deleteSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                    <i className="ri-alert-line text-lg" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-grafite font-display">Excluir conta</h3>
                    <p className="text-xs text-grafite-muted">Esta ação é irreversível</p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-700 font-body">
                    Todos os seus dados serão excluídos permanentemente: conta, pedidos, pontos de fidelidade e preferências.
                  </p>
                </div>
                <p className="text-sm text-grafite-muted font-body mb-2">Digite <strong className="text-grafite">excluir minha conta</strong> para confirmar:</p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="excluir minha conta"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-red-300 font-body mb-4"
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors">Cancelar</button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== 'excluir minha conta'}
                    className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirmar exclusão
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <span className="w-14 h-14 flex items-center justify-center mx-auto rounded-full bg-green-100 text-green-600 mb-3">
                  <i className="ri-check-line text-2xl" />
                </span>
                <h3 className="text-lg font-semibold text-grafite font-display mb-1">Conta excluída</h3>
                <p className="text-sm text-grafite-muted font-body">Todos os seus dados foram removidos. Redirecionando...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transparência Modal */}
      {showTransparencia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-creme rounded-xl max-w-md w-full p-6 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-coqueiro/10 text-coqueiro">
                <i className="ri-eye-line text-lg" />
              </span>
              <h3 className="text-lg font-semibold text-grafite font-display">Transparência de Dados</h3>
            </div>
            <div className="space-y-3 text-sm font-body">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-medium text-grafite">Dados armazenados localmente</p>
                <p className="text-xs text-grafite-muted mt-1">Seus dados estão armazenados no navegador deste dispositivo (localStorage).</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-medium text-grafite">Quem tem acesso</p>
                <p className="text-xs text-grafite-muted mt-1">Apenas você e a equipe autorizada da Raízes do Nordeste.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-medium text-grafite">Compartilhamento</p>
                <p className="text-xs text-grafite-muted mt-1">Não compartilhamos com terceiros. Pagamentos são processados por gateway externo sem armazenar dados do cartão.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-medium text-grafite">Tempo de retenção</p>
                <p className="text-xs text-grafite-muted mt-1">Pedidos fiscais: 5 anos. Dados de navegação: até revogação do consentimento.</p>
              </div>
            </div>
            <button onClick={() => setShowTransparencia(false)} className="w-full mt-4 py-2.5 rounded-lg bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors">Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
}
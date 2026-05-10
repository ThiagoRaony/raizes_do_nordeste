import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const ADMIN_PASSWORD = 'adm2026';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (senha === ADMIN_PASSWORD) {
        localStorage.setItem('raizes_admin_auth', 'true');
        navigate('/admin');
      } else {
        setErro('Senha incorreta. Tente novamente.');
        setSenha('');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-2xl bg-terra text-white text-2xl">
            <i className="ri-shield-keyhole-line" />
          </div>
          <Logo variant="dark" size="md" className="mx-auto mb-2" />
          <p className="text-sm text-grafite-muted font-body">
            Área restrita - Acesso administrativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-grafite font-body mb-1.5">
              Senha de acesso
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha admin"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra"
              autoFocus
            />
          </div>

          {erro && (
            <div className="flex items-center gap-2 text-sm text-red-600 font-body bg-red-50 rounded-lg px-3 py-2">
              <i className="ri-error-warning-line" />
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !senha}
            className="w-full py-2.5 rounded-lg bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Verificando...
              </span>
            ) : (
              'Acessar painel'
            )}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-grafite-muted hover:text-terra transition-colors font-body text-center w-full"
        >
          ← Voltar ao site
        </button>
      </div>
    </div>
  );
}
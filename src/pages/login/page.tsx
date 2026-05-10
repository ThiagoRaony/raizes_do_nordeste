import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const preselectedTab = searchParams.get('tab') || '';
  const { login, register } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(preselectedTab === 'register' ? 'register' : 'login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  // Register fields
  const [regNome, setRegNome] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSenha, setRegSenha] = useState('');
  const [regTelefone, setRegTelefone] = useState('');
  const [regEndereco, setRegEndereco] = useState('');
  const [regLgpd, setRegLgpd] = useState(false);
  const [regMarketing, setRegMarketing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(loginEmail, loginSenha);
    if (ok) {
      navigate(redirect);
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regLgpd) {
      setError('Você precisa aceitar os termos da LGPD para continuar.');
      return;
    }
    const ok = await register({
      nome: regNome,
      email: regEmail,
      senha: regSenha,
      telefone: regTelefone,
      endereco: regEndereco,
      consentimento_lgpd: regLgpd,
      consentimento_marketing: regMarketing,
    });
    if (ok) {
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => navigate(redirect), 1500);
    } else {
      setError('Este e-mail já está cadastrado.');
    }
  };

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-grafite font-display">
            Raízes do Nordeste
          </h1>
          <p className="text-sm text-grafite-muted mt-1 font-body">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-full bg-white border border-gray-200 p-1 mb-6">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              tab === 'login'
                ? 'bg-terra text-white'
                : 'text-grafite-muted hover:text-grafite'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              tab === 'register'
                ? 'bg-terra text-white'
                : 'text-grafite-muted hover:text-grafite'
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700 font-body">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-sm text-green-700 font-body">
            {success}
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="login-senha" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Senha
              </label>
              <input
                id="login-senha"
                type="password"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap"
            >
              Entrar
            </button>
            <p className="text-xs text-center text-grafite-muted font-body">
              Esqueceu sua senha?{' '}
              <button type="button" onClick={() => navigate('/recuperar-senha')} className="text-terra hover:underline font-medium">
                Recuperar
              </button>
            </p>
            <p className="text-xs text-center text-grafite-muted font-body">
              Não tem conta?{' '}
              <button type="button" onClick={() => setTab('register')} className="text-terra hover:underline font-medium">
                Cadastre-se
              </button>
            </p>
          </form>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 space-y-4">
            <div>
              <label htmlFor="reg-nome" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Nome completo
              </label>
              <input
                id="reg-nome"
                type="text"
                value={regNome}
                onChange={(e) => setRegNome(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                E-mail
              </label>
              <input
                id="reg-email"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="reg-senha" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Senha
              </label>
              <input
                id="reg-senha"
                type="password"
                value={regSenha}
                onChange={(e) => setRegSenha(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label htmlFor="reg-telefone" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Telefone
              </label>
              <input
                id="reg-telefone"
                type="tel"
                value={regTelefone}
                onChange={(e) => setRegTelefone(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <label htmlFor="reg-endereco" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Endereço de entrega
              </label>
              <input
                id="reg-endereco"
                type="text"
                value={regEndereco}
                onChange={(e) => setRegEndereco(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            {/* LGPD consent */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <p className="text-sm font-medium text-grafite font-body">Consentimentos LGPD</p>
              <div className="flex items-start gap-2.5">
                <input
                  id="reg-lgpd"
                  type="checkbox"
                  checked={regLgpd}
                  onChange={(e) => setRegLgpd(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 accent-terra cursor-pointer"
                />
                <label htmlFor="reg-lgpd" className="text-xs text-grafite-muted leading-relaxed cursor-pointer font-body">
                  Concordo com o tratamento dos meus dados pessoais conforme a{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/privacidade')}
                    className="text-terra underline hover:text-terra-dark"
                  >
                    Política de Privacidade
                  </button>{' '}
                  e aceito participar do programa de fidelidade <strong className="text-grafite">(opcional)</strong>.
                </label>
              </div>
              <div className="flex items-start gap-2.5">
                <input
                  id="reg-marketing"
                  type="checkbox"
                  checked={regMarketing}
                  onChange={(e) => setRegMarketing(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-terra cursor-pointer"
                />
                <label htmlFor="reg-marketing" className="text-xs text-grafite-muted leading-relaxed cursor-pointer font-body">
                  Quero receber ofertas e promoções exclusivas do programa de fidelidade por e-mail.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap"
            >
              Criar conta
            </button>
            <p className="text-xs text-center text-grafite-muted font-body">
              Já tem conta?{' '}
              <button type="button" onClick={() => setTab('login')} className="text-terra hover:underline font-medium">
                Entrar
              </button>
            </p>
          </form>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full text-center text-sm text-grafite-muted hover:text-terra transition-colors font-body"
        >
          ← Voltar para as unidades
        </button>
      </div>
    </div>
  );
}
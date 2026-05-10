import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'newpass' | 'success'>('email');
  const [code, setCode] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Digite um e-mail válido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (code.length < 4) {
      setError('Código inválido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('newpass');
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (novaSenha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-creme flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-terra flex items-center justify-center shadow-lg shadow-terra/20">
            <span className="w-7 h-7 flex items-center justify-center text-white text-xl">
              <i className="ri-restaurant-2-line" />
            </span>
          </div>
          <h1 className="text-xl font-bold text-grafite font-display">Recuperar senha</h1>
          <p className="text-sm text-grafite-muted mt-1 font-body">
            {step === 'email' && 'Informe seu e-mail para receber o código de recuperação'}
            {step === 'code' && 'Digite o código enviado para seu e-mail'}
            {step === 'newpass' && 'Crie uma nova senha segura'}
            {step === 'success' && 'Senha atualizada com sucesso!'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1 rounded-full ${step === 'email' ? 'bg-terra' : 'bg-terra'}`} />
          <div className={`flex-1 h-1 rounded-full ${step === 'code' || step === 'newpass' || step === 'success' ? 'bg-terra' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-1 rounded-full ${step === 'newpass' || step === 'success' ? 'bg-terra' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-1 rounded-full ${step === 'success' ? 'bg-terra' : 'bg-gray-200'}`} />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700 font-body">
            {error}
          </div>
        )}

        {/* Step 1: Email */}
        {step === 'email' && (
          <form onSubmit={handleSendEmail} className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 space-y-4">
            <div>
              <label htmlFor="rec-email" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                E-mail cadastrado
              </label>
              <input
                id="rec-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="seu@email.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin" />
                  Enviando...
                </span>
              ) : (
                'Enviar código'
              )}
            </button>
          </form>
        )}

        {/* Step 2: Code */}
        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 space-y-4">
            <div>
              <label htmlFor="rec-code" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Código de verificação
              </label>
              <input
                id="rec-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body text-center text-lg tracking-widest"
                placeholder="000000"
              />
              <p className="text-xs text-grafite-muted mt-1.5 font-body">
                Digite o código de 6 dígitos enviado para <strong className="text-grafite">{email}</strong>
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin" />
                  Verificando...
                </span>
              ) : (
                'Verificar código'
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-center text-sm text-grafite-muted hover:text-terra transition-colors font-body"
            >
              ← Voltar
            </button>
          </form>
        )}

        {/* Step 3: New password */}
        {step === 'newpass' && (
          <form onSubmit={handleResetPassword} className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 space-y-4">
            <div>
              <label htmlFor="rec-nova" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Nova senha
              </label>
              <input
                id="rec-nova"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label htmlFor="rec-confirmar" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Confirmar nova senha
              </label>
              <input
                id="rec-confirmar"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body"
                placeholder="Repita a senha"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin" />
                  Salvando...
                </span>
              ) : (
                'Redefinir senha'
              )}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-green-100 text-green-600 text-2xl">
              <i className="ri-checkbox-circle-line" />
            </div>
            <h2 className="text-lg font-bold text-grafite font-display mb-2">Senha redefinida!</h2>
            <p className="text-sm text-grafite-muted font-body mb-6">
              Sua senha foi atualizada com sucesso. Agora você pode entrar com sua nova senha.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
            >
              Fazer login
            </button>
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full text-center text-sm text-grafite-muted hover:text-terra transition-colors font-body"
        >
          ← Voltar para login
        </button>
      </div>
    </div>
  );
}
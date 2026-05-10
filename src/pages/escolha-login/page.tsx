import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { units } from '@/mocks/units';
import Logo from '@/components/Logo';

export default function EscolhaLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const unitId = searchParams.get('unit') || '';
  const { user } = useAuth();

  const unit = units.find((u) => u.id === unitId);

  if (user) {
    navigate(`/cardapio/${unitId}`);
    return null;
  }

  if (!unit) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      {/* Unit preview with overlay */}
      <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden flex-shrink-0">
        <img
          src={unit.imagem}
          alt={unit.nome}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-3 left-0 right-0 px-4">
          <div className="flex justify-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Logo className="h-5 w-auto" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-terra text-white mb-2 inline-block">
            {unit.regiaoCulinaria}
          </span>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-display">
            {unit.nome}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-body mt-0.5">
            {unit.cidade}, {unit.estado}
          </p>
        </div>
      </div>

      {/* Login/Cadastro prompt */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 rounded-full bg-terra/10 text-terra text-xl sm:text-2xl">
              <i className="ri-user-smile-line" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-grafite font-display mb-2">
              Bem-vindo!
            </h2>
            <p className="text-xs sm:text-sm text-grafite-muted font-body">
              Faça login ou cadastre-se para acessar o cardápio da unidade e participar do programa de fidelidade
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <button
              onClick={() => navigate(`/login?redirect=/cardapio/${unitId}`)}
              className="w-full py-3 sm:py-3.5 rounded-lg bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap shadow-sm"
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-login-box-line" />
              </span>
              Entrar com minha conta
            </button>

            <button
              onClick={() => navigate(`/login?redirect=/cardapio/${unitId}&tab=register`)}
              className="w-full py-3 sm:py-3.5 rounded-lg border border-terra text-terra text-sm font-semibold hover:bg-terra/10 transition-colors whitespace-nowrap"
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-user-add-line" />
              </span>
              Criar nova conta
            </button>

            <button
              onClick={() => navigate(`/cardapio/${unitId}`)}
              className="w-full py-3 sm:py-3.5 rounded-lg border border-gray-200 text-grafite-muted text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-store-2-line" />
              </span>
              Continuar sem login
            </button>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs text-grafite-muted font-body">
              O login é necessário para usar o programa de fidelidade com descontos progressivos
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 sm:py-4 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-grafite-muted hover:text-terra transition-colors font-body flex items-center justify-center gap-1"
        >
          <span className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-left-line" /></span>
          Escolher outra unidade
        </button>
      </div>
    </div>
  );
}
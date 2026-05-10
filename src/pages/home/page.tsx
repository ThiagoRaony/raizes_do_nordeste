import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { units } from '@/mocks/units';
import Logo from '@/components/Logo';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelectUnit = (unitId: string) => {
    localStorage.setItem('selected_unit', unitId);
    if (user) {
      navigate(`/cardapio/${unitId}`);
    } else {
      navigate(`/escolha-login?unit=${unitId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      {/* Hero - fundo creme limpo idêntico à imagem */}
      <div className="relative min-h-[420px] md:min-h-[520px] flex flex-col items-center justify-center text-center px-4 pt-8 pb-12">
        {/* Logo circular com sol + paisagem + folhas */}
        <div className="mb-5 md:mb-6">
          <Logo style="icon-only" size="lg" variant="dark" className="w-20 h-20 md:w-24 md:h-24" />
        </div>

        {/* Título em fonte script manuscrita */}
        <h1 className="font-script text-4xl md:text-6xl lg:text-7xl text-[#4A3728] mb-2 md:mb-3 leading-tight">
          Raízes do Nordeste
        </h1>

        {/* Subtítulo */}
        <p className="text-sm md:text-base text-[#6B5B4F] max-w-lg font-body leading-relaxed mb-8 md:mb-10 px-4">
          Cuscuz, tapioca, baião de dois, acarajé e as delícias que o nordeste tem de melhor. Escolha sua unidade e peça agora — entregamos em Recife, Salvador, Fortaleza, São Luís, Natal e João Pessoa.
        </p>

        {/* Botões idênticos à imagem */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto px-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 rounded-full bg-[#2D6A4F] text-white text-sm md:text-base font-semibold hover:bg-[#1B4D3A] transition-colors whitespace-nowrap shadow-md flex items-center justify-center gap-2"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-user-add-line" />
            </span>
            Entrar ou criar conta
          </button>
          <button
            onClick={() => navigate('/historia')}
            className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 rounded-full bg-transparent text-[#4A3728] text-sm md:text-base font-medium hover:bg-[#4A3728]/5 transition-colors whitespace-nowrap border border-[#4A3728]/25 flex items-center justify-center gap-2"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-building-line" />
            </span>
            Conheça nossa história
          </button>
        </div>
      </div>

      {/* Units */}
      <div id="unidades" className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A3728] font-display mb-2">
            Nossas Unidades
          </h2>
          <p className="text-sm md:text-base text-[#6B5B4F] font-body px-4">
            Selecione a unidade mais próxima de você
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => handleSelectUnit(unit.id)}
              className="group text-left bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#C75B3A]/30 transition-all hover:shadow-lg w-full"
            >
              <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={unit.imagem}
                  alt={unit.nome}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#C75B3A] text-white">
                    {unit.regiaoCulinaria}
                  </span>
                </div>
                {unit.id === 'recife' && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#2D6A4F] text-white">
                      Matriz
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-sm md:text-base font-semibold text-[#4A3728] font-display mb-1 group-hover:text-[#C75B3A] transition-colors">
                  {unit.nome}
                </h3>
                <p className="text-xs md:text-sm text-[#6B5B4F] mb-3 font-body line-clamp-2">
                  {unit.descricao}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#6B5B4F]">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-map-pin-line" />
                    </span>
                    <span className="font-body">{unit.cidade}, {unit.estado}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B5B4F]">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-time-line" />
                    </span>
                    <span className="font-body">{unit.horario}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#C75B3A]">
                    Ver cardápio
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-line" />
                    </span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F4E4C1] border-t border-[#E8D5A8] mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <Logo className="h-8 w-auto mb-1" size="sm" />
              <p className="text-xs text-[#6B5B4F] font-body mt-1">
                Culinária nordestina autêntica desde 2020
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <button onClick={() => navigate('/privacidade')} className="text-xs md:text-sm text-[#6B5B4F] hover:text-[#C75B3A] transition-colors font-body">
                Privacidade
              </button>
              <button onClick={() => navigate('/historia')} className="text-xs md:text-sm text-[#6B5B4F] hover:text-[#C75B3A] transition-colors font-body">
                Nossa História
              </button>
              <button onClick={() => navigate('/admin')} className="text-xs md:text-sm text-[#6B5B4F] hover:text-[#C75B3A] transition-colors font-body">
                Admin
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#E8D5A8] text-center">
            <p className="text-xs text-[#6B5B4F] font-body">
              © 2026 Raízes do Nordeste. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
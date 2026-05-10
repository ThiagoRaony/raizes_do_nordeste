import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Logo from '@/components/Logo';
import UnitSwitchModal from './UnitSwitchModal';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { count, items, clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const isHome = location.pathname === '/';
  const currentUnit = localStorage.getItem('selected_unit') || '';

  const handleUnitChange = () => {
    if (items.length > 0 && currentUnit) {
      setShowSwitchModal(true);
    } else {
      navigate('/');
      setMenuOpen(false);
    }
  };

  const confirmSwitch = () => {
    clearCart();
    localStorage.removeItem('selected_unit');
    setShowSwitchModal(false);
    navigate('/');
    setMenuOpen(false);
  };

  const handleCart = () => {
    navigate('/carrinho');
    setMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/perfil');
    setMenuOpen(false);
  };

  const handleOrders = () => {
    navigate('/pedidos');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#FFF9F0]/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            {/* Logo - icon-only no mobile, icon-text no desktop */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer"
            >
              <span className="w-10 h-10 flex items-center justify-center">
                <Logo style="icon-only" size="sm" variant="dark" />
              </span>
              <span className="hidden sm:block">
                <Logo style="icon-text" size="sm" variant="dark" className="h-8 w-auto" />
              </span>
            </button>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {!isHome && (
                <button
                  onClick={handleUnitChange}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#6B5B4F] hover:text-[#4A3728] hover:bg-[#F5EDE0] transition-colors font-body whitespace-nowrap cursor-pointer"
                >
                  <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                    <i className="ri-store-2-line" />
                  </span>
                  Trocar unidade
                </button>
              )}
              <button
                onClick={() => { navigate('/historia'); setMenuOpen(false); }}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#6B5B4F] hover:text-[#4A3728] hover:bg-[#F5EDE0] transition-colors font-body whitespace-nowrap cursor-pointer"
              >
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                  <i className="ri-book-open-line" />
                </span>
                Nossa história
              </button>
              {user ? (
                <>
                  <button
                    onClick={handleOrders}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#6B5B4F] hover:text-[#4A3728] hover:bg-[#F5EDE0] transition-colors font-body whitespace-nowrap cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                      <i className="ri-file-list-line" />
                    </span>
                    Meus pedidos
                  </button>
                  <button
                    onClick={handleProfile}
                    className="px-4 py-2.5 rounded-lg bg-[#C75B3A]/10 text-[#C75B3A] text-sm font-semibold hover:bg-[#C75B3A]/20 transition-colors font-body whitespace-nowrap cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                      <i className="ri-user-line" />
                    </span>
                    {user.nome.split(' ')[0]}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#6B5B4F] hover:text-red-600 hover:bg-red-50 transition-colors font-body whitespace-nowrap cursor-pointer"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1B4D3A] transition-colors font-body whitespace-nowrap shadow-sm cursor-pointer"
                >
                  <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                    <i className="ri-user-line" />
                  </span>
                  Entrar
                </button>
              )}
              <button
                onClick={handleCart}
                className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[#F4E4C1] text-[#4A3728] hover:bg-[#E8D5A8] transition-colors cursor-pointer"
              >
                <i className="ri-shopping-cart-line text-base" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#C75B3A] text-white text-xs font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-3">
              {user ? (
                <button
                  onClick={handleProfile}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C75B3A]/10 text-[#C75B3A] cursor-pointer"
                >
                  <i className="ri-user-line text-base" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2.5 rounded-lg bg-[#2D6A4F] text-white text-sm font-semibold cursor-pointer"
                >
                  Entrar
                </button>
              )}
              <button
                onClick={handleCart}
                className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[#F4E4C1] text-[#4A3728] cursor-pointer"
              >
                <i className="ri-shopping-cart-line text-base" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#C75B3A] text-white text-[10px] font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-[#4A3728] cursor-pointer"
              >
                <i className={menuOpen ? 'ri-close-line text-lg' : 'ri-menu-line text-lg'} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {!isHome && (
              <button
                onClick={handleUnitChange}
                className="w-full text-left px-4 py-3 text-sm font-medium text-[#4A3728] font-body rounded-lg hover:bg-[#F5EDE0] cursor-pointer flex items-center"
              >
                <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                  <i className="ri-store-2-line" />
                </span>
                Trocar unidade
              </button>
            )}
            <button
              onClick={() => { navigate('/historia'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-[#4A3728] font-body rounded-lg hover:bg-[#F5EDE0] cursor-pointer flex items-center"
            >
              <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                <i className="ri-book-open-line" />
              </span>
              Nossa história
            </button>
            {user ? (
              <>
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#4A3728] font-body rounded-lg hover:bg-[#F5EDE0] cursor-pointer flex items-center"
                >
                  <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                    <i className="ri-user-line" />
                  </span>
                  Meu perfil
                </button>
                <button
                  onClick={handleOrders}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#4A3728] font-body rounded-lg hover:bg-[#F5EDE0] cursor-pointer flex items-center"
                >
                  <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                    <i className="ri-file-list-line" />
                  </span>
                  Meus pedidos
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 font-body rounded-lg hover:bg-red-50 cursor-pointer flex items-center"
                >
                  <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                    <i className="ri-logout-box-line" />
                  </span>
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-[#C75B3A] font-body rounded-lg hover:bg-[#C75B3A]/10 cursor-pointer flex items-center"
              >
                <span className="w-5 h-5 inline-flex items-center justify-center mr-2.5">
                  <i className="ri-login-box-line" />
                </span>
                Entrar / Criar conta
              </button>
            )}
          </div>
        )}
      </nav>

      <UnitSwitchModal
        visible={showSwitchModal}
        unitName="outra unidade"
        onConfirm={confirmSwitch}
        onCancel={() => setShowSwitchModal(false)}
      />
    </>
  );
}
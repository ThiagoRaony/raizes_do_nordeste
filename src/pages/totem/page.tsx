import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProducts, getProductsByUnit } from '@/mocks/products';
import { units } from '@/mocks/units';
import type { Product } from '@/mocks/products';
import { categories } from '@/mocks/categories';

interface TotemCartItem {
  id: string;
  productId: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

export default function Totem() {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState('cafe');
  const [cart, setCart] = useState<TotemCartItem[]>([]);
  const [step, setStep] = useState<'unit' | 'menu' | 'cart' | 'payment' | 'confirm'>('unit');
  const [formaPagamento, setFormaPagamento] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [processing, setProcessing] = useState(false);
  const [senhaRetirada] = useState(() => Math.floor(100 + Math.random() * 900).toString());

  const unit = selectedUnit ? units.find((u) => u.id === selectedUnit) : null;
  const unitProducts = selectedUnit ? getProductsByUnit(selectedUnit) : [];
  const categoryProducts = unitProducts.filter(
    (p) => p.categoriaId === activeCategory && p.disponivel
  );
  const cartTotal = cart.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantidade, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, {
        id: crypto.randomUUID(),
        productId: product.id,
        nome: product.nome,
        preco: product.preco,
        quantidade: 1,
        imagem: product.imagem,
      }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantidade: qty } : i)));
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('confirm');
    }, 2500);
  };

  // UNIT SELECTION
  if (step === 'unit') {
    return (
      <div className="min-h-screen bg-grafite flex flex-col items-center justify-center px-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-terra flex items-center justify-center shadow-lg shadow-terra/30">
            <span className="w-10 h-10 flex items-center justify-center text-white text-2xl">
              <i className="ri-restaurant-2-line" />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display mb-1">Raízes do Nordeste</h1>
          <p className="text-sm text-white/60 font-body">Totem de Autoatendimento</p>
        </div>

        <p className="text-sm text-white/70 font-body mb-4">Selecione a unidade:</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
          {units.map((u) => (
            <button
              key={u.id}
              onClick={() => { setSelectedUnit(u.id); setStep('menu'); }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-terra text-white text-sm mb-2">
                <i className="ri-store-2-line" />
              </span>
              <p className="text-sm font-semibold text-white font-body">{u.cidade}</p>
              <p className="text-xs text-white/50 font-body">{u.regiaoCulinaria}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 text-sm text-white/40 hover:text-white/70 font-body transition-colors"
        >
          ← Voltar ao site
        </button>
      </div>
    );
  }

  // MENU
  if (step === 'menu') {
    return (
      <div className="min-h-screen bg-creme flex flex-col">
        {/* Header */}
        <div className="bg-grafite text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-terra text-white">
              <i className="ri-restaurant-2-line" />
            </span>
            <div>
              <p className="text-sm font-semibold font-body">{unit?.cidade}</p>
              <p className="text-xs text-white/50 font-body">Totem de autoatendimento</p>
            </div>
          </div>
          <button
            onClick={() => setStep('cart')}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <i className="ri-shopping-cart-line" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-terra text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-terra text-white'
                  : 'bg-gray-100 text-grafite-muted hover:bg-gray-200'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoryProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden text-left hover:border-terra/30 transition-all active:scale-95"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="w-full h-full object-cover object-top rounded-xl"
                    loading="lazy"
                  />
                  {product.sazonal && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-full bg-terra text-white text-[10px] font-medium">
                        Sazonal
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-grafite font-body line-clamp-1">{product.nome}</h3>
                  <p className="text-xs text-grafite-muted font-body line-clamp-2 mt-0.5">{product.descricao}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-terra font-display">R$ {product.preco.toFixed(2)}</span>
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-terra text-white text-xs">
                      <i className="ri-add-line" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        {cartCount > 0 && (
          <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-grafite-muted font-body">{cartCount} itens</p>
              <p className="text-lg font-bold text-terra font-display">R$ {cartTotal.toFixed(2)}</p>
            </div>
            <button
              onClick={() => setStep('cart')}
              className="px-6 py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
            >
              Ver carrinho →
            </button>
          </div>
        )}
      </div>
    );
  }

  // CART
  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-creme flex flex-col">
        <div className="bg-grafite text-white px-4 py-3 flex items-center justify-between">
          <button onClick={() => setStep('menu')} className="text-sm text-white/70 hover:text-white font-body">
            ← Voltar ao cardápio
          </button>
          <span className="text-sm font-semibold font-body">Carrinho</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-grafite-muted font-body">Carrinho vazio</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white rounded-lg border border-gray-100 p-3">
                  <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-cover object-top rounded-md flex-shrink-0" loading="lazy" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-grafite font-body">{item.nome}</h3>
                    <p className="text-sm font-bold text-terra mt-1 font-display">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantidade - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-grafite"
                      >
                        <i className="ri-subtract-line" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantidade + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-grafite"
                      >
                        <i className="ri-add-line" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-grafite font-body">Total</span>
              <span className="text-xl font-bold text-terra font-display">R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
            >
              Continuar para pagamento
            </button>
          </div>
        )}
      </div>
    );
  }

  // PAYMENT
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-creme flex flex-col">
        <div className="bg-grafite text-white px-4 py-3 flex items-center justify-between">
          <button onClick={() => setStep('cart')} className="text-sm text-white/70 hover:text-white font-body">
            ← Voltar
          </button>
          <span className="text-sm font-semibold font-body">Pagamento</span>
          <div className="w-8" />
        </div>

        <div className="flex-1 px-4 py-6">
          <p className="text-sm font-medium text-grafite mb-4 font-body">Selecione a forma de pagamento:</p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setFormaPagamento('pix')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${
                formaPagamento === 'pix'
                  ? 'border-terra bg-terra/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-terra/10 text-terra">
                <i className="ri-qr-code-line text-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-grafite font-body">PIX</p>
                <p className="text-xs text-grafite-muted font-body">Pagamento instantâneo</p>
              </div>
              {formaPagamento === 'pix' && <i className="ri-checkbox-circle-fill text-terra ml-auto" />}
            </button>

            <button
              onClick={() => setFormaPagamento('cartao')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${
                formaPagamento === 'cartao'
                  ? 'border-terra bg-terra/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-coqueiro/10 text-coqueiro">
                <i className="ri-bank-card-line text-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-grafite font-body">Cartão de Crédito</p>
                <p className="text-xs text-grafite-muted font-body">Débito ou crédito</p>
              </div>
              {formaPagamento === 'cartao' && <i className="ri-checkbox-circle-fill text-terra ml-auto" />}
            </button>

            <button
              onClick={() => setFormaPagamento('dinheiro')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${
                formaPagamento === 'dinheiro'
                  ? 'border-terra bg-terra/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-areia text-grafite">
                <i className="ri-cash-line text-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-grafite font-body">Dinheiro</p>
                <p className="text-xs text-grafite-muted font-body">Pague no caixa na retirada</p>
              </div>
              {formaPagamento === 'dinheiro' && <i className="ri-checkbox-circle-fill text-terra ml-auto" />}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-grafite-muted font-body">Subtotal</span>
              <span className="text-sm text-grafite font-body">R$ {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm font-semibold text-grafite font-body">Total a pagar</span>
              <span className="text-lg font-bold text-terra font-display">R$ {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-100 px-4 py-4">
          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                Processando...
              </span>
            ) : (
              'Confirmar pagamento'
            )}
          </button>
        </div>
      </div>
    );
  }

  // CONFIRMATION
  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-creme flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full bg-green-100 text-green-600 text-3xl">
            <i className="ri-checkbox-circle-line" />
          </div>
          <h1 className="text-2xl font-bold text-grafite font-display mb-2">Pedido confirmado!</h1>
          <p className="text-sm text-grafite-muted font-body">
            Retire no balcão com sua senha
          </p>
        </div>

        {/* Senha */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 text-center w-full max-w-sm">
          <p className="text-xs text-grafite-muted font-body uppercase tracking-wider mb-3">Senha de retirada</p>
          <div className="flex items-center justify-center gap-3">
            {senhaRetirada.split('').map((digit, i) => (
              <div
                key={i}
                className="w-16 h-18 rounded-lg bg-terra text-white flex items-center justify-center text-4xl font-bold font-display shadow-lg shadow-terra/20"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>

        {/* QR */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 text-center w-full max-w-sm">
          <p className="text-xs text-grafite-muted font-body uppercase tracking-wider mb-2">Escaneie no totem</p>
          <div className="w-32 h-32 mx-auto bg-white border-2 border-grafite/10 rounded-lg p-2 flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${Math.random() > 0.5 ? 'bg-grafite' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => { setStep('unit'); setCart([]); setSelectedUnit(''); }}
          className="px-8 py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
        >
          Novo pedido
        </button>

        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-grafite-muted hover:text-terra font-body transition-colors"
        >
          ← Voltar ao site
        </button>
      </div>
    );
  }

  return null;
}
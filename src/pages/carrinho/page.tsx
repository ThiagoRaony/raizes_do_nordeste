import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/hooks/useOrders';
import { units } from '@/mocks/units';
import Navbar from '@/components/Navbar';

function calcularDescontoFidelidade(pontos: number): { nivel: string; porcentagem: number } {
  if (pontos >= 2000) return { nivel: 'Diamante', porcentagem: 0.15 };
  if (pontos >= 1000) return { nivel: 'Ouro', porcentagem: 0.10 };
  if (pontos >= 500) return { nivel: 'Prata', porcentagem: 0.05 };
  return { nivel: 'Bronze', porcentagem: 0.01 };
}

type PaymentMethod = 'pix' | 'cartao' | 'dinheiro';
type CardSimResult = 'none' | 'recusado' | 'senha_invalida' | 'contate_admin' | 'sucesso';
type ResultType = 'sucesso' | 'falha' | 'timeout' | null;

export default function Carrinho() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'result'>('cart');
  const [formaPagamento, setFormaPagamento] = useState<PaymentMethod>('pix');
  const [usarDesconto, setUsarDesconto] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [pixCopied, setPixCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ResultType>(null);
  const [orderId, setOrderId] = useState('');

  // Card simulation state
  const [showCardSim, setShowCardSim] = useState(false);
  const [cardSimResult, setCardSimResult] = useState<CardSimResult>('none');
  const [cardNumber, setCardNumber] = useState('');

  const selectedUnitId = localStorage.getItem('selected_unit') || '';
  const unit = units.find((u) => u.id === selectedUnitId);

  const fidelidade = user ? calcularDescontoFidelidade(user.pontos_fidelidade) : { nivel: 'Bronze', porcentagem: 0 };
  const descontoValor = usarDesconto ? total * fidelidade.porcentagem : 0;
  const totalComDesconto = total - descontoValor;
  const pontosGanhos = Math.floor(totalComDesconto);

  if (!user) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body mb-4">Faça login para acessar seu carrinho.</p>
          <button
            onClick={() => navigate('/login?redirect=/carrinho')}
            className="px-5 py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="min-h-screen bg-creme">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center px-4">
            <span className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gray-100 text-grafite-muted text-2xl">
              <i className="ri-shopping-cart-line" />
            </span>
            <p className="text-grafite font-body mb-1">Seu carrinho está vazio</p>
            <p className="text-sm text-grafite-muted font-body mb-4">Adicione itens do cardápio para começar.</p>
            <button
              onClick={() => navigate(selectedUnitId ? `/cardapio/${selectedUnitId}` : '/')}
              className="px-5 py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
            >
              Explorar cardápio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const finalizeOrder = (status: 'sucesso' | 'falha' | 'timeout', forma: PaymentMethod) => {
    if (status === 'sucesso') {
      const order = createOrder({
        userId: user.id,
        unitId: selectedUnitId,
        unitName: unit?.nome || 'Unidade',
        items: items.map((i) => ({
          productId: i.productId,
          nome: i.nome,
          preco: i.preco,
          quantidade: i.quantidade,
          imagem: i.imagem,
          observacao: i.observacao,
        })),
        total: totalComDesconto,
        descontoFidelidade: descontoValor,
        status: 'preparando',
        formaPagamento: forma,
      });
      setOrderId(order.id);
      updateUser({ pontos_fidelidade: user.pontos_fidelidade + pontosGanhos });
      clearCart();
    }
    setResult(status);
    setCheckoutStep('result');
    setProcessing(false);
  };

  const handleCheckout = () => {
    setCheckoutStep('payment');
  };

  const handlePayPix = () => {
    setProcessing(true);
    const code = `00020126580014BR.GOV.PIX0136raizesdonordeste@pagamento.com.br520400005303986540${totalComDesconto.toFixed(2)}5802BR5913RAIZES DO NE6009RECIFE-PE62140510PEDIDO${Date.now().toString().slice(-6)}6304`;
    setPixCode(code);
    setTimeout(() => {
      const success = Math.random() > 0.3;
      finalizeOrder(success ? 'sucesso' : 'falha', 'pix');
    }, 3000);
  };

  const handlePayDinheiro = () => {
    setProcessing(true);
    setTimeout(() => {
      finalizeOrder('sucesso', 'dinheiro');
    }, 1500);
  };

  const handleOpenCardSim = () => {
    setShowCardSim(true);
    setCardSimResult('none');
    setCardNumber('');
  };

  const handleCardSimTest = (scenario: CardSimResult) => {
    setCardSimResult(scenario);
    if (scenario === 'sucesso') {
      setTimeout(() => {
        setShowCardSim(false);
        setProcessing(true);
        setTimeout(() => {
          finalizeOrder('sucesso', 'cartao');
        }, 2000);
      }, 1500);
    }
  };

  const copyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const getCardSimMessage = (scenario: CardSimResult) => {
    switch (scenario) {
      case 'recusado': return 'Cartão Recusado';
      case 'senha_invalida': return 'Senha Inválida';
      case 'contate_admin': return 'Contate Administradora do Cartão';
      case 'sucesso': return 'Pagamento Realizado com Sucesso';
      default: return '';
    }
  };

  const getCardSimIcon = (scenario: CardSimResult) => {
    switch (scenario) {
      case 'recusado': return 'ri-close-circle-line text-red-500';
      case 'senha_invalida': return 'ri-lock-unlock-line text-orange-500';
      case 'contate_admin': return 'ri-customer-service-line text-yellow-600';
      case 'sucesso': return 'ri-checkbox-circle-line text-green-500';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />

      {/* Card Simulation Modal */}
      {showCardSim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCardSim(false)} />
          <div className="relative bg-white rounded-xl border border-gray-100 p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-grafite font-body">Simulação de Cartão</h3>
              <button onClick={() => setShowCardSim(false)} className="w-8 h-8 flex items-center justify-center text-grafite-muted hover:text-grafite">
                <i className="ri-close-line" />
              </button>
            </div>

            {cardSimResult === 'none' && (
              <>
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-xs text-grafite-muted mb-1 font-body">Número do cartão (simulado)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-terra/30"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-grafite-muted mb-1 font-body">Validade</label>
                      <input type="text" placeholder="MM/AA" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-terra/30" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-grafite-muted mb-1 font-body">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-terra/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-grafite-muted mb-1 font-body">Nome no cartão</label>
                    <input type="text" placeholder="NOME SOBRENOME" className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-terra/30" />
                  </div>
                </div>

                <p className="text-xs text-grafite-muted font-body mb-3 text-center">Escolha um cenário de teste:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCardSimTest('recusado')}
                    className="px-3 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors"
                  >
                    Cartão Recusado
                  </button>
                  <button
                    onClick={() => handleCardSimTest('senha_invalida')}
                    className="px-3 py-2.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-700 text-xs font-medium hover:bg-orange-100 transition-colors"
                  >
                    Senha Inválida
                  </button>
                  <button
                    onClick={() => handleCardSimTest('contate_admin')}
                    className="px-3 py-2.5 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700 text-xs font-medium hover:bg-yellow-100 transition-colors"
                  >
                    Contate Administradora
                  </button>
                  <button
                    onClick={() => handleCardSimTest('sucesso')}
                    className="px-3 py-2.5 rounded-lg border border-green-200 bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                  >
                    Pagamento Sucesso
                  </button>
                </div>
              </>
            )}

            {cardSimResult !== 'none' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gray-50">
                  <i className={`text-3xl ${getCardSimIcon(cardSimResult)}`} />
                </div>
                <h4 className="text-lg font-semibold text-grafite font-body mb-1">
                  {getCardSimMessage(cardSimResult)}
                </h4>
                <p className="text-sm text-grafite-muted font-body mb-4">
                  {cardSimResult === 'sucesso'
                    ? 'Processando seu pagamento...'
                    : 'O pagamento não pôde ser concluído. Tente outro método.'}
                </p>
                {cardSimResult !== 'sucesso' && (
                  <button
                    onClick={() => setCardSimResult('none')}
                    className="px-5 py-2 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
                  >
                    Tentar novamente
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1 rounded-full ${checkoutStep === 'cart' ? 'bg-terra' : 'bg-terra'}`} />
          <div className={`flex-1 h-1 rounded-full ${checkoutStep === 'payment' || checkoutStep === 'result' ? 'bg-terra' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-1 rounded-full ${checkoutStep === 'result' ? 'bg-terra' : 'bg-gray-200'}`} />
        </div>

        {checkoutStep === 'cart' && (
          <>
            <h1 className="text-xl font-bold text-grafite font-display mb-5">Seu carrinho</h1>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white rounded-lg border border-gray-100 p-3">
                  <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-cover object-top rounded-md flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-grafite font-body truncate">{item.nome}</h3>
                    {item.observacao && <p className="text-xs text-grafite-muted mt-0.5 font-body">Obs: {item.observacao}</p>}
                    <p className="text-sm font-bold text-terra mt-1 font-display">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantidade - 1)} className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-grafite hover:border-terra">
                        <i className="ri-subtract-line" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantidade}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantidade + 1)} className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-grafite hover:border-terra">
                        <i className="ri-add-line" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-600">
                        <i className="ri-delete-bin-line" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fidelity discount */}
            {user && fidelidade.porcentagem > 0 && (
              <div className="bg-white rounded-lg border border-gray-100 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-grafite font-body">
                      Desconto fidelidade {fidelidade.nivel}
                    </p>
                    <p className="text-xs text-grafite-muted font-body">
                      {(fidelidade.porcentagem * 100).toFixed(0)}% de desconto no total
                    </p>
                  </div>
                  <button
                    onClick={() => setUsarDesconto(!usarDesconto)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      usarDesconto
                        ? 'bg-terra text-white'
                        : 'bg-gray-100 text-grafite-muted hover:bg-gray-200'
                    }`}
                  >
                    {usarDesconto ? 'Ativado' : 'Usar'}
                  </button>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-grafite-muted">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                {usarDesconto && descontoValor > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto {fidelidade.nivel}</span>
                    <span>- R$ {descontoValor.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-grafite font-semibold pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>R$ {totalComDesconto.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
            >
              Continuar para pagamento
            </button>

            <button
              onClick={() => navigate(selectedUnitId ? `/cardapio/${selectedUnitId}` : '/')}
              className="w-full mt-3 py-2.5 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <span className="w-4 h-4 inline-flex items-center justify-center mr-1.5">
                <i className="ri-arrow-left-line" />
              </span>
              Continuar comprando
            </button>
          </>
        )}

        {checkoutStep === 'payment' && (
          <>
            <h1 className="text-xl font-bold text-grafite font-display mb-5">Pagamento</h1>

            {/* Payment method toggle - 3 options */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <button
                onClick={() => setFormaPagamento('pix')}
                className={`py-2.5 text-sm font-medium rounded-lg transition-colors flex flex-col items-center justify-center gap-1 ${
                  formaPagamento === 'pix' ? 'bg-terra text-white' : 'bg-white border border-gray-200 text-grafite-muted hover:text-grafite'
                }`}
              >
                <i className="ri-qr-code-line text-lg" />
                <span>PIX</span>
              </button>
              <button
                onClick={() => setFormaPagamento('cartao')}
                className={`py-2.5 text-sm font-medium rounded-lg transition-colors flex flex-col items-center justify-center gap-1 ${
                  formaPagamento === 'cartao' ? 'bg-terra text-white' : 'bg-white border border-gray-200 text-grafite-muted hover:text-grafite'
                }`}
              >
                <i className="ri-bank-card-line text-lg" />
                <span>Cartão</span>
              </button>
              <button
                onClick={() => setFormaPagamento('dinheiro')}
                className={`py-2.5 text-sm font-medium rounded-lg transition-colors flex flex-col items-center justify-center gap-1 ${
                  formaPagamento === 'dinheiro' ? 'bg-terra text-white' : 'bg-white border border-gray-200 text-grafite-muted hover:text-grafite'
                }`}
              >
                <i className="ri-cash-line text-lg" />
                <span>Dinheiro</span>
              </button>
            </div>

            {/* PIX section */}
            {formaPagamento === 'pix' && (
              <div className="bg-white rounded-lg border border-gray-100 p-5 mb-5">
                <p className="text-sm font-medium text-grafite mb-3 font-body">Simulação de pagamento PIX</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-xs text-grafite-muted mb-1 font-body">Código PIX (simulado)</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-grafite bg-white border border-gray-200 rounded-md px-2 py-1.5 truncate font-mono">
                      {pixCode || 'Aguardando geração...'}
                    </code>
                    {pixCode && (
                      <button onClick={copyPix} className="px-3 py-1.5 rounded-md bg-terra text-white text-xs font-medium hover:bg-terra-dark whitespace-nowrap">
                        {pixCopied ? 'Copiado!' : 'Copiar'}
                      </button>
                    )}
                  </div>
                </div>
                <button
                  onClick={handlePayPix}
                  disabled={processing}
                  className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    'Pagar com PIX'
                  )}
                </button>
              </div>
            )}

            {/* Cartão section */}
            {formaPagamento === 'cartao' && (
              <div className="bg-white rounded-lg border border-gray-100 p-5 mb-5">
                <p className="text-sm font-medium text-grafite mb-3 font-body">Pagamento com Cartão</p>
                <div className="bg-terra/5 rounded-lg p-4 mb-3 border border-terra/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-terra/10 text-terra">
                      <i className="ri-bank-card-line" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-grafite font-body">Simulação de cartão de crédito</p>
                      <p className="text-xs text-grafite-muted font-body">Teste diferentes cenários de pagamento</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleOpenCardSim}
                  disabled={processing}
                  className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    'Simular pagamento com Cartão'
                  )}
                </button>
              </div>
            )}

            {/* Dinheiro section */}
            {formaPagamento === 'dinheiro' && (
              <div className="bg-white rounded-lg border border-gray-100 p-5 mb-5">
                <p className="text-sm font-medium text-grafite mb-3 font-body">Pagamento em Dinheiro</p>
                <div className="bg-green-50 rounded-lg p-4 mb-3 border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                      <i className="ri-cash-line text-lg" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-grafite font-body">Pague na retirada</p>
                      <p className="text-xs text-grafite-muted font-body">Você pagará diretamente no balcão ao retirar seu pedido.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-grafite-muted">Valor a pagar na retirada</span>
                    <span className="font-semibold text-terra font-display">R$ {totalComDesconto.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handlePayDinheiro}
                  disabled={processing}
                  className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" />
                      Confirmando...
                    </span>
                  ) : (
                    'Confirmar pedido (pagar na retirada)'
                  )}
                </button>
              </div>
            )}

            <button
              onClick={() => setCheckoutStep('cart')}
              className="w-full text-center text-sm text-grafite-muted hover:text-terra transition-colors font-body"
            >
              ← Voltar ao carrinho
            </button>
          </>
        )}

        {checkoutStep === 'result' && (
          <div className="text-center py-8">
            {result === 'sucesso' && (
              <>
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-green-100 text-green-600 text-2xl">
                  <i className="ri-checkbox-circle-line" />
                </div>
                <h2 className="text-xl font-bold text-grafite font-display mb-2">
                  {formaPagamento === 'dinheiro' ? 'Pedido confirmado!' : 'Pagamento aprovado!'}
                </h2>
                <p className="text-sm text-grafite-muted font-body mb-1">
                  {formaPagamento === 'dinheiro'
                    ? 'Seu pedido foi confirmado. Pague na retirada.'
                    : 'Seu pedido foi confirmado.'}
                </p>
                <p className="text-xs text-grafite-muted font-body mb-6">Você ganhou {pontosGanhos} pontos de fidelidade.</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/pedido-confirmado/${orderId}`)}
                    className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
                  >
                    Ver confirmação
                  </button>
                  <button
                    onClick={() => navigate(`/acompanhamento/${orderId}`)}
                    className="w-full py-2.5 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Acompanhar pedido
                  </button>
                </div>
              </>
            )}
            {result === 'falha' && (
              <>
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-red-100 text-red-600 text-2xl">
                  <i className="ri-close-circle-line" />
                </div>
                <h2 className="text-xl font-bold text-grafite font-display mb-2">Pagamento recusado</h2>
                <p className="text-sm text-grafite-muted font-body mb-6">Ocorreu um problema com o pagamento. Tente novamente.</p>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
                >
                  Tentar novamente
                </button>
              </>
            )}
            {result === 'timeout' && (
              <>
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-yellow-100 text-yellow-600 text-2xl">
                  <i className="ri-time-line" />
                </div>
                <h2 className="text-xl font-bold text-grafite font-display mb-2">Tempo esgotado</h2>
                <p className="text-sm text-grafite-muted font-body mb-6">A transação demorou muito para ser processada. Tente novamente.</p>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
                >
                  Tentar novamente
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { units } from '@/mocks/units';

export default function PedidoConfirmado() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { getAllOrders } = useOrders();
  const [countdown, setCountdown] = useState(180);
  const [senhaRetirada] = useState(() => Math.floor(100 + Math.random() * 900).toString());

  const allOrders = getAllOrders();
  const order = allOrders.find((o) => o.id === orderId);
  const unit = order ? units.find((u) => u.id === order.unitId) : null;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body mb-4">Pedido não encontrado.</p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-md bg-terra text-white text-sm font-semibold"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creme">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-creme/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-sm text-grafite-muted hover:text-terra font-body">
            ← Início
          </button>
          <span className="text-sm font-medium text-grafite font-body">Pedido confirmado</span>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 rounded-full bg-green-100 text-green-600 text-3xl shadow-sm">
            <i className="ri-checkbox-circle-line" />
          </div>
          <h1 className="text-2xl font-bold text-grafite font-display mb-1">Pedido confirmado!</h1>
          <p className="text-sm text-grafite-muted font-body">
            #{order.id.slice(-6).toUpperCase()} • {unit?.nome}
          </p>
        </div>

        {/* Senha de retirada - Pickup code */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5 text-center">
          <p className="text-xs text-grafite-muted font-body uppercase tracking-wider mb-2">Senha de retirada</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            {senhaRetirada.split('').map((digit, i) => (
              <div
                key={i}
                className="w-14 h-16 md:w-16 md:h-18 rounded-lg bg-terra text-white flex items-center justify-center text-3xl md:text-4xl font-bold font-display shadow-lg shadow-terra/20"
              >
                {digit}
              </div>
            ))}
          </div>
          <p className="text-xs text-grafite-muted font-body">
            Apresente essa senha no balcão para retirar seu pedido
          </p>
        </div>

        {/* QR Code simulation */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 text-center">
          <p className="text-xs text-grafite-muted font-body uppercase tracking-wider mb-3">Código QR para retirada</p>
          <div className="w-40 h-40 mx-auto bg-white border-2 border-grafite/10 rounded-lg p-2 flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${Math.random() > 0.5 ? 'bg-grafite' : 'bg-transparent'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-grafite-muted font-body mt-3">
            Escaneie no totem da unidade para agilizar a retirada
          </p>
        </div>

        {/* Estimated time */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center text-terra">
                <i className="ri-time-line" />
              </span>
              <span className="text-sm font-medium text-grafite font-body">Tempo estimado</span>
            </div>
            <span className="text-lg font-bold text-terra font-display">{formatTime(countdown)}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-terra rounded-full transition-all duration-1000"
              style={{ width: `${((180 - countdown) / 180) * 100}%` }}
            />
          </div>
          <p className="text-xs text-grafite-muted font-body">
            Preparando seu pedido. Você será notificado quando estiver pronto.
          </p>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
          <h3 className="text-sm font-semibold text-grafite font-body mb-3">Resumo do pedido</h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-grafite font-body">
                  {item.quantidade}x {item.nome}
                </span>
                <span className="text-grafite-muted font-body">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-grafite font-body">Total</span>
            <span className="text-lg font-bold text-terra font-display">R$ {order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment info */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center text-green-600">
              <i className={order.formaPagamento === 'pix' ? 'ri-qr-code-line' : order.formaPagamento === 'dinheiro' ? 'ri-cash-line' : 'ri-bank-card-line'} />
            </span>
            <span className="text-sm font-medium text-grafite font-body">
              Pagamento via {order.formaPagamento === 'pix' ? 'PIX' : order.formaPagamento === 'dinheiro' ? 'Dinheiro (na retirada)' : 'Cartão'}
            </span>
          </div>
          <p className="text-xs text-grafite-muted font-body flex items-center gap-1">
            <i className="ri-checkbox-circle-fill text-green-600" />
            {order.formaPagamento === 'dinheiro'
              ? 'Aguardando pagamento na retirada'
              : 'Pagamento aprovado'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/acompanhamento/${order.id}`)}
            className="w-full py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
          >
            Acompanhar em tempo real
          </button>
          <button
            onClick={() => navigate(`/cardapio/${order.unitId}`)}
            className="w-full py-2.5 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Fazer novo pedido
          </button>
        </div>
      </div>
    </div>
  );
}
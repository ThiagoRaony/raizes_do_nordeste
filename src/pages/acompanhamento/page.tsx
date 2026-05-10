import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Navbar from '@/components/Navbar';

const statusSteps = [
  { key: 'pendente', label: 'Pedido recebido', icon: 'ri-file-list-3-line' },
  { key: 'preparando', label: 'Em preparação', icon: 'ri-fire-line' },
  { key: 'pronto', label: 'Pronto para retirada', icon: 'ri-box-3-line' },
  { key: 'entregue', label: 'Entregue', icon: 'ri-check-double-line' },
];

export default function Acompanhamento() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, updateOrder } = useOrders();
  const [currentStatus, setCurrentStatus] = useState(0);

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (!order || order.status === 'cancelado' || order.status === 'falha') return;
    const stepIndex = statusSteps.findIndex((s) => s.key === order.status);
    setCurrentStatus(Math.max(0, stepIndex));
  }, [order]);

  useEffect(() => {
    if (!order || order.status === 'cancelado' || order.status === 'falha') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (order.status === 'pendente') {
      timers.push(setTimeout(() => updateOrder(order.id, { status: 'preparando' }), 3000));
    }
    if (order.status === 'preparando') {
      timers.push(setTimeout(() => updateOrder(order.id, { status: 'pronto' }), 8000));
    }
    if (order.status === 'pronto') {
      timers.push(setTimeout(() => updateOrder(order.id, { status: 'entregue' }), 5000));
    }
    return () => timers.forEach(clearTimeout);
  }, [order?.status, order?.id, updateOrder]);

  if (!order) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body">Pedido não encontrado.</p>
          <button onClick={() => navigate('/pedidos')} className="mt-4 px-4 py-2 rounded-md bg-terra text-white text-sm font-medium">
            Meus pedidos
          </button>
        </div>
      </div>
    );
  }

  if (!user || user.id !== order.userId) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body">Você não tem permissão para visualizar este pedido.</p>
          <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 rounded-md bg-terra text-white text-sm font-medium">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const statusIndex = statusSteps.findIndex((s) => s.key === order.status);
  const isDone = order.status === 'entregue';

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <button onClick={() => navigate('/pedidos')} className="text-sm text-grafite-muted hover:text-terra transition-colors mb-4 font-body flex items-center gap-1">
          <span className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-left-line" /></span>
          Meus pedidos
        </button>

        <h1 className="text-xl font-bold text-grafite font-display mb-1">Acompanhamento</h1>
        <p className="text-sm text-grafite-muted font-body mb-6">Pedido #{order.id.slice(-6).toUpperCase()}</p>

        {/* Timeline */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 md:p-6 mb-5">
          <div className="relative">
            {statusSteps.map((step, idx) => {
              const isActive = idx <= statusIndex;
              const isCurrent = idx === statusIndex;
              return (
                <div key={step.key} className="flex items-start gap-4 mb-5 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full text-sm ${isActive ? 'bg-terra text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <i className={step.icon} />
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 ${idx < statusIndex ? 'bg-terra' : 'bg-gray-100'}`} />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-sm font-medium font-body ${isActive ? 'text-grafite' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && !isDone && (
                      <p className="text-xs text-terra font-body mt-0.5">Em andamento...</p>
                    )}
                    {isDone && idx === statusSteps.length - 1 && (
                      <p className="text-xs text-green-600 font-body mt-0.5">Pedido concluído</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 mb-5">
          <h2 className="text-sm font-semibold text-grafite font-display mb-3">Itens do pedido</h2>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm font-body">
                <span className="text-grafite">{item.quantidade}x {item.nome}</span>
                <span className="text-grafite-muted">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm font-body">
            <span className="font-medium text-grafite">Total</span>
            <span className="font-bold text-terra font-display">R$ {order.total.toFixed(2)}</span>
          </div>
        </div>

        {isDone && (
          <button
            onClick={() => navigate('/pedidos')}
            className="w-full py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
          >
            Avaliar pedido
          </button>
        )}
      </div>
    </div>
  );
}
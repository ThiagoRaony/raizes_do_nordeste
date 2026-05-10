import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { units } from '@/mocks/units';
import Navbar from '@/components/Navbar';

export default function Pedidos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserOrders, updateOrder, repeatOrder } = useOrders();
  const [ratingOrderId, setRatingOrderId] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body mb-4">Faça login para ver seus pedidos.</p>
          <button
            onClick={() => navigate('/login?redirect=/pedidos')}
            className="px-5 py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const orders = getUserOrders(user.id);

  const handleRate = (orderId: string) => {
    setRatingOrderId(orderId);
    const order = orders.find((o) => o.id === orderId);
    setRatingValue(order?.avaliacao || 0);
    setRatingComment(order?.comentarioAvaliacao || '');
  };

  const handleSubmitRate = () => {
    if (!ratingOrderId) return;
    updateOrder(ratingOrderId, { avaliacao: ratingValue, comentarioAvaliacao: ratingComment });
    setRatingOrderId(null);
    setRatingValue(0);
    setRatingComment('');
  };

  const handleRepeat = (orderId: string) => {
    const selectedUnitId = localStorage.getItem('selected_unit') || '';
    const unit = units.find((u) => u.id === selectedUnitId);
    const newOrder = repeatOrder(orderId, user.id, selectedUnitId, unit?.nome || 'Unidade');
    if (newOrder) {
      navigate(`/acompanhamento/${newOrder.id}`);
    }
  };

  const statusLabel: Record<string, string> = {
    pendente: 'Pendente',
    preparando: 'Em preparação',
    pronto: 'Pronto',
    entregue: 'Entregue',
    cancelado: 'Cancelado',
    falha: 'Falha no pagamento',
  };

  const statusColor: Record<string, string> = {
    pendente: 'bg-yellow-100 text-yellow-700',
    preparando: 'bg-terra/10 text-terra',
    pronto: 'bg-blue-100 text-blue-700',
    entregue: 'bg-green-100 text-green-700',
    cancelado: 'bg-gray-100 text-gray-500',
    falha: 'bg-red-100 text-red-600',
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-xl font-bold text-grafite font-display mb-5">Meus pedidos</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <span className="w-14 h-14 flex items-center justify-center mx-auto mb-3 rounded-full bg-gray-100 text-grafite-muted text-xl">
              <i className="ri-file-list-3-line" />
            </span>
            <p className="text-sm text-grafite-muted font-body">Você ainda não fez nenhum pedido.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-3 px-4 py-2 rounded-md bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors"
            >
              Fazer primeiro pedido
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-100 p-4 md:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-grafite font-body">
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-grafite-muted font-body">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[order.status] || 'bg-gray-100 text-gray-500'}`}>
                    {statusLabel[order.status]}
                  </span>
                </div>

                <p className="text-xs text-grafite-muted font-body mb-2">{order.unitName}</p>

                <div className="space-y-1 mb-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={item.imagem} alt={item.nome} className="w-8 h-8 object-cover object-top rounded-md" loading="lazy" />
                      <span className="text-xs text-grafite font-body">{item.quantidade}x {item.nome}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-grafite-muted font-body">+{order.items.length - 3} itens</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-terra font-display">R$ {order.total.toFixed(2)}</p>
                    {order.descontoFidelidade > 0 && (
                      <p className="text-xs text-green-600 font-body">
                        -R$ {order.descontoFidelidade.toFixed(2)} fidelidade
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'entregue' && (
                      <>
                        <button
                          onClick={() => handleRate(order.id)}
                          className="px-3 py-1.5 rounded-md border border-areia-dark text-grafite text-xs font-medium hover:bg-areia transition-colors whitespace-nowrap"
                        >
                          {order.avaliacao ? 'Editar avaliação' : 'Avaliar'}
                        </button>
                        <button
                          onClick={() => handleRepeat(order.id)}
                          className="px-3 py-1.5 rounded-md bg-terra text-white text-xs font-medium hover:bg-terra-dark transition-colors whitespace-nowrap"
                        >
                          Repetir
                        </button>
                      </>
                    )}
                    {order.status !== 'entregue' && order.status !== 'cancelado' && order.status !== 'falha' && (
                      <button
                        onClick={() => navigate(`/acompanhamento/${order.id}`)}
                        className="px-3 py-1.5 rounded-md bg-terra text-white text-xs font-medium hover:bg-terra-dark transition-colors whitespace-nowrap"
                      >
                        Acompanhar
                      </button>
                    )}
                  </div>
                </div>

                {order.avaliacao && (
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`w-4 h-4 flex items-center justify-center text-sm ${i < order.avaliacao! ? 'text-yellow-400' : 'text-gray-200'}`}>
                        <i className="ri-star-fill" />
                      </span>
                    ))}
                    {order.comentarioAvaliacao && (
                      <span className="text-xs text-grafite-muted font-body ml-1">“{order.comentarioAvaliacao}”</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating modal */}
      {ratingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-creme rounded-lg max-w-sm w-full p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-grafite font-display mb-4">Avaliar pedido</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRatingValue(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center text-xl transition-colors ${
                    i < ratingValue ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-200'
                  }`}
                >
                  <i className="ri-star-fill" />
                </button>
              ))}
            </div>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              maxLength={300}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 font-body resize-none mb-3"
              placeholder="Comentário opcional..."
            />
            <p className="text-xs text-grafite-muted mb-4 font-body">{ratingComment.length}/300</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRatingOrderId(null)}
                className="flex-1 py-2 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitRate}
                disabled={ratingValue === 0}
                className="flex-1 py-2 rounded-md bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
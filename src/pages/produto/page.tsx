import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { units } from '@/mocks/units';
import { getProductById } from '@/mocks/products';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

export default function Produto() {
  const { unitId, productId } = useParams<{ unitId: string; productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const unit = units.find((u) => u.id === unitId);
  const product = getProductById(unitId || '', productId || '');

  if (!unit || !product) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center">
          <p className="text-grafite-muted font-body">Produto não encontrado.</p>
          <button
            onClick={() => navigate(`/cardapio/${unitId}`)}
            className="mt-4 px-4 py-2 rounded-md bg-terra text-white text-sm font-medium"
          >
            Voltar ao cardápio
          </button>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      nome: product.nome,
      preco: product.preco,
      quantidade,
      imagem: product.imagem,
      observacao: observacao.trim() || undefined,
    });
    setToastMsg(`${product.nome} adicionado ao carrinho`);
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Back */}
        <button
          onClick={() => navigate(`/cardapio/${unitId}`)}
          className="text-sm text-grafite-muted hover:text-terra transition-colors mb-4 font-body flex items-center gap-1"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-left-line" />
          </span>
          Voltar ao cardápio
        </button>

        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="h-56 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>

          <div className="p-5 md:p-6">
            {product.sazonal && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-terra/10 text-terra mb-2">
                Sazonal
              </span>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-grafite font-display mb-2">
              {product.nome}
            </h1>
            <p className="text-sm text-grafite-muted font-body leading-relaxed mb-4">
              {product.descricao}
            </p>

            <div className="flex items-center gap-2 mb-5 text-xs text-grafite-muted">
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-store-2-line" />
              </span>
              <span className="font-body">{unit.nome}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-grafite font-body">Quantidade</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-grafite hover:border-terra hover:text-terra transition-colors"
                >
                  <i className="ri-subtract-line" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-grafite font-display">
                  {quantidade}
                </span>
                <button
                  onClick={() => setQuantidade((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-grafite hover:border-terra hover:text-terra transition-colors"
                >
                  <i className="ri-add-line" />
                </button>
              </div>
            </div>

            {/* Observation */}
            <div className="mb-5">
              <label htmlFor="obs" className="block text-sm font-medium text-grafite mb-1.5 font-body">
                Observação (opcional)
              </label>
              <textarea
                id="obs"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                maxLength={200}
                rows={2}
                className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 focus:border-terra font-body resize-none"
                placeholder="Ex: sem cebola, bem passado..."
              />
              <p className="text-xs text-grafite-muted mt-1 font-body">{observacao.length}/200</p>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-grafite-muted font-body">Total</p>
                <p className="text-2xl font-bold text-terra font-display">
                  R$ {(product.preco * quantidade).toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-add-line" />
                </span>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toastMsg} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
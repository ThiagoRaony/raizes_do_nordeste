import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { units } from '@/mocks/units';
import { categories } from '@/mocks/categories';
import { getProductsByUnit } from '@/mocks/products';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

export default function Cardapio() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('cafe');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const unit = units.find((u) => u.id === unitId);
  if (!unit) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center">
          <p className="text-grafite-muted font-body">Unidade não encontrada.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 rounded-md bg-terra text-white text-sm font-medium"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const products = getProductsByUnit(unitId || '');
  const filtered = products.filter((p) => p.categoriaId === activeCategory);
  const sazonalProducts = products.filter((p) => p.sazonal);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      productId: product.id,
      nome: product.nome,
      preco: product.preco,
      quantidade: 1,
      imagem: product.imagem,
    });
    setToastMsg(`${product.nome} adicionado ao carrinho`);
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />

      {/* Unit header */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src={unit.imagem} alt={unit.nome} className="w-full h-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-terra text-white">
              {unit.regiaoCulinaria}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              {unit.cidade}, {unit.estado}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white font-display">{unit.nome}</h1>
        </div>
      </div>

      {/* Sazonal highlight */}
      {sazonalProducts.length > 0 && (
        <div className="bg-gradient-to-r from-terra/10 to-areia border-b border-areia-dark">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 flex items-center justify-center text-terra">
                <i className="ri-fire-line" />
              </span>
              <h2 className="text-sm font-semibold text-terra font-display">Destaques Sazonais</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {sazonalProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/produto/${unitId}/${p.id}`)}
                  className="flex-shrink-0 w-36 sm:w-40 bg-white rounded-lg overflow-hidden border border-gray-100 snap-start text-left"
                >
                  <div className="h-24 sm:h-28 overflow-hidden">
                    <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-grafite line-clamp-1 font-body">{p.nome}</p>
                    <p className="text-xs text-terra font-semibold mt-0.5">
                      R$ {p.preco.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="sticky top-14 md:top-16 z-30 bg-creme border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-terra text-white'
                    : 'bg-white text-grafite-muted hover:text-grafite border border-gray-100'
                }`}
              >
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1">
                  <i className={cat.icone} />
                </span>
                {cat.nome}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <h2 className="text-lg font-semibold text-grafite font-display mb-4">
          {categories.find((c) => c.id === activeCategory)?.nome}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-sm text-grafite-muted font-body">Nenhum produto nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-terra/20 transition-colors"
              >
                <button
                  onClick={() => navigate(`/produto/${unitId}/${product.id}`)}
                  className="w-full text-left"
                >
                  <div className="h-44 sm:h-48 overflow-hidden">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </button>
                <div className="p-4">
                  <button
                    onClick={() => navigate(`/produto/${unitId}/${product.id}`)}
                    className="w-full text-left"
                  >
                    <h3 className="text-sm font-semibold text-grafite font-body line-clamp-1">
                      {product.nome}
                    </h3>
                    <p className="text-xs text-grafite-muted mt-1 line-clamp-2 font-body">
                      {product.descricao}
                    </p>
                  </button>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-terra font-display">
                      R$ {product.preco.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-terra text-white hover:bg-terra-dark transition-colors"
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

      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
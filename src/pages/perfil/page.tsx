import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Navbar from '@/components/Navbar';

function calcularNivelFidelidade(pontos: number): { nivel: string; porcentagem: number; proximo: number; cor: string } {
  if (pontos >= 2000) return { nivel: 'Diamante', porcentagem: 0.15, proximo: 2000, cor: 'from-amber-500 to-yellow-400' };
  if (pontos >= 1000) return { nivel: 'Ouro', porcentagem: 0.10, proximo: 2000, cor: 'from-yellow-500 to-yellow-300' };
  if (pontos >= 500) return { nivel: 'Prata', porcentagem: 0.05, proximo: 1000, cor: 'from-gray-400 to-gray-300' };
  return { nivel: 'Bronze', porcentagem: 0.01, proximo: 500, cor: 'from-amber-700 to-amber-500' };
}

const nivelIcon: Record<string, string> = {
  Bronze: 'ri-vip-crown-line',
  Prata: 'ri-vip-diamond-line',
  Ouro: 'ri-vip-crown-fill',
  Diamante: 'ri-vip-diamond-fill',
};

export default function Perfil() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const { getUserOrders } = useOrders();
  const [editMode, setEditMode] = useState(false);
  const [editNome, setEditNome] = useState(user?.nome || '');
  const [editTelefone, setEditTelefone] = useState(user?.telefone || '');
  const [editEndereco, setEditEndereco] = useState(user?.endereco || '');
  const [savedMsg, setSavedMsg] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-grafite-muted font-body mb-4">Faça login para acessar seu perfil.</p>
          <button
            onClick={() => navigate('/login?redirect=/perfil')}
            className="px-5 py-2.5 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const fidelidade = calcularNivelFidelidade(user.pontos_fidelidade);
  const orders = getUserOrders(user.id);
  const totalPedidos = orders.length;
  const totalGasto = orders.reduce((sum, o) => sum + o.total, 0);

  const handleSave = () => {
    updateUser({ nome: editNome, telefone: editTelefone, endereco: editEndereco });
    setSavedMsg('Dados atualizados com sucesso!');
    setEditMode(false);
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {savedMsg && (
          <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-sm text-green-700 font-body">
            {savedMsg}
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
          <div className="h-24 bg-gradient-to-r from-terra to-terra-dark relative">
            <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-3xl text-terra">
                  <i className="ri-user-smile-fill" />
                </span>
              </div>
            </div>
          </div>
          <div className="pt-12 pb-5 px-5 text-center">
            <h1 className="text-lg font-bold text-grafite font-display">{user.nome}</h1>
            <p className="text-xs text-grafite-muted font-body">{user.email}</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${fidelidade.cor}`}>
                <span className="w-3 h-3 inline-flex items-center justify-center mr-1">
                  <i className={nivelIcon[fidelidade.nivel]} />
                </span>
                {fidelidade.nivel}
              </span>
              <span className="text-xs text-grafite-muted font-body">
                {Math.round(fidelidade.porcentagem * 100)}% desconto
              </span>
            </div>
          </div>
        </div>

        {/* Dados pessoais */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-grafite font-display">Dados pessoais</h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-terra hover:bg-terra/10 transition-colors whitespace-nowrap border border-terra/30"
              >
                <span className="w-3 h-3 inline-flex items-center justify-center mr-1">
                  <i className="ri-edit-line" />
                </span>
                Alterar
              </button>
            )}
          </div>

          {!editMode ? (
            <div className="space-y-2.5 text-sm font-body">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-creme text-grafite-muted">
                  <i className="ri-phone-line" />
                </span>
                <div>
                  <p className="text-xs text-grafite-muted">Telefone</p>
                  <p className="text-grafite">{user.telefone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-creme text-grafite-muted">
                  <i className="ri-map-pin-line" />
                </span>
                <div>
                  <p className="text-xs text-grafite-muted">Endereço de entrega</p>
                  <p className="text-grafite">{user.endereco}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-grafite mb-1 font-body">Nome</label>
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-grafite mb-1 font-body">Telefone</label>
                <input
                  type="tel"
                  value={editTelefone}
                  onChange={(e) => setEditTelefone(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 font-body"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-grafite mb-1 font-body">Endereço de entrega</label>
                <input
                  type="text"
                  value={editEndereco}
                  onChange={(e) => setEditEndereco(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm text-grafite focus:outline-none focus:ring-2 focus:ring-terra/30 font-body"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-2 rounded-md border border-gray-200 text-grafite text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-md bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fidelity */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-creme text-terra">
                <i className="ri-vip-crown-line" />
              </span>
              <h2 className="text-sm font-semibold text-grafite font-display">Programa de Fidelidade</h2>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${fidelidade.cor}`}>
              {fidelidade.nivel}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-terra font-display">{user.pontos_fidelidade}</p>
              <p className="text-xs text-grafite-muted font-body">pontos acumulados</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-grafite font-display">{Math.round(fidelidade.porcentagem * 100)}%</p>
              <p className="text-xs text-grafite-muted font-body">desconto atual</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${fidelidade.cor} transition-all`}
              style={{ width: `${Math.min(100, (user.pontos_fidelidade / fidelidade.proximo) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-grafite-muted font-body">
            {user.pontos_fidelidade >= 2000
              ? 'Você atingiu o nível máximo! Continue acumulando pontos.'
              : `${fidelidade.proximo - user.pontos_fidelidade} pontos para ${fidelidade.nivel === 'Bronze' ? 'Prata' : fidelidade.nivel === 'Prata' ? 'Ouro' : 'Diamante'}`}
          </p>

          {/* Níveis */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { nome: 'Bronze', pts: 0, pct: 1 },
              { nome: 'Prata', pts: 500, pct: 5 },
              { nome: 'Ouro', pts: 1000, pct: 10 },
              { nome: 'Diamante', pts: 2000, pct: 15 },
            ].map((n) => {
              const active = user.pontos_fidelidade >= n.pts;
              return (
                <div
                  key={n.nome}
                  className={`text-center p-2 rounded-lg border text-xs ${
                    active
                      ? 'border-terra/30 bg-terra/5 text-terra'
                      : 'border-gray-100 bg-gray-50 text-gray-400'
                  }`}
                >
                  <p className="font-bold font-display">{n.nome}</p>
                  <p className="text-[10px]">{n.pct}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg border border-gray-100 p-4 text-center">
            <span className="w-8 h-8 flex items-center justify-center mx-auto mb-1 rounded-lg bg-creme text-terra text-sm">
              <i className="ri-shopping-bag-3-line" />
            </span>
            <p className="text-xl font-bold text-grafite font-display">{totalPedidos}</p>
            <p className="text-xs text-grafite-muted font-body">pedidos realizados</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-4 text-center">
            <span className="w-8 h-8 flex items-center justify-center mx-auto mb-1 rounded-lg bg-creme text-terra text-sm">
              <i className="ri-coins-line" />
            </span>
            <p className="text-xl font-bold text-terra font-display">R$ {totalGasto.toFixed(2)}</p>
            <p className="text-xs text-grafite-muted font-body">total gasto</p>
          </div>
        </div>

        {/* LGPD consent */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-creme text-terra text-sm">
              <i className="ri-shield-check-line" />
            </span>
            <h2 className="text-sm font-semibold text-grafite font-display">Consentimentos LGPD</h2>
          </div>
          <div className="space-y-2.5 text-sm font-body">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-grafite-muted">Dados pessoais</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">Aceito</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-grafite-muted">Marketing e promoções</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${user.consentimento_marketing ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user.consentimento_marketing ? 'Aceito' : 'Recusado'}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => navigate('/privacidade')}
              className="inline-flex items-center gap-1 text-xs text-terra hover:underline font-body cursor-pointer"
            >
              Ler Política de Privacidade
              <span className="w-3 h-3 inline-flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </span>
            </button>
            <button
              onClick={() => navigate('/privacidade')}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline font-body cursor-pointer"
            >
              <span className="w-3 h-3 inline-flex items-center justify-center">
                <i className="ri-delete-bin-line" />
              </span>
              Excluir conta
            </button>
          </div>
        </div>

        {/* Pedidos recentes */}
        <div className="bg-white rounded-lg border border-gray-100 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-creme text-terra text-sm">
                <i className="ri-time-line" />
              </span>
              <h2 className="text-sm font-semibold text-grafite font-display">Pedidos recentes</h2>
            </div>
            <button
              onClick={() => navigate('/pedidos')}
              className="text-xs text-terra hover:underline font-body"
            >
              Ver todos
            </button>
          </div>
          {orders.length === 0 ? (
            <p className="text-xs text-grafite-muted font-body text-center py-3">
              Nenhum pedido ainda
            </p>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 3).map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-grafite font-body">
                      Pedido #{o.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-[10px] text-grafite-muted font-body">
                      {new Date(o.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-terra font-display">
                    R$ {o.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full py-3 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-logout-box-r-line" />
          </span>
          Sair da conta
        </button>
      </div>
    </div>
  );
}
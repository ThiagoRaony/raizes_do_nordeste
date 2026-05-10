import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { useOrders } from '@/hooks/useOrders';
import { units } from '@/mocks/units';
import { allProducts } from '@/mocks/products';
import Navbar from '@/components/Navbar';

const COLORS = ['#C75B3A', '#2D6A4F', '#E07A5F', '#1D4E6F', '#4A9E78', '#E8D5A8'];

const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-700',
  preparando: 'bg-terra/10 text-terra',
  pronto: 'bg-blue-100 text-blue-700',
  entregue: 'bg-green-100 text-green-700',
  cancelado: 'bg-gray-100 text-gray-500',
  falha: 'bg-red-100 text-red-600',
};

const statusLabels: Record<string, string> = {
  pendente: 'Pendente',
  preparando: 'Em preparação',
  pronto: 'Pronto',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
  falha: 'Falha',
};

type AdminTab = 'dashboard' | 'pedidos' | 'promocoes' | 'relatorios' | 'clientes';

// ... existing code for vendasSemana, vendasHora, produtosTop, clientesMock, promocoesMock ...

const vendasSemana = [
  { dia: 'Seg', vendas: 1240, pedidos: 45 },
  { dia: 'Ter', vendas: 1890, pedidos: 62 },
  { dia: 'Qua', vendas: 1560, pedidos: 51 },
  { dia: 'Qui', vendas: 2100, pedidos: 73 },
  { dia: 'Sex', vendas: 2850, pedidos: 98 },
  { dia: 'Sáb', vendas: 3200, pedidos: 112 },
  { dia: 'Dom', vendas: 2450, pedidos: 85 },
];

const vendasHora = [
  { hora: '06h', valor: 320 },
  { hora: '08h', valor: 890 },
  { hora: '10h', valor: 1250 },
  { hora: '12h', valor: 2100 },
  { hora: '14h', valor: 1680 },
  { hora: '16h', valor: 950 },
  { hora: '18h', valor: 1450 },
  { hora: '20h', valor: 1200 },
  { hora: '22h', valor: 480 },
];

const produtosTop = [
  { nome: 'Cuscuz com Ovo', vendas: 342 },
  { nome: 'Tapioca com Queijo', vendas: 298 },
  { nome: 'Café da Casa', vendas: 276 },
  { nome: 'Bolo de Milho', vendas: 245 },
  { nome: 'Coxinha', vendas: 198 },
  { nome: 'Pastel de Carne', vendas: 187 },
];

const clientesMock = [
  { id: '1', nome: 'Maria Silva', email: 'maria@email.com', pedidos: 23, pontos: 1450, nivel: 'Ouro', cidade: 'Recife' },
  { id: '2', nome: 'João Santos', email: 'joao@email.com', pedidos: 18, pontos: 890, nivel: 'Prata', cidade: 'Salvador' },
  { id: '3', nome: 'Ana Costa', email: 'ana@email.com', pedidos: 31, pontos: 2340, nivel: 'Diamante', cidade: 'Fortaleza' },
  { id: '4', nome: 'Pedro Lima', email: 'pedro@email.com', pedidos: 12, pontos: 340, nivel: 'Bronze', cidade: 'Natal' },
  { id: '5', nome: 'Carla Mendes', email: 'carla@email.com', pedidos: 15, pontos: 670, nivel: 'Prata', cidade: 'Maceió' },
  { id: '6', nome: 'Lucas Ferreira', email: 'lucas@email.com', pedidos: 8, pontos: 180, nivel: 'Bronze', cidade: 'São Luís' },
  { id: '7', nome: 'Juliana Rocha', email: 'ju@email.com', pedidos: 27, pontos: 1890, nivel: 'Ouro', cidade: 'Recife' },
  { id: '8', nome: 'Bruno Alves', email: 'bruno@email.com', pedidos: 5, pontos: 90, nivel: 'Bronze', cidade: 'Salvador' },
];

const promocoesMock = [
  { id: '1', nome: 'Combo Café da Manhã', descricao: 'Cuscuz + Café + Bolo de Milho', desconto: 15, ativa: true, unidade: 'Todas' },
  { id: '2', nome: 'Happy Hour Cearense', descricao: 'Cajuína + Tapioca 50% off após 18h', desconto: 50, ativa: true, unidade: 'Fortaleza' },
  { id: '3', nome: 'Dia do Acarajé', descricao: 'Acarajé + Vatapá com 20% de desconto', desconto: 20, ativa: false, unidade: 'Salvador' },
  { id: '4', nome: 'São João Especial', descricao: 'Cuscuz Junino + Cajuína', desconto: 25, ativa: true, unidade: 'Todas' },
];

export default function Admin() {
  const navigate = useNavigate();
  const { getAllOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  // Protect admin route
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('raizes_admin_auth') === 'true';
    if (!isAdmin) {
      navigate('/admin-login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  // Logout admin
  const handleAdminLogout = () => {
    localStorage.removeItem('raizes_admin_auth');
    navigate('/admin-login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center">
        <span className="flex items-center gap-2 text-sm text-grafite-muted font-body">
          <i className="ri-loader-4-line animate-spin" />
          Verificando acesso...
        </span>
      </div>
    );
  }

  // ... rest of admin page stays the same ...
  const allOrders = getAllOrders();
  const filteredOrders = selectedUnit === 'all'
    ? allOrders
    : allOrders.filter((o) => o.unitId === selectedUnit);

  const totalRevenue = allOrders.reduce((s, o) => s + o.total, 0);
  const totalOrders = allOrders.length;
  const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activeClients = clientesMock.length;

  const unitPieData = units.map((u) => ({
    name: u.cidade,
    value: allOrders.filter((o) => o.unitId === u.id).reduce((s, o) => s + o.total, 0),
    pedidos: allOrders.filter((o) => o.unitId === u.id).length,
  }));

  const unitStats = units.map((u) => ({
    ...u,
    total: allOrders.filter((o) => o.unitId === u.id).reduce((s, o) => s + o.total, 0),
    count: allOrders.filter((o) => o.unitId === u.id).length,
  }));

  const nivelColors: Record<string, string> = {
    Bronze: 'bg-amber-100 text-amber-700',
    Prata: 'bg-gray-200 text-gray-700',
    Ouro: 'bg-yellow-100 text-yellow-700',
    Diamante: 'bg-amber-50 text-amber-600',
  };

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'pedidos', label: 'Pedidos', icon: 'ri-file-list-line' },
    { id: 'promocoes', label: 'Promoções', icon: 'ri-price-tag-3-line' },
    { id: 'relatorios', label: 'Relatórios', icon: 'ri-bar-chart-box-line' },
    { id: 'clientes', label: 'Clientes', icon: 'ri-team-line' },
  ];

  return (
    <div className="min-h-screen bg-creme">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header with logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-grafite font-display">Painel Administrativo</h1>
            <p className="text-sm text-grafite-muted font-body">Matriz • Recife, PE</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-grafite-muted hover:text-terra transition-colors font-body"
            >
              ← Voltar ao site
            </button>
            <button
              onClick={handleAdminLogout}
              className="text-sm text-red-600 hover:text-red-700 transition-colors font-body flex items-center gap-1"
            >
              <i className="ri-logout-box-line" />
              Sair
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-6 bg-white rounded-lg border border-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-terra text-white'
                  : 'text-grafite-muted hover:text-grafite hover:bg-gray-50'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className={tab.icon} />
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-terra/10 text-terra">
                    <i className="ri-coins-line" />
                  </span>
                  <span className="text-xs text-grafite-muted font-body">Receita total</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-grafite font-display">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-green-600 font-body mt-1 flex items-center gap-1">
                  <i className="ri-arrow-up-line" /> +12% vs ontem
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-coqueiro/10 text-coqueiro">
                    <i className="ri-shopping-bag-line" />
                  </span>
                  <span className="text-xs text-grafite-muted font-body">Total pedidos</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-grafite font-display">{totalOrders}</p>
                <p className="text-xs text-green-600 font-body mt-1 flex items-center gap-1">
                  <i className="ri-arrow-up-line" /> +8% vs ontem
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-mar/10 text-mar">
                    <i className="ri-bill-line" />
                  </span>
                  <span className="text-xs text-grafite-muted font-body">Ticket médio</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-grafite font-display">R$ {avgTicket.toFixed(2)}</p>
                <p className="text-xs text-green-600 font-body mt-1 flex items-center gap-1">
                  <i className="ri-arrow-up-line" /> +3% vs ontem
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-terra-light/10 text-terra-light">
                    <i className="ri-user-heart-line" />
                  </span>
                  <span className="text-xs text-grafite-muted font-body">Clientes ativos</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-grafite font-display">{activeClients}</p>
                <p className="text-xs text-green-600 font-body mt-1 flex items-center gap-1">
                  <i className="ri-arrow-up-line" /> +5% vs ontem
                </p>
              </div>
            </div>

            {/* Unit stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {unitStats.map((u) => (
                <div key={u.id} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <p className="text-xs text-grafite-muted font-body truncate">{u.cidade}</p>
                  <p className="text-lg font-bold text-terra font-display">{u.count}</p>
                  <p className="text-xs text-grafite-muted font-body">pedidos</p>
                  <p className="text-sm font-semibold text-grafite mt-1 font-display">R$ {u.total.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sales by day */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Vendas da semana</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vendasSemana}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
                      />
                      <Line type="monotone" dataKey="vendas" stroke="#C75B3A" strokeWidth={2} dot={{ r: 3, fill: '#C75B3A' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sales by hour */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Vendas por horário (hoje)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendasHora}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
                      />
                      <Bar dataKey="valor" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Unit distribution pie */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Receita por unidade</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={unitPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {unitPieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  {unitPieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-xs text-grafite-muted font-body">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top products */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Produtos mais vendidos</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={produtosTop} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="nome" type="category" tick={{ fontSize: 11 }} width={100} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`${value} unidades`, 'Vendas']}
                      />
                      <Bar dataKey="vendas" fill="#C75B3A" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PEDIDOS TAB */}
        {activeTab === 'pedidos' && (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedUnit('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedUnit === 'all' ? 'bg-terra text-white' : 'bg-white text-grafite-muted border border-gray-100'
                }`}
              >
                Todas as unidades
              </button>
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedUnit === u.id ? 'bg-terra text-white' : 'bg-white text-grafite-muted border border-gray-100'
                  }`}
                >
                  {u.cidade}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Pedido</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Unidade</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Cliente</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Itens</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Total</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-sm text-grafite-muted font-body">
                          Nenhum pedido registrado.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs text-grafite font-body font-mono">#{order.id.slice(-6).toUpperCase()}</td>
                          <td className="px-4 py-3 text-xs text-grafite font-body">{order.unitName}</td>
                          <td className="px-4 py-3 text-xs text-grafite-muted font-body">{order.userId.slice(-8)}</td>
                          <td className="px-4 py-3 text-xs text-grafite-muted font-body">{order.items.length} itens</td>
                          <td className="px-4 py-3 text-xs font-semibold text-terra font-display">R$ {order.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-500'}`}>
                              {statusLabels[order.status] || order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-grafite-muted font-body">
                            {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PROMOCOES TAB */}
        {activeTab === 'promocoes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-grafite font-display">Gerenciamento de Promoções</h2>
              <button className="px-4 py-2 rounded-md bg-terra text-white text-sm font-semibold hover:bg-terra-dark transition-colors whitespace-nowrap">
                <span className="w-4 h-4 inline-flex items-center justify-center mr-1">
                  <i className="ri-add-line" />
                </span>
                Nova promoção
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promocoesMock.map((promo) => (
                <div key={promo.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-grafite font-body">{promo.nome}</h3>
                      <p className="text-xs text-grafite-muted font-body mt-0.5">{promo.descricao}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${promo.ativa ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {promo.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-grafite-muted font-body">
                      <span className="flex items-center gap-1">
                        <i className="ri-percent-line" />
                        {promo.desconto}% off
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-store-2-line" />
                        {promo.unidade}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-grafite-muted hover:text-terra hover:bg-terra/10 transition-colors">
                        <i className="ri-edit-line" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-grafite-muted hover:text-red-600 hover:bg-red-50 transition-colors">
                        <i className="ri-delete-bin-line" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-grafite font-display mt-8 mb-4">Controle de Estoque</h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Produto</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Unidade</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Estoque</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.slice(0, 8).map((product, idx) => {
                      const stock = [45, 12, 78, 5, 32, 67, 89, 3][idx];
                      const status = stock < 10 ? 'Crítico' : stock < 25 ? 'Baixo' : 'OK';
                      const statusClass = stock < 10 ? 'bg-red-100 text-red-600' : stock < 25 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';
                      const unitName = units.find((u) => u.id === product.unitId)?.cidade || '';
                      return (
                        <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs text-grafite font-body">{product.nome}</td>
                          <td className="px-4 py-3 text-xs text-grafite-muted font-body">{unitName}</td>
                          <td className="px-4 py-3 text-xs text-grafite font-body">{stock} un</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusClass}`}>{status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-xs text-terra hover:text-terra-dark font-body">Editar</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* RELATORIOS TAB */}
        {activeTab === 'relatorios' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-grafite font-display">Relatórios e Analytics</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-md border border-gray-200 text-xs text-grafite-muted font-body hover:bg-gray-50 whitespace-nowrap">
                  Hoje
                </button>
                <button className="px-3 py-1.5 rounded-md bg-terra text-white text-xs font-medium whitespace-nowrap">
                  Semana
                </button>
                <button className="px-3 py-1.5 rounded-md border border-gray-200 text-xs text-grafite-muted font-body hover:bg-gray-50 whitespace-nowrap">
                  Mês
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Vendas por dia da semana</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendasSemana}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
                      />
                      <Bar dataKey="vendas" fill="#C75B3A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-grafite font-body mb-4">Pedidos por dia</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vendasSemana}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
                        formatter={(value: number) => [`${value} pedidos`, 'Total']}
                      />
                      <Line type="monotone" dataKey="pedidos" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 4, fill: '#2D6A4F' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-grafite font-body mb-4">Resumo do período</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-creme">
                  <p className="text-xs text-grafite-muted font-body">Receita bruta</p>
                  <p className="text-lg font-bold text-grafite font-display">R$ 15.290,00</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-creme">
                  <p className="text-xs text-grafite-muted font-body">Descontos fidelidade</p>
                  <p className="text-lg font-bold text-terra font-display">R$ 1.245,00</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-creme">
                  <p className="text-xs text-grafite-muted font-body">Receita líquida</p>
                  <p className="text-lg font-bold text-grafite font-display">R$ 14.045,00</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-creme">
                  <p className="text-xs text-grafite-muted font-body">Ticket médio</p>
                  <p className="text-lg font-bold text-grafite font-display">R$ 28,50</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLIENTES TAB */}
        {activeTab === 'clientes' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-grafite-muted font-body">Total clientes</p>
                <p className="text-xl font-bold text-grafite font-display">{clientesMock.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-grafite-muted font-body">Bronze</p>
                <p className="text-xl font-bold text-amber-600 font-display">{clientesMock.filter((c) => c.nivel === 'Bronze').length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-grafite-muted font-body">Prata + Ouro</p>
                <p className="text-xl font-bold text-yellow-600 font-display">{clientesMock.filter((c) => c.nivel === 'Prata' || c.nivel === 'Ouro').length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-grafite-muted font-body">Diamante</p>
                <p className="text-xl font-bold text-amber-600 font-display">{clientesMock.filter((c) => c.nivel === 'Diamante').length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Cliente</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">E-mail</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Unidade</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Pedidos</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Pontos</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-grafite-muted font-body">Nível</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesMock.map((c) => (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs text-grafite font-body font-medium">{c.nome}</td>
                        <td className="px-4 py-3 text-xs text-grafite-muted font-body">{c.email}</td>
                        <td className="px-4 py-3 text-xs text-grafite-muted font-body">{c.cidade}</td>
                        <td className="px-4 py-3 text-xs text-grafite font-body">{c.pedidos}</td>
                        <td className="px-4 py-3 text-xs text-terra font-body font-semibold">{c.pontos}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${nivelColors[c.nivel] || 'bg-gray-100 text-gray-500'}`}>
                            {c.nivel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
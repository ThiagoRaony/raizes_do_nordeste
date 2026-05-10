import { useState, useEffect, useCallback } from 'react';

export interface OrderItem {
  productId: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
  observacao?: string;
}

export interface Order {
  id: string;
  userId: string;
  unitId: string;
  unitName: string;
  items: OrderItem[];
  total: number;
  descontoFidelidade: number;
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'cancelado' | 'falha';
  formaPagamento: 'pix' | 'cartao' | 'dinheiro';
  avaliacao?: number;
  comentarioAvaliacao?: string;
  createdAt: string;
}

const STORAGE_KEY = 'raizes_orders';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback(
    (data: Omit<Order, 'id' | 'createdAt'>): Order => {
      const order: Order = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const updateOrder = useCallback((id: string, data: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...data } : o))
    );
  }, []);

  const repeatOrder = useCallback(
    (orderId: string, userIdParam: string, unitIdParam: string, unitNameParam: string): Order | null => {
      const original = orders.find((o) => o.id === orderId);
      if (!original) return null;
      const newOrder: Order = {
        ...original,
        id: crypto.randomUUID(),
        userId: userIdParam,
        unitId: unitIdParam,
        unitName: unitNameParam,
        status: 'pendente',
        avaliacao: undefined,
        comentarioAvaliacao: undefined,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    [orders]
  );

  const getUserOrders = useCallback(
    (uid: string): Order[] => {
      return orders.filter((o) => o.userId === uid).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    [orders]
  );

  const getAllOrders = useCallback((): Order[] => {
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders]);

  return { orders, createOrder, updateOrder, repeatOrder, getUserOrders, getAllOrders };
}
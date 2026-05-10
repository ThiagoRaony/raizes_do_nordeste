export interface Category {
  id: string;
  nome: string;
  icone: string;
}

export const categories: Category[] = [
  { id: 'cafe', nome: 'Café da Manhã', icone: 'ri-cup-line' },
  { id: 'salgados', nome: 'Salgados', icone: 'ri-bread-line' },
  { id: 'doces', nome: 'Doces', icone: 'ri-cake-3-line' },
  { id: 'bebidas', nome: 'Bebidas', icone: 'ri-goblet-line' },
  { id: 'sazonalidade', nome: 'Sazonalidade', icone: 'ri-fire-line' },
];
/* Dados de exemplo para desenvolvimento */
window.MOCK_DATA = {
  menu: [
    {
      id: 1,
      name: "Carne de Sol com Macaxeira",
      desc: "Carne de sol desfiada, servida com macaxeira cozida e manteiga de garrafa.",
      price: 35.00,
      img: "https://images.unsplash.com/photo-1543352634-8f4b1d0a1b3d?w=800&q=60"
    },
    {
      id: 2,
      name: "Baião de Dois",
      desc: "Feijão de corda com arroz, carne seca e queijo coalho.",
      price: 28.50,
      img: "https://images.unsplash.com/photo-1604908177522-5f0b2e5b1d2a?w=800&q=60"
    },
    {
      id: 3,
      name: "Moqueca de Peixe",
      desc: "Peixe cozido no leite de coco com dendê e pimentões.",
      price: 42.00,
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=60"
    },
    {
      id: 4,
      name: "Cuscuz Nordestino",
      desc: "Cuscuz macio servido com manteiga e carne de sol desfiada opcional.",
      price: 18.00,
      img: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=800&q=60"
    }
  ]
  ,
  produtosPorUnidade: {
    Recife: [
      { id: 1, nome: "Tapioca Nordestina", preco: 18, categoria: "Tapiocas", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=60" },
      { id: 2, nome: "Cuscuz Completo", preco: 22, categoria: "Café da Manhã", img: "https://images.unsplash.com/photo-1582719478173-1b1b2d3a8b6d?w=800&q=60" }
    ],
    Fortaleza: [
      { id: 3, nome: "Bolo de Macaxeira", preco: 15, categoria: "Sazonais", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=60" },
      { id: 4, nome: "Café Regional", preco: 10, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=60" }
    ],
    Salvador: [
      { id: 5, nome: "Tapioca Baiana", preco: 20, categoria: "Tapiocas", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=60" },
      { id: 6, nome: "Suco de Umbu", preco: 12, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1505576391880-4f3d6b4f2f6b?w=800&q=60" }
    ]
  }
};

// Compatibilidade: expõe `produtos` no formato esperado por alguns templates
window.produtos = {};
if(window.MOCK_DATA && window.MOCK_DATA.produtosPorUnidade){
  Object.keys(window.MOCK_DATA.produtosPorUnidade).forEach(k=>{
    window.produtos[k] = window.MOCK_DATA.produtosPorUnidade[k].map(p=>({
      id: p.id,
      nome: p.nome || p.name,
      preco: p.preco || p.price,
      categoria: p.categoria || p.desc,
      img: p.img
    }));
  });
}


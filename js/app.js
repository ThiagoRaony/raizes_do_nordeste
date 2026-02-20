// Arquivo JavaScript principal
(function(){
	console.log('Raízes do Nordeste - app.js carregado');

	function getData(){
		if(window.MOCK_DATA && Array.isArray(window.MOCK_DATA.menu)){
			return Promise.resolve(window.MOCK_DATA);
		}
		return fetch('data/data.json').then(r=>r.json()).catch(()=> (window.MOCK_DATA || {menu:[]}));
	}

	function renderCardapio(menu){
		const main = document.querySelector('main');
		if(!main) return;
		const grid = document.createElement('div'); grid.className='cardapio';
		menu.forEach(item=>{
			const div = document.createElement('div'); div.className='item';
			div.innerHTML = `
				<img src="${item.img||'https://via.placeholder.com/400x300'}" alt="${item.name}">
				<h3>${item.name}</h3>
				<p>${item.desc||''}</p>
				<strong>R$ ${Number(item.price||0).toFixed(2)}</strong>
				<div style="margin-top:.5rem"><button class="btn add">Adicionar</button></div>
			`;
			grid.appendChild(div);
		});
		main.innerHTML=''; main.appendChild(grid);
		document.querySelectorAll('.add').forEach((btn,i)=>btn.addEventListener('click',()=> addToCart(menu[i])));
	}

	window.cart = window.cart || [];
	function addToCart(item){
		window.cart.push(item);
		updateCartBadge();
		try{ alert(item.name + ' adicionado ao carrinho'); }catch(e){}
	}

	function updateCartBadge(){
		let el = document.querySelector('.cart');
		if(!el){ el = document.createElement('a'); el.href='carrinho.html'; el.className='cart'; document.body.appendChild(el); }
		el.textContent = `Carrinho (${window.cart.length})`;
	}

	const isCardapio = location.pathname.endsWith('cardapio.html') || document.querySelector('.cardapio') !== null;
	if(isCardapio) getData().then(d=> renderCardapio(d.menu || []));
	updateCartBadge();

	// Função exposta para a página de seleção de unidade
	window.selecionarUnidade = function(unidade){
		try{
			localStorage.setItem('unidadeSelecionada', unidade);
		}catch(e){
			console.warn('Não foi possível salvar a unidade no localStorage', e);
		}
		window.location.href = 'login.html';
	};

	})();

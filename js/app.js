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
		// Suporta duas estruturas: página com <main> ou página com #listaProdutos
		const main = document.querySelector('main');
		const lista = document.getElementById('listaProdutos');
		const tituloEl = document.getElementById('tituloUnidade');
		if(tituloEl){
			const unidade = localStorage.getItem('unidadeSelecionada') || 'Cardápio Geral';
			tituloEl.textContent = unidade;
		}
		if(lista){
			lista.innerHTML = '';
			menu.forEach((item,i)=>{
				const col = document.createElement('div'); col.className = 'col-md-4 mb-3';
				col.innerHTML = `
					<div class="card item h-100">
						<img src="${item.img||'https://via.placeholder.com/400x300'}" class="card-img-top" style="height:180px;object-fit:cover" alt="${item.name}">
						<div class="card-body d-flex flex-column">
							<h5 class="card-title">${item.name}</h5>
							<p class="card-text text-muted small">${item.desc||''}</p>
							<div class="mt-auto d-flex justify-content-between align-items-center">
								<strong>R$ ${Number(item.price||0).toFixed(2)}</strong>
								<button class="btn btn-sm btn-raiz add">Adicionar</button>
							</div>
						</div>
					</div>
				`;
				lista.appendChild(col);
			});
			document.querySelectorAll('#listaProdutos .add').forEach((btn,i)=>btn.addEventListener('click',()=> addToCart(menu[i])));
			return;
		}
		// fallback: render dentro do <main> usando grid simples
		if(main){
			const grid = document.createElement('div'); grid.className='cardapio';
			menu.forEach(item=>{
				const div = document.createElement('div'); div.className='item';
				div.innerHTML = `
					<img src="${item.img||'https://via.placeholder.com/400x300'}" alt="${item.name}">
					<h3>${item.name}</h3>
					<p>${item.desc||''}</p>
					<strong>R$ ${Number(item.price||0).toFixed(2)}</strong>
					<div style=\"margin-top:.5rem\"><button class=\"btn add\">Adicionar</button></div>
				`;
				grid.appendChild(div);
			});
			main.innerHTML=''; main.appendChild(grid);
			document.querySelectorAll('.add').forEach((btn,i)=>btn.addEventListener('click',()=> addToCart(menu[i])));
		}
	}

	window.cart = window.cart || [];
	function addToCart(item){
		window.cart.push(item);
		updateCartBadge();
		try{ alert(item.name + ' adicionado ao carrinho'); }catch(e){}
	}

	// Compatibilidade: função que adiciona ao carrinho usando localStorage
	window.adicionarCarrinho = function(id, nome, preco){
		let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
		carrinho.push({ id, nome, preco });
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
		// sincroniza réplica em memória e atualiza badge
		try{ addToCart({ id: id, name: nome, price: preco }); }catch(e){}
		try{ alert('Produto adicionado ao carrinho!'); }catch(e){}
	};

	function updateCartBadge(){
		let el = document.querySelector('.cart');
		if(!el){ el = document.createElement('a'); el.href='carrinho.html'; el.className='cart'; document.body.appendChild(el); }
		const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];
		const count = (Array.isArray(carrinhoLocal) && carrinhoLocal.length) || (window.cart && window.cart.length) || 0;
		el.textContent = `Carrinho (${count})`;
	}

	const isCardapio = location.pathname.endsWith('cardapio.html') || document.querySelector('.cardapio') !== null;
	if(isCardapio) getData().then(d=>{
		const unidade = localStorage.getItem('unidadeSelecionada');
		let menuToRender = [];
		if(unidade && d.produtosPorUnidade && d.produtosPorUnidade[unidade]){
			menuToRender = d.produtosPorUnidade[unidade].map(p=>({
				id: p.id,
				name: p.nome,
				desc: p.categoria || '',
				price: p.preco,
				img: p.img
			}));
		}else{
			menuToRender = d.menu || [];
		}
		renderCardapio(menuToRender);
	});
	updateCartBadge();


	// Validação e mensagens inline utilitários
	function validateEmail(email){
		return /\S+@\S+\.\S+/.test(email);
	}

	function clearErrors(form){
		if(!form) return;
		form.querySelectorAll('.is-invalid').forEach(el=>el.classList.remove('is-invalid'));
		form.querySelectorAll('.invalid-feedback').forEach(el=>el.remove());
	}

	function showError(input, message){
		if(!input) return;
		input.classList.add('is-invalid');
		const fb = document.createElement('div');
		fb.className = 'invalid-feedback';
		fb.textContent = message;
		// checkbox sits inside .form-check; append after parent when needed
		if(input.type === 'checkbox' && input.parentNode){
			input.parentNode.appendChild(fb);
		}else if(input.parentNode){
			input.parentNode.appendChild(fb);
		}else{
			input.appendChild(fb);
		}
	}

	const alerta = document.getElementById('alerta');

	// Cadastro com validação
	const formCadastro = document.getElementById('formCadastro');
	if(formCadastro){
		formCadastro.addEventListener('submit', function(e){
			e.preventDefault();
			clearErrors(formCadastro);

			const nomeIn = document.getElementById('nomeCadastro');
			const emailIn = document.getElementById('emailCadastro');
			const senhaIn = document.getElementById('senhaCadastro');
			const lgpdIn = document.getElementById('lgpdCheck');

			const nome = nomeIn.value.trim();
			const email = emailIn.value.trim();
			const senha = senhaIn.value;

			let valid = true;
			if(!nome){ showError(nomeIn, 'Informe seu nome.'); valid = false; }
			if(!validateEmail(email)){ showError(emailIn, 'Informe um email válido.'); valid = false; }
			if(senha.length < 6){ showError(senhaIn, 'A senha deve ter ao menos 6 caracteres.'); valid = false; }
			if(!lgpdIn.checked){ showError(lgpdIn, 'É necessário aceitar a Política de Privacidade (LGPD).'); valid = false; }

			if(!valid) return;

			const usuario = { nome, email, senha, pontos: 0 };
			localStorage.setItem('usuario', JSON.stringify(usuario));

			if(alerta) alerta.innerHTML = `<div class="alert alert-success">Cadastro realizado com sucesso! Faça login.</div>`;
			formCadastro.reset();
		});
	}

	// Login com validação
	const formLogin = document.getElementById('formLogin');
	if(formLogin){
		formLogin.addEventListener('submit', function(e){
			e.preventDefault();
			clearErrors(formLogin);

			const emailIn = document.getElementById('emailLogin');
			const senhaIn = document.getElementById('senhaLogin');
			const email = emailIn.value.trim();
			const senha = senhaIn.value;

			let valid = true;
			if(!validateEmail(email)){ showError(emailIn, 'Informe um email válido.'); valid = false; }
			if(!senha){ showError(senhaIn, 'Informe a senha.'); valid = false; }
			if(!valid) return;

			const usuario = JSON.parse(localStorage.getItem('usuario'));
			if(usuario && usuario.email === email && usuario.senha === senha){
				localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
				window.location.href = 'cardapio.html';
			}else{
				if(alerta) alerta.innerHTML = `<div class="alert alert-danger">Email ou senha inválidos</div>`;
				showError(emailIn, 'Credenciais inválidas.');
				showError(senhaIn, 'Credenciais inválidas.');
			}
		});
	}

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

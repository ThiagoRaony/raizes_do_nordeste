// Arquivo JavaScript principal
(function(){
	console.log('Raízes do Nordeste - app.js carregado');

	// Garantir que o carrinho é sempre lido do localStorage
	window.carrinhoLocal = function(){
		try{
			return JSON.parse(localStorage.getItem('carrinho')) || [];
		}catch(e){
			return [];
		}
	};



	window.cart = window.cart || [];
	function addToCart(item){
		window.cart.push(item);
		updateCartBadge();
		if(item && item.name) showToast(item.name + ' adicionado ao carrinho', 'success');
	}

	// Compatibilidade: função que adiciona ao carrinho usando localStorage
	window.adicionarCarrinho = function(id, nome, preco){
		let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
		carrinho.push({ id, nome, preco });
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
		// sincroniza réplica em memória e atualiza badge
		try{ addToCart({ id: id, name: nome, price: preco }); }catch(e){}
		showToast('Produto adicionado ao carrinho!', 'success');
	};

	// Toast utilitário (inline, sem dependência de JS do Bootstrap)
	function showToast(message, type){
		const containerClass = 'toast-container-app';
		let container = document.querySelector('.' + containerClass);
		if(!container){
			container = document.createElement('div');
			container.className = containerClass;
			document.body.appendChild(container);
		}
		const toast = document.createElement('div');
		toast.className = 'app-toast ' + (type || 'info');
		toast.textContent = message;
		container.appendChild(toast);
		setTimeout(()=>{ toast.classList.add('hide'); }, 2200);
		setTimeout(()=>{ try{ container.removeChild(toast); }catch(e){} }, 2600);
	}

	function updateCartBadge(){
		try{
			const els = document.querySelectorAll('.cart, [data-cart-badge]');
			const carrinhoLocal = window.carrinhoLocal();
			const count = carrinhoLocal.length;
			els.forEach(el => el.textContent = `Carrinho (${count})`);
		}catch(e){
			console.warn('Erro ao atualizar badge do carrinho', e);
		}
	}




	// Validação e mensagens inline utilitários
	function validateEmail(email){
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
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
		fb.style.display = 'block';
		// checkbox sits inside .form-check; append after parent when needed
		if(input.type === 'checkbox' && input.parentNode){
			input.parentNode.appendChild(fb);
		}else if(input.parentNode){
			input.parentNode.appendChild(fb);
		}else{
			input.appendChild(fb);
		}
	}


	// Cadastro com validação
	const formCadastro = document.getElementById('formCadastro');
	if(formCadastro){
		formCadastro.addEventListener('submit', function(e){
			e.preventDefault();
			try{
				clearErrors(formCadastro);

				const nomeIn = document.getElementById('nomeCadastro');
				const emailIn = document.getElementById('emailCadastro');
				const senhaIn = document.getElementById('senhaCadastro');
				const lgpdIn = document.getElementById('lgpdCheck');

				if(!nomeIn || !emailIn || !senhaIn || !lgpdIn){
					console.warn('Elementos do formulário de cadastro não encontrados');
					return;
				}

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

				const alerta = document.getElementById('alerta');
				if(alerta) alerta.innerHTML = `<div class="alert alert-success">Cadastro realizado com sucesso! Faça login.</div>`;
				formCadastro.reset();
				showToast('Cadastro realizado!', 'success');
			}catch(err){
				console.error('Erro ao processar cadastro:', err);
				showToast('Erro ao realizar cadastro', 'danger');
			}
		});
	}

	// Login com validação
	const formLogin = document.getElementById('formLogin');
	if(formLogin){
		formLogin.addEventListener('submit', function(e){
			e.preventDefault();
			try{
				clearErrors(formLogin);

				const emailIn = document.getElementById('emailLogin');
				const senhaIn = document.getElementById('senhaLogin');

				if(!emailIn || !senhaIn){
					console.warn('Elementos do formulário de login não encontrados');
					return;
				}

				const email = emailIn.value.trim();
				const senha = senhaIn.value;

				let valid = true;
				if(!validateEmail(email)){ showError(emailIn, 'Informe um email válido.'); valid = false; }
				if(!senha){ showError(senhaIn, 'Informe a senha.'); valid = false; }
				if(!valid) return;

				const usuarioJson = localStorage.getItem('usuario');
				const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

				if(usuario && usuario.email === email && usuario.senha === senha){
					localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
					window.location.href = 'cardapio.html';
				}else{
					const alerta = document.getElementById('alerta');
					if(alerta) alerta.innerHTML = `<div class="alert alert-danger">Email ou senha inválidos</div>`;
					showError(emailIn, 'Credenciais inválidas.');
					showError(senhaIn, 'Credenciais inválidas.');
				}
			}catch(err){
				console.error('Erro ao processar login:', err);
				showToast('Erro ao fazer login', 'danger');
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

	// Renderização do cardápio ao carregamento completo do DOM
	document.addEventListener("DOMContentLoaded", function () {

		const listaProdutos = document.getElementById("listaProdutos");
		const tituloUnidade = document.getElementById("tituloUnidade");

		if (listaProdutos && tituloUnidade && window.produtos) {
			const unidade = localStorage.getItem("unidadeSelecionada");

			if (unidade) {
				tituloUnidade.innerText = "Unidade: " + unidade;
			}

			const produtosUnidade = window.produtos[unidade] || [];

			if (produtosUnidade.length === 0) {
				listaProdutos.innerHTML = '<p class="text-muted">Nenhum produto disponível para esta unidade.</p>';
				return;
			}

			produtosUnidade.forEach(produto => {
				if(!produto || !produto.id || !produto.nome) return;
				const card = `
					<div class="col-md-4 mb-3">
						<div class="card p-3 shadow-sm">
							<h5>${produto.nome}</h5>
							<p>R$ ${Number(produto.preco || 0).toFixed(2)}</p>
							<button class="btn btn-raiz"
								onclick="adicionarCarrinho(${produto.id}, '${produto.nome.replace(/'/g, "\\'")}', ${produto.preco || 0})">
								Adicionar
							</button>
						</div>
					</div>
				`;

				listaProdutos.innerHTML += card;
			});
		} else if (!listaProdutos && !tituloUnidade) {
			// Se não existem elementos do cardápio, não fazer nada
			return;
		} else {
			console.warn('Elementos do cardápio não encontrados ou dados incompletos');
		}

	});

	// Inicializar badge do carrinho
	document.addEventListener('DOMContentLoaded', function(){
		updateCartBadge();
	});
	// Fallback: chamar imediatamente se scripts for inline
	if(document.readyState === 'loading'){
		// Documento ainda está carregando
	} else {
		// Documento já carregou
		updateCartBadge();
	}

	})();

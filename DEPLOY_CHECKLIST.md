# ✅ CHECKLIST - GitHub Pages Deploy

## 🔍 VERIFICAÇÃO PRÉ-DEPLOY

- [x] `index.html` - Path do script corrigido (./src/main.tsx)
- [x] `vite.config.ts` - Base path dinâmico e rollupOptions adicionados
- [x] `src/App.tsx` - HashRouter com basename configurado
- [x] `.nojekyll` - Arquivo criado
- [x] `package.json` - Scripts de deploy adicionados
- [x] `package.json` - Homepage declarado
- [x] Dependências - gh-pages e cross-env instalados
- [x] Build - Testado e funcionando
- [x] Preview - Testado em http://localhost:4173/raizes_do_nordeste/

---

## 🚀 INSTRUÇÕES DE DEPLOY

### ✅ Passo 1: Fazer o Deploy
```bash
npm run deploy
```
**Tempo estimado:** 2-5 minutos

**Isso faz:**
1. Instala dependências (se necessário)
2. Faz build de produção com `NODE_ENV=production`
3. Envia a pasta `dist/` para branch `gh-pages`
4. GitHub Pages publica automaticamente

### ⏳ Passo 2: Aguardar Publicação
- Aguarde 1-2 minutos após o deploy
- GitHub Pages precisa de tempo para processar

### 🔍 Passo 3: Verificar Site
Acesse: https://thiagoraony.github.io/raizes_do_nordeste/

**Abra DevTools (F12) e verifique:**

```
✅ Console sem erros
✅ Network tab mostra arquivos carregados com sucesso
✅ Página não está em branco
✅ Links funcionam (clique em /#/cardapio, /#/admin, etc)
✅ Estilos aplicados (CSS carregou)
```

---

## 🆘 TROUBLESHOOTING

### ❌ Problema: "comando npm não encontrado"
**Solução:** Instale Node.js de https://nodejs.org/

---

### ❌ Problema: "Página em branco após deploy"
**Solução:**
```bash
# Limpar cache local
rm -rf node_modules dist
npm install
npm run build:prod
npm run deploy
```

---

### ❌ Problema: "Erro ao fazer deploy"
**Solução:**
1. Verifique internet está conectada
2. Verifique que o repositório é público
3. Verifique que GitHub Pages está habilitado em Settings > Pages
4. Tente novamente

---

### ❌ Problema: "Console mostra erro de 404"
**Solução:**
1. Aguarde 2 minutos e recarregue a página
2. Limpe cache do navegador (Ctrl+Shift+Delete)
3. Tente em uma aba anônima

---

## 📋 CONFIGURAÇÕES FINAIS NO GITHUB

Após o primeiro deploy, verifique:

1. **Repository Settings > Pages**
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Repository Settings > General**
   - Visibility: Public
   - Não há restrições

---

## 📊 RESULTADO ESPERADO

Após deploy bem-sucedido:

| Componente | Status |
|-----------|--------|
| Homepage | ✅ Carrega com logo e menu |
| CSS/Estilos | ✅ Aplicados corretamente |
| Links | ✅ Hash-based routing funciona |
| Console | ✅ Sem erros 404 |
| Performance | ✅ Rápido carregamento |

---

## 🎯 PRÓXIMAS VEZES

Para fazer atualizações no futuro:

```bash
# 1. Fazer mudanças no código
# 2. Testar localmente
npm run dev

# 3. Fazer deploy
npm run deploy

# Pronto! Mudanças estarão no ar em 1-2 minutos
```

---

## 📚 RECURSOS

- 📄 [RESUMO_CORRECOES.md](RESUMO_CORRECOES.md) - Detalhes de todas as correções
- 📄 [GITHUB_PAGES_FIX.md](GITHUB_PAGES_FIX.md) - Explicação técnica
- 🔗 [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Status:** ✅ PRONTO PARA DEPLOY


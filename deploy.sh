#!/bin/bash
# Deploy para GitHub Pages - Raízes do Nordeste
# Execute este script ou rode os comandos manualmente

echo "🚀 Iniciando Deploy para GitHub Pages..."
echo ""

echo "📦 1/3 - Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
  echo "❌ Erro ao instalar dependências"
  exit 1
fi
echo "✅ Dependências instaladas"
echo ""

echo "🔨 2/3 - Fazendo build de produção..."
npm run build:prod
if [ $? -ne 0 ]; then
  echo "❌ Erro no build de produção"
  exit 1
fi
echo "✅ Build de produção concluído"
echo ""

echo "🌐 3/3 - Enviando para GitHub Pages..."
npm run deploy
if [ $? -ne 0 ]; then
  echo "❌ Erro ao fazer deploy"
  exit 1
fi
echo "✅ Deploy concluído!"
echo ""

echo "🎉 Site publicado em: https://thiagoraony.github.io/raizes_do_nordeste/"
echo "⏳ Aguarde 1-2 minutos para a página carregar"
echo "🔍 Para verificar: abra o link acima e pressione F12 para verificar o console"

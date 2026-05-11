export interface Unit {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
  telefone: string;
  horario: string;
  imagem: string;
  descricao: string;
  cozinha: 'completa' | 'reduzida';
  regiaoCulinaria: string;
  destaqueSazonal: string[];
}

export const units: Unit[] = [
  {
    id: 'recife',
    nome: 'Raízes do Nordeste - Matriz',
    cidade: 'Recife',
    estado: 'Pernambuco',
    endereco: 'Rua da Aurora, 345 - Boa Vista, Recife - PE',
    telefone: '(81) 3456-7890',
    horario: '06:00 - 22:00',
    imagem: 'https://readdy.ai/api/search-image?query=A%20warm%20and%20inviting%20storefront%20facade%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20rustic%20wooden%20elements%2C%20clay%20roof%20tiles%2C%20green%20palm%20decorations%2C%20warm%20golden%20lighting%2C%20located%20in%20a%20historic%20street%20of%20Recife%20Pernambuco%2C%20cozy%20atmosphere%20with%20colorful%20traditional%20northeastern%20decorative%20flags%2C%20warm%20earth%20tones%20terracotta%20and%20cream%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background%2C%20no%20cars&width=600&height=400&seq=unit-recife&orientation=landscape',
    descricao: 'Nossa unidade matriz, onde tudo começou. Culinária pernambucana autêntica com pratos como bolo de rolo, caldinho de feijão tropeiro e cartola.',
    cozinha: 'completa',
    regiaoCulinaria: 'Pernambucana',
    destaqueSazonal: ['Bolo Souza Leão', 'Cartola Especial', 'Cuscuz com Charque no São João'],
  },
  {
    id: 'salvador',
    nome: 'Raízes do Nordeste - Pelourinho',
    cidade: 'Salvador',
    estado: 'Bahia',
    endereco: 'Rua das Laranjeiras, 112 - Pelourinho, Salvador - BA',
    telefone: '(71) 9876-5432',
    horario: '05:30 - 23:00',
    imagem: 'https://readdy.ai/api/search-image?query=A%20vibrant%20colorful%20storefront%20facade%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20colonial%20architecture%20elements%2C%20yellow%20and%20blue%20painted%20walls%2C%20traditional%20bahian%20decorations%2C%20warm%20evening%20lighting%2C%20located%20in%20Salvador%20Bahia%20historic%20center%2C%20palm%20trees%2C%20warm%20earth%20tones%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background&width=600&height=400&seq=unit-salvador&orientation=landscape',
    descricao: 'Culinária baiana em sua essência. Acarajé, vatapá, caruru e moqueca de camarão com o tempero único da Bahia.',
    cozinha: 'completa',
    regiaoCulinaria: 'Baiana',
    destaqueSazonal: ['Acarajé de Iansã', 'Vatapá Festivo', 'Caruru de São João'],
  },
  {
    id: 'fortaleza',
    nome: 'Raízes do Nordeste - Beira Mar',
    cidade: 'Fortaleza',
    estado: 'Ceará',
    endereco: 'Av. Beira Mar, 2100 - Meireles, Fortaleza - CE',
    telefone: '(85) 3344-5566',
    horario: '06:00 - 22:30',
    imagem: 'https://readdy.ai/api/search-image?query=A%20charming%20beachfront%20storefront%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20rustic%20wooden%20deck%2C%20blue%20ocean%20view%20background%2C%20palm%20leaf%20roof%2C%20tropical%20decorations%2C%20warm%20sunset%20lighting%2C%20located%20in%20Fortaleza%20Ceara%20beach%20promenade%2C%20warm%20earth%20tones%20cream%20and%20terracotta%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background&width=600&height=400&seq=unit-fortaleza&orientation=landscape',
    descricao: 'Sabores cearenses à beira-mar. Baião de dois, rapadura com queijo coalho, tapioca de vários sabores e cajuína gelada.',
    cozinha: 'completa',
    regiaoCulinaria: 'Cearense',
    destaqueSazonal: ['Baião de Dois Festivo', 'Rapadura com Queijo São João', 'Tapioca de Caju no São João'],
  },
  {
    id: 'saoluis',
    nome: 'Raízes do Nordeste - Centro Histórico',
    cidade: 'São Luís',
    estado: 'Maranhão',
    endereco: 'Rua Grande, 78 - Centro Histórico, São Luís - MA',
    telefone: '(98) 3210-9876',
    horario: '06:30 - 21:30',
    imagem: 'https://readdy.ai/api/search-image?query=A%20picturesque%20colonial%20storefront%20facade%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20azulejo%20tiles%20decorations%2C%20iron%20balconies%2C%20warm%20lantern%20lighting%2C%20located%20in%20Sao%20Luis%20Maranhao%20historic%20center%2C%20traditional%20maranhense%20decorations%2C%20warm%20earth%20tones%20terracotta%20and%20blue%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background&width=600&height=400&seq=unit-saoluis&orientation=landscape',
    descricao: 'Culinaria maranhense com arroz de cuxa, peixe frito com farofa de dende, torta de camarao e o inigualavel jucara.',
    cozinha: 'reduzida',
    regiaoCulinaria: 'Maranhense',
    destaqueSazonal: ['Arroz de Cuxá Festivo', 'Torta de Camarão de São João', 'Juçara Especial'],
  },
  {
    id: 'natal',
    nome: 'Raízes do Nordeste - Ponta Negra',
    cidade: 'Natal',
    estado: 'Rio Grande do Norte',
    endereco: 'Av. Engenheiro Roberto Freire, 1500 - Ponta Negra, Natal - RN',
    telefone: '(84) 4002-8922',
    horario: '05:30 - 22:00',
    imagem: 'https://readdy.ai/api/search-image?query=A%20cozy%20tropical%20storefront%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20thatched%20roof%2C%20wooden%20signage%2C%20tropical%20plants%2C%20warm%20evening%20lighting%2C%20located%20in%20Natal%20Rio%20Grande%20do%20Norte%20near%20sand%20dunes%2C%20warm%20earth%20tones%20cream%20and%20green%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background&width=600&height=400&seq=unit-natal&orientation=landscape',
    descricao: 'Sabores potiguares com tapioca dobrada, macaxeira frita, camarão no alho e óleo, e o refrescante suco de cajá.',
    cozinha: 'reduzida',
    regiaoCulinaria: 'Potiguar',
    destaqueSazonal: ['Tapioca Dobrada de São João', 'Macaxeira Frita Especial', 'Camarão no Alho e Óleo Festivo'],
  },
  {
    id: 'maceio',
    nome: 'Raízes do Nordeste - Pajuçara',
    cidade: 'Maceió',
    estado: 'Alagoas',
    endereco: 'Av. Dr. Antônio Gouveia, 800 - Pajuçara, Maceió - AL',
    telefone: '(82) 3333-4444',
    horario: '06:00 - 22:00',
    imagem: 'https://readdy.ai/api/search-image?query=A%20beautiful%20coastal%20storefront%20of%20a%20traditional%20northeastern%20Brazilian%20snack%20bar%20called%20Raizes%20do%20Nordeste%20with%20white%20and%20turquoise%20painted%20walls%2C%20coconut%20decorations%2C%20warm%20tropical%20lighting%2C%20located%20in%20Maceio%20Alagoas%20near%20coconut%20palm%20beach%2C%20warm%20earth%20tones%20cream%20and%20green%2C%20high%20quality%20architectural%20photo%2C%20simple%20clean%20background&width=600&height=400&seq=unit-maceio&orientation=landscape',
    descricao: 'Culinária alagoana com sururu de praia, peixe ensopado, cuscuz com leite de coco e o delicioso suco de manga rosa.',
    cozinha: 'completa',
    regiaoCulinaria: 'Alagoana',
    destaqueSazonal: ['Sururu de Praia Festivo', 'Cuscuz com Leite de Coco de São João', 'Peixe Ensopado Especial'],
  },
];
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

export default function Historia() {
  return (
    <div className="min-h-screen bg-creme">
      <Navbar />

      <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=A%20warm%20and%20inviting%20traditional%20northeastern%20Brazilian%20family%20snack%20bar%20interior%20with%20rustic%20wooden%20tables%20clay%20roof%20tiles%20colorful%20traditional%20decorative%20flags%20warm%20golden%20lighting%20terracotta%20earth%20tones%20cream%20and%20green%20a%20family%20serving%20food%20behind%20the%20counter%20no%20people%20visible%20high%20quality%20photo%20clean%20simple%20background&width=1200&height=400&seq=historia-hero-2026&orientation=landscape"
          alt="Raízes do Nordeste - Nossa história"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white font-display">Conheça nossa história</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Hero image of Dona Francisca - 71 anos */}
        <div className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden mb-6 md:mb-8">
          <img
            src="https://readdy.ai/api/search-image?query=A%20heartwarming%20portrait%20of%20a%2071%20year%20old%20northeastern%20Brazilian%20woman%20with%20warm%20brown%20eyes%20silver%20grey%20hair%20in%20a%20neat%20bun%20wearing%20a%20handmade%20white%20apron%20embroidered%20with%20a%20small%20rustic%20leaf%20logo%20and%20the%20words%20Raizes%20do%20Nordeste%20in%20red%20thread%20standing%20in%20a%20traditional%20clay%20kitchen%20with%20wooden%20shelves%20terracotta%20walls%20and%20copper%20pots%20warm%20golden%20sunlight%20streaming%20through%20a%20small%20window%20she%20is%20stirring%20a%20large%20clay%20pot%20with%20a%20wooden%20spoon%20a%20gentle%20smile%20on%20her%20face%20soft%20natural%20light%20nostalgic%20atmosphere%20high%20quality%20portrait%20photography&width=800&height=500&seq=dona-francisca-71-2026&orientation=landscape"
            alt="Dona Francisca cozinhando"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
            <p className="text-white font-body text-sm md:text-base">Dona Francisca, fundadora da Raízes do Nordeste, aos 71 anos</p>
          </div>
        </div>

        {/* Logo watermark */}
        <div className="flex justify-center mb-6">
          <Logo className="h-8 w-auto opacity-60" />
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-5 md:p-8 space-y-5 text-sm text-grafite-muted leading-relaxed font-body">
          <p className="text-base text-grafite font-body leading-relaxed">
            O cheiro de cuscuz quente, café passado na hora e manteiga de garrafa ainda domina o
            pequeno salão da primeira unidade da Raízes do Nordeste, inaugurada há pouco mais de seis anos
            em um bairro tradicional de Recife. O que começou como um pequeno negócio familiar, comandado
            por Dona Francisca e seus dois filhos, hoje se transformou em uma rede de lanchonetes nordestinas
            em franca expansão, presente em diferentes capitais e cidades do interior do Brasil.
          </p>

          <p className="leading-relaxed">
            A proposta sempre foi clara: levar a culinária nordestina para o dia a dia urbano, com rapidez,
            qualidade e identidade cultural. Tapiocas, cuscuz recheado, bolo de macaxeira, sucos regionais e
            cafés da manhã completos conquistaram um público fiel, desde trabalhadores que passam antes do
            expediente até famílias nos fins de semana.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 py-3 md:py-4">
            <div className="text-center p-3 md:p-4 bg-creme rounded-lg">
              <p className="text-2xl font-bold text-terra font-display">6</p>
              <p className="text-xs text-grafite-muted font-body">unidades no Nordeste</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-creme rounded-lg">
              <p className="text-2xl font-bold text-terra font-display">6+</p>
              <p className="text-xs text-grafite-muted font-body">anos de história</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-creme rounded-lg">
              <p className="text-2xl font-bold text-terra font-display">200+</p>
              <p className="text-xs text-grafite-muted font-body">produtos regionais</p>
            </div>
          </div>

          <p className="leading-relaxed">
            Cada unidade da rede preserva a essência da marca, mas também celebra a culinária típica de sua região. Em Salvador, o acarajé e o vatapá reinam. Em Fortaleza, o baião de dois e a tapioca de caju são as estrelas. São Luís traz o arroz de cuxá e a torta de camarão. Natal destaca o camarão no alho e óleo e a tapioca dobrada. Maceió honra o sururu de praia e a manga rosa.
          </p>

          <p className="text-base text-grafite font-body leading-relaxed">
            Disposição, resiliência, dedicação e criatividade não são diferenciais por aqui — são requisitos. E é com essa postura que seguimos expandindo as Raízes do Nordeste, levando sabor, tradição e acolhimento para cada canto do Brasil.
          </p>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-center text-base md:text-lg font-display text-terra font-bold">
              Sejam bem-vindos à família Raízes do Nordeste
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
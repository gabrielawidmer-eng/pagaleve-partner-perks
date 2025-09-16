import { Crown, TrendingUp, Users, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import tiersData from "@/data/tiers.json";
const Tiers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ambassadorCompanies = tiersData.tiers[0].empresasDestaque;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.ceil(ambassadorCompanies.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, [ambassadorCompanies.length]);
  const tierIcons = {
    T1: Crown,
    T2: TrendingUp,
    T3: Users
  };
  return (
    <section id="tiers" className="py-20 relative bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full inline-block mb-4">
            NÍVEIS DE PARCERIA
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Escolha seu Tier
          </h2>
          <p className="text-lg text-muted-foreground">
            Quanto maior o tier, maiores os benefícios exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiersData.tiers.map((tier, index) => {
            const Icon = tierIcons[tier.nome as keyof typeof tierIcons];
            return (
              <div 
                key={tier.nome}
                className={`relative group ${index === 0 ? 'md:scale-105' : ''}`}
              >
                <div className={`p-8 rounded-2xl h-full transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-tier-1/20 to-tier-1/10 border-2 border-tier-1 shadow-xl' 
                    : index === 1
                    ? 'bg-gradient-to-br from-tier-2/20 to-tier-2/10 border border-tier-2/50 hover:border-tier-2 hover:shadow-lg'
                    : 'bg-gradient-to-br from-tier-3/20 to-tier-3/10 border border-tier-3/50 hover:border-tier-3 hover:shadow-lg'
                }`}>
                  {index === 0 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-tier-1 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        MAIS POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Icon className={`w-6 h-6 ${
                          index === 0 ? 'text-tier-1' : index === 1 ? 'text-tier-2' : 'text-tier-3'
                        }`} />
                        {tier.nome}
                      </h3>
                      <p className="text-muted-foreground mt-1">{tier.descricao}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-foreground">
                      {index === 0 ? "Até 100%" : index === 1 ? "Até 50%" : "Até 30%"}
                    </p>
                    <p className="text-sm text-muted-foreground">de desconto</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {tier.beneficios.slice(0, 4).map((beneficio, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ChevronRight className={`w-4 h-4 ${
                          index === 0 ? 'text-tier-1' : index === 1 ? 'text-tier-2' : 'text-tier-3'
                        }`} />
                        <span className="text-sm text-muted-foreground">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {ambassadorCompanies.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Empresas embaixadoras T1</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {ambassadorCompanies
                .slice(currentIndex * 4, (currentIndex + 1) * 4)
                .map((company, idx) => (
                  <div key={idx} className="text-foreground font-semibold opacity-60 hover:opacity-100 transition-opacity">
                    {company}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Tiers;
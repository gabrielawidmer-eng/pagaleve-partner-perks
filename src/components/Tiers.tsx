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
    <section id="tiers" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Escolha seu Tier
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quanto mais você utiliza a Pagaleve, mais benefícios exclusivos você desbloqueia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiersData.tiers.map((tier) => {
            const Icon = tierIcons[tier.id as keyof typeof tierIcons];
            const isPopular = tier.id === "T2";
            
            return (
              <div
                key={tier.id}
                className={`relative bg-card rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isPopular ? "ring-2 ring-primary shadow-2xl" : "hover:shadow-xl"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    tier.id === "T1" ? "from-amber-400 to-amber-600" :
                    tier.id === "T2" ? "from-purple-400 to-purple-600" :
                    "from-blue-400 to-blue-600"
                  } flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {tier.nome}
                  </h3>
                  
                  <div className="mb-6">
                    <p className="text-muted-foreground">{tier.descricao}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {tier.beneficios.map((beneficio, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Empresas participantes:</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.empresasDestaque.slice(0, 3).map((empresa, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {empresa}
                        </span>
                      ))}
                      {tier.empresasDestaque.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{tier.empresasDestaque.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Tiers;
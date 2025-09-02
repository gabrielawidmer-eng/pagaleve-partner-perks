import { Crown, TrendingUp, Users, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import tiersData from "@/data/tiers.json";

const Tiers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ambassadorCompanies = tiersData.tiers[0].empresasDestaque;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(ambassadorCompanies.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, [ambassadorCompanies.length]);

  const tierIcons = {
    T1: Crown,
    T2: TrendingUp,
    T3: Users,
  };

  return (
    <section id="tiers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Tiers de Elegibilidade
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra seu tier no dashboard Pagaleve e acesse benefícios exclusivos para seu nível
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {tiersData.tiers.map((tier) => {
              const Icon = tierIcons[tier.id as keyof typeof tierIcons];
              return (
                <div
                  key={tier.id}
                  className={`relative bg-gradient-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                    tier.id === "T1" ? "md:scale-105" : ""
                  }`}
                >
                  {/* Tier Badge */}
                  {tier.id === "T1" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-${tier.cor}/20 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-${tier.cor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                    {tier.nome}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {tier.descricao}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3">
                    {tier.beneficios.slice(0, 3).map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {beneficio}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Ambassador Companies Carousel */}
          <div className="bg-gradient-subtle rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                Empresas Embaixadoras
              </h3>
              <p className="text-muted-foreground">
                Nossos parceiros estratégicos que co-criam conosco
              </p>
            </div>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(ambassadorCompanies.length / 4) }).map((_, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {ambassadorCompanies
                        .slice(groupIndex * 4, (groupIndex + 1) * 4)
                        .map((company, index) => (
                          <div
                            key={index}
                            className="bg-card rounded-xl p-4 flex items-center justify-center h-20"
                          >
                            <span className="font-semibold text-foreground">
                              {company}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(ambassadorCompanies.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-6 py-3 rounded-full">
              <span className="text-secondary font-semibold">
                Seu tier aparece no seu dashboard Pagaleve
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Em dúvida? Fale com nosso time de suporte
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tiers;
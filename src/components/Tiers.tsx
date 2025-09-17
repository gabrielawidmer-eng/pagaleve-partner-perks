import { Crown, TrendingUp, Users, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import tiersData from "@/data/tiers.json";
const Tiers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ambassadorCompanies = tiersData.tiers[0]?.empresasDestaque || [];
  useEffect(() => {
    if (ambassadorCompanies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.ceil(ambassadorCompanies.length / 4));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [ambassadorCompanies.length]);
  const tierIcons = {
    "Embaixadores": Crown,
    "Alta Performance": TrendingUp,
    "Base Ativa": Users
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Nossos Tiers de Parceiros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as categorias de parceiros e suas empresas destaque
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiersData.tiers.map((tier) => {
            const Icon = tierIcons[tier.nome as keyof typeof tierIcons];
            return (
              <div
                key={tier.nome}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {tier.nome}
                  </h3>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground mb-6">{tier.descricao}</p>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Empresas Destaque:
                  </h4>
                  <div className="space-y-2">
                    {tier.empresasDestaque.slice(0, 3).map((empresa) => (
                      <div
                        key={empresa}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>{empresa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel de empresas embaixadoras */}
        <div className="mt-16">
          <h3 className="font-heading font-bold text-2xl text-center text-foreground mb-8">
            Empresas Embaixadoras
          </h3>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {Array.from({
                length: Math.ceil(ambassadorCompanies.length / 4)
              }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
                >
                  {ambassadorCompanies
                    .slice(pageIndex * 4, (pageIndex + 1) * 4)
                    .map((empresa) => (
                      <div
                        key={empresa}
                        className="bg-card border border-border rounded-lg p-4 text-center"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {empresa}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Tiers;
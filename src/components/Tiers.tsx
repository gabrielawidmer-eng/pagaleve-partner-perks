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
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Tiers de Elegibilidade
          </h2>
          <p className="text-lg text-muted-foreground">
            Benefícios exclusivos para cada nível de parceria
          </p>
        </div>
      </div>
    </section>
  );
};
export default Tiers;
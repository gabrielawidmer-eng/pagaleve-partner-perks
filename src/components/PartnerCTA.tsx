import { Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const PartnerCTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
          
          <div className="relative text-center max-w-3xl mx-auto">
            <Building className="w-16 h-16 text-primary mx-auto mb-6" />
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              É parceiro e quer participar?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Ofereça seus produtos e serviços para milhares de lojistas Pagaleve. 
              Aumente sua base de clientes com condições especiais exclusivas.
            </p>
            
            <Button
              size="lg"
              className="bg-gradient-primary text-white hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection('contact')}
            >
              Quero ser parceiro
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                Exposição para +5000 lojistas
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                Marketing conjunto
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                Crescimento acelerado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PartnerCTA;
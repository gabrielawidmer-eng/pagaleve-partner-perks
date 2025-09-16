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
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-card rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <Building className="w-12 h-12 text-primary mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Seja nosso parceiro
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Ofereça benefícios exclusivos para milhares de clientes Pagaleve e aumente a visibilidade da sua marca
              </p>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold rounded-full self-start"
              >
                Quero ser parceiro
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="bg-gradient-card p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">50+</div>
                <p className="text-foreground font-semibold text-xl mb-2">
                  Empresas parceiras
                </p>
                <p className="text-muted-foreground">
                  Conectando marcas com consumidores qualificados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PartnerCTA;
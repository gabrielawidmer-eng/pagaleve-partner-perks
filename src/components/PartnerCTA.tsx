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
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Building className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4">
            Quer ser um parceiro?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Ofereça suas soluções aos milhares de clientes Pagaleve
          </p>
          <Button
            onClick={() => scrollToSection("contato")}
            variant="secondary"
            size="lg"
            className="group"
          >
            Entre em contato
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default PartnerCTA;
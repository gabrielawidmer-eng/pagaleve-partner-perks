import { Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PartnerCTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="parceiro" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-10 h-10 text-white" />
              </div>

              {/* Content */}
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                Quer oferecer um benefício?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Se sua empresa oferece soluções relevantes para e-commerce, 
                junte-se ao Clube de Benefícios Pagaleve e alcance milhares de lojistas qualificados
              </p>

              {/* CTA */}
              <Button
                onClick={() => scrollToSection("contato")}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-10 py-6 text-lg"
              >
                Quero ser parceiro
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;